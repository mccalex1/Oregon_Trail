var currentMile = 10;

function continueButton(currentDiv, nextDivId){
	document.getElementById(currentDiv).style.display = "none";

	document.getElementById(nextDivId).style.display = "block";
}

function changeInner(){
	var inner = document.getElementById("milesToGo");
	var inner2 = document.getElementById("milesTraveled");

	currentMile -= 1;
	inner.innerHTML = currentMile + " miles to go!";
	inner2.innerHTML = 10 - currentMile + "miles traveled";
}