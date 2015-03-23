// Defines the onchange() event for Lab Test selection
// When a Lab is selected, the name is displayed on the screen,
// the default values for the combo boxes are set, and the
// General Ward Instructins are retrieved, formatted and displayed
function prepareEventHandlers() {
    var testList = document.getElementById("testList");
    var selectedTest = document.getElementById("selectedTest");

    var title = document.getElementById("rule18");
	setCrumbs(1);
    testList.onchange =  function() {
        var value = testList.value;
  	    var testIndex = testList.selectedIndex;
        title.innerHTML = value;
        title.style.textDecoration= "underline";
		setCrumbs(2);
        getSelectedLab();
    }
    document.getElementById("quitButton").onClick = function () {
        location.href = "www.google.com";
        alert("Quit!");
    };
};

// Called when the onchange() event is called to Lab Test selections
function getSelectedLab(){
    var cbLabTest = document.getElementById("testList");
    var cbLabTestHidden = document.getElementById("testListHidden");
    var idx = cbLabTest.selectedIndex;
    cbLabTestHidden.selectedIndex = idx;

   sendMessage(cbLabTestHidden.value,"labDefaultQuery");
   sendMessage(cbLabTestHidden.value,"gwiQuery");
};

// Sets the Bread Crumb display
function setCrumbs(step){
	var step1 = document.getElementById("step1");
	var step2 = document.getElementById("step2");
	var step3 = document.getElementById("step3");

	if(step == 1){
		step1.style.color = "blue";
	}
	if(step == 2){
		step1.style.color = "blue";
		step2.style.color = "blue";
	}
	if(step == 3){
		step1.style.color = "blue";
		step2.style.color= "blue";
		step3.style.color= "blue";
	}
};

// The onchange() handler for the available providers. Selecting a provider 
// removes it from the available list and add to selected list and
// the hidden provider list
function prepareEventHandlersTwo(){
    var provList = document.getElementById("provList");
    var selectProv = document.getElementById("selectProv");
    var selectProvHidden = document.getElementById("selectProvHidden");

    provList.onchange = function() {
        var newDoc = provList.value;
        var listIndex = provList.selectedIndex;
        var option = document.createElement("option");
        option.text = newDoc;
        selectProv.add(option);
        var option2 = document.createElement("option");
        option2.text = newDoc;
        option2.selected = true;
        selectProvHidden.add(option2);
        provList.remove(listIndex);
		setCrumbs(3);
        }
};

// The onchange() event handler for the selected providers, 
// The event hanlder removes the provider from the selecte list and the hidden list
// Add the provider back to the avaialble provider list
function prepareEventHandlersThree(){
    var provList = document.getElementById("selectProv");
    var selectProv = document.getElementById("provList");
    var selectProvHidden = document.getElementById("selectProvHidden");

    provList.onchange = function() {
        var newDoc = provList.value;
        var listIndex = provList.selectedIndex;
        var option = document.createElement("option");
        option.text = newDoc;
        selectProv.add(option);
        provList.remove(listIndex);
        selectProvHidden.remove(listIndex);
        }
};

// The window.onload event to initialize controls
window.onload = function() {
    prepareEventHandlers();
    prepareEventHandlersTwo();
    prepareEventHandlersThree();
};
