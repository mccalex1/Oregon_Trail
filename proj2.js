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

	

	scoreID = document.getElementById("highScores");


	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
        	xmlhttp = new XMLHttpRequest();
	} else {
        	// code for IE6, IE5
        	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    	}
    	xmlhttp.onreadystatechange = function() {
        	if (this.readyState == 4 && this.status == 200) {
            		scoreID.innerHTML = this.responseText;
        	}
    	};
    	xmlhttp.open("GET","http://localhost/???/getHighscores.php",true);
    	xmlhttp.send();

}
