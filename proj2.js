//javacsript file
function openNextMenu(currentDivId){
	document.getElementById("oregonTrail").style.display = "none";
	document.getElementById(currentDivId).style.display = "block";
}

function backToOregonTrail(currentDivId){
	document.getElementById(currentDivId).style.display = "none";
	document.getElementById("oregonTrail").style.display = "block";
}