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
								prepareEventHandlersFour(testIndex);
								setDefaultSelections(testIndex);
								setCrumbs(2);
                getSelectedLab();

                }
                document.getElementById("quitButton").onClick = function () {
                    location.href = "www.google.com";
                    alert("Quit!");
                };
};

function getSelectedLab(){
  var cbLabTest = document.getElementById("testList");
  var cbLabTestHidden = document.getElementById("testListHidden");
  var idx = cbLabTest.selectedIndex;
  cbLabTestHidden.selectedIndex = idx;

  sendMessage(cbLabTestHidden.value,"labDefaultQuery");
  sendMessage(cbLabTestHidden.value,"gwiQuery");
};

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

function prepareEventHandlersFour(selectNum){
//	var genWardInstrDefault = "";
//	var genWardInstr1 = "<span style=\"color:red\"> TURNAROUND TIME: </span> 2-3 days <br /><span style=\"color:red\"> LABORATORY: </span> UWHC <br /><span style=\"color:red\" > SPECIMEN: </span> LT BLUE <br /><span style=\"color:red\" > REQUIREMENT: </span>Patient History, any anticoagulant therapy <br /><span style=\"color:red\"> METHOD: </span>ELIS <br /><span style=\"color:red\" id=\"patPrep\"> PATIENT PREP: </span> None <br /><span style=\"color:red\"> CLINICAL SIGNIFICANCE: </span>Test used for the qualitative in plasma of the anti-heparin-platelet factor 4 antibodies generated during type II heparin-induced thrombocytopenias. <br />";
//	var genWardInstr2 = "<span style=\"color:red\"> TURNAROUND TIME: </span> 3-5 days <br /><span style=\"color:red\"> LABORATORY: </span> Quest Diagnostics <br /><span style=\"color:red\"> SPECIMEN: </span> Urine in sterile specimen cup <br />Patient History, any anticoagulant therapy <br /><span style=\"color:red\"> METHODOLOGY: </span> Mass Spectrometry <br /><span style=\"color:red\"> PATIENT PREP: </span> None <br /><span style=\"color:red\"> CLINICAL SIGNIFICANCE: </span> If Screen is Positive, a confirmation will be performed. <br />";
//	var genWardInstr3 = "<span style=\"color:red\"> TURNAROUND TIME: </span> 3-6 days <br /><span style=\"color:red\"> LABORATORY: </span> Quest Diagnostics <br /><span style=\"color:red\"> SPECIMEN: </span> large RED TOP tube only <br /><span style=\"color:red\"> METHOD: </span> LC/MS/MS <br /><span style=\"color:red\"> PATIENT PREP: </span> None <br /><span style=\"color:red\"> CLINICAL SIGNIFICANCE: </span> Collection Sample: 2LG RED   VA Lab Slip:        Container: 2LG RED		Vol Reg(ml) : 3.";
//	var genWardInstr4 = "<span style=\"color:red\"> TURNAROUND TIME: </span> 1-3 days <br /><span style=\"color:red\"> LABORATORY: </span> BAHC <br /><span style=\"color:red\"> SPECIMEN: </span> GREEN Top Tube <br /><span style=\"color:red\"> REQUIREMENT: </span>Patient History <br /><span style=\"color:red\"> METHOD: </span> FLSW <br /><span style=\"color:red\"> PATIENT PREP: </span>None <br /><span style=\"color:red\"> CLINICAL SIGNIFICANCE: </span>Standard <br />";
//	var newGenWard = "";
//	var stringForm=selectNum;

//	if(selectNum == 0){
//		newGenWard = genWardInstr1;
//	}else if(selectNum == 1){
//		newGenWard = genWardInstr2;
//	}else if(selectNum == 2){
//		newGenWard = genWardInstr3;
//	}else if(selectNum == 3){
//		newGenWard = genWardInstr4;
//	}else
//		newGenWard = genWardInstrDefault;

	//alert(newGenWard);

//	document.getElementById("GenWardInstr").innerHTML = newGenWard;
};

function setDefaultSelections(selectNum){

	if(selectNum == 0){
//		document.getElementById("LT BLUE").selected = true;
//		document.getElementById("PLASMA").selected = true;
//		document.getElementById("ROUTINE").selected = true;

	}
	if(selectNum == 1){
//		document.getElementById("BLACK").selected = true;
//		document.getElementById("URINE").selected = true;
//		document.getElementById("STAT").selected = true;
	}
	if(selectNum == 2){
//		document.getElementById("RED").selected = true;
//		document.getElementById("BLOOD").selected = true;
//		document.getElementById("PRIORITY").selected = true;
	}
	if(selectNum == 3){
//		document.getElementById("GREEN").selected = true;
//		document.getElementById("PLASMA").selected = true;
//		document.getElementById("ROUTINE").selected = true;
	}
}

window.onload = function() {
                prepareEventHandlers();
                prepareEventHandlersTwo();
                prepareEventHandlersThree();
};
