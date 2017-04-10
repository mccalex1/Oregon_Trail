//javacsript file
function openNextMenu(currentDivId){
	document.getElementById("oregonTrail").style.display = "none";
	document.getElementById(currentDivId).style.display = "block";
}

function backToOregonTrail(currentDivId){
	document.getElementById(currentDivId).style.display = "none";
	document.getElementById("oregonTrail").style.display = "block";
}


//onload function should set up and data that needs to be pulled from js file
function getData(){
	setUpHighScores();
}

function setUpHighScores(){
	var names = [];
	var scores = [];

	document.getElementById("highScores");

	//implement the 10 high score loop here
	
}
