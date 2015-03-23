        // Points to EWD server which will handle requests
        EWD.application = {
        name: 'elom'
        };

        // Message sent to EWD server
        var sendMessage = function(fltr, type) {
          EWD.sockets.sendMessage({
          type: type,
          params: {
          filter: fltr,
          sender: 'Elom',
          date: new Date().toUTCString()
          }
          });
        };

        // Message sent to EWD server
        var sendMessageWithID = function(idx, fltr, type) {
          EWD.sockets.sendMessage({
          type: type,
          params: {
          index: idx  ,
          filter: fltr,
          sender: 'Elom',
          date: new Date().toUTCString()
          }
          });
        };
        EWD.sockets.log = true;

        // Display initial Log In page. This function is a place holder
        // for the initialization of the Lab Order screen
        function logIn(){
          //initialize the page
          sendMessage("noFilter", "urgencyQuery") ;
          sendMessage("a", "labQuery") ;
          sendMessage("a", "providerQuery");
          sendMessage('noFilter', 'collectSampleQuery');
          sendMessage('noFilter', 'specimenQuery');
          var collectionDate=document.getElementById("collectionDate");
          collectionDate.value = new Date().toJSON().substring(0,10);

          //show the form
          var dv=document.getElementById("contentDiv");
          var dv2=document.getElementById("logInDiv");
          dv.style.display='block';         
          dv2.style.display='none';
        }

        // leave Lab Order Managemnt system
        function quit(){location.href = "http://www.google.com";};

        // save the curent Lab Order
        function save(){
          EWD.sockets.sendMessage({
            type: "saveLabOrder",
            params: {
              id: "1",
              comment: document.getElementById("comment").value,
              selectedTest: document.getElementById("testList").value,
              collectionType: document.getElementById("collectionType").value ,
              howOften: document.getElementById("howOften").value,
              collectionDate: document.getElementById("collectionDate").value,
              collectionSample: document.getElementById("collectionSample").value,
              specimen: document.getElementById("specimen").value,
              urgency: document.getElementById("urgency").value,
              notifyProviders: document.getElementById("selectProvHidden").value,          
              howLong: document.getElementById("howLong").value,
              sender: 'ELOM',
              date: new Date().toUTCString()          
            }
        });
      };

        // Handle responses from requets sent to EWD
        EWD.onSocketMessage = function(messageObj) {

          // General Ward Instructions Response. Populates and format each line.
          if (messageObj.type === 'gwiMatches'){
            var genWardInstr1 = "";
            for(var i=0; i < messageObj.message.length; i++ ){
              var text = messageObj.message[i].text;
              var idx = text.indexOf(":");
              var prefix = text.substring(0, idx + 1);
              var suffix = text.substring(idx + 1);
              var gwi = "<span style=\"color:red\">" + prefix + "</span>" + suffix + "<br />";
              genWardInstr1 = genWardInstr1 + gwi;
            }
            document.getElementById("generalWardInstructions").innerHTML = genWardInstr1;
          }

          // Response for default data for selected Lab
          if (messageObj.type === 'labDefaultMatches'){
             for(var i=0; i < messageObj.message.length; i++ ) {
                var text = messageObj.message[i].text;
                var id = messageObj.message[i].id;
                if (id === "collectSample") {
                   document.getElementById("cs_" + text).selected = true;
                } else if (id === "specimen") {
                   document.getElementById("s_" + text).selected = true;
                }  else if (id === "urgency") {
                   document.getElementById("u_" + text).selected = true;
                }
             }
          }

          // Response for provider search request, this is the list of providers
          // returned for a given prefix
          if (messageObj.type === 'providerMatches'){
            var cb = document.getElementById('provList');
            while(cb.options.length > 0){                
               cb.remove(0);
            }
            
            for(var i=0; i < messageObj.message.length; i++ ){
              var option = document.createElement("option");
              option.text = messageObj.message[i].text;
              cb.add(option);
            }
          }

          // Response for Lab search request, this is the list of labs 
          // returned for a given prefix
          if (messageObj.type === 'labMatches'){
            var cb = document.getElementById('testList');
            var cbh = document.getElementById('testListHidden');
            while(cb.options.length > 0){                
               cb.remove(0);
               cbh.remove(0);
            }
            
            for(var i=0; i < messageObj.message.length; i++ ){
              var option = document.createElement("option");
              option.text = messageObj.message[i].text;
              cb.add(option);

              option = document.createElement("option");
              option.text = messageObj.message[i].id;
              cbh.add(option);
            }

          }

          // Populate the Uregency combo box control
          if (messageObj.type === 'urgencyMatches'){
            var cb = document.getElementById('urgency');
            while(cb.options.length > 0){                
               cb.remove(0);
            }
            var option = document.createElement("option");
            option.text = "";
            option.id = "u_";
            cb.add(option);
            
            for(var i=0; i < messageObj.message.length; i++ ){
              var urg = messageObj.message[i].text;
              if (urg.substring(0, 3) != "WKL") {
                var option = document.createElement("option");
                option.text = urg;
                option.id = "u_" + (i + 1);
                cb.add(option);
              }
            }
          }

          // Response from save Lab Order request 
          if (messageObj.type === 'labOrderSaved'){
            // log the event
            alert("Lab Order saved successfully!");
            console.log("Lab Order Saved " + new Date().toUTCString());
          }

          // Populate the Collect Samples combo box control
          if (messageObj.type === 'collectSampleMatches'){
            var cb = document.getElementById("collectionSample");
            while(cb.options.length > 0){                
               cb.remove(0);
            }
            
            var option = document.createElement("option");
            option.text = "";
            option.id = "cs_";
            cb.add(option);
            for(var i=0; i < messageObj.message.length; i++ ){
                var urg = messageObj.message[i].text;
                option = document.createElement("option");
                option.text = urg;
                option.id = "cs_" + urg;
                cb.add(option);
            }
          }

          // Populate the Specimen combo box control
          if (messageObj.type === 'specimenMatches'){
            var cb = document.getElementById("specimen");
            while(cb.options.length > 0){                
               cb.remove(0);
            }
            
            var option = document.createElement("option");
            option.text = "";
            option.id = "s_";
            cb.add(option);
            for(var i=0; i < messageObj.message.length; i++ ){
                var urg = messageObj.message[i].text;
                option = document.createElement("option");
                option.text = urg;
                option.id = "s_" + urg;
                cb.add(option);
            }
          }

        }

