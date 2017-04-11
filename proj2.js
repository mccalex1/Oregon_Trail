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

	var scores = [];
	var scoreID = document.getElementById("highScores");
	var url = "http://localhost/proj2/getHighscores.php"; 
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
        	xmlhttp = new XMLHttpRequest();
	} else {
        	// code for IE6, IE5
        	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    	}
    	xmlhttp.onreadystatechange = function() {
        	if (this.readyState == 4 && this.status == 200) {
            		scores = JSON.parse(this.responseText);

			//TODO alex do wut u want with scores. Access data using scores[i].name and scores[i].score
			//Example:
			for(var i=0; i<scores.length; i++){
				scoreID.innerHTML += "Name: " + scores[i].name + " Score: " + scores[i].score + "<br>";
			}

        	}
    	};
    	xmlhttp.open("GET", url ,true);
    	xmlhttp.send();

}

function addHighScore(){
	
	//TODO update how name and score are retrieved
	var name = document.getElementById("nameInput").value;
	var score = getCurrentScore();
	var url = "http://localhost/proj2/addHighscore.php";

	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
        	xmlhttp = new XMLHttpRequest();
	} else {
        	// code for IE6, IE5
        	xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    	}
    	xmlhttp.onreadystatechange = function() {
        	if (this.readyState == 4 && this.status == 200) {
			var response = this.responseText;
        	}
    	};
	var query = "?q=" + name + "," + score;
    	xmlhttp.open("GET", url + query ,true);
    	xmlhttp.send();

}