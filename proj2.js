//javacsript file

function openNextMenu(currentDiv, nextDivId){

	document.getElementById(currentDiv).style.display = "none";

	document.getElementById(nextDivId).style.display = "block";

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

            //takes scores json and pulls out the name and score for each perrson
            //creates a new row with two columns and inserts the data
			for(var i=0; i<scores.length; i++){
				
				var row = table.insertRow(-1);
				
				var cell1 = row.insertCell(0);
				cell1.innerHTML = scores[i].name;

				var cell2 = row.insertCell(1);
				cell2.innerHTML = scores[i].score;
				
				//scoreID.innerHTML += "Name: " + scores[i].name + " Score: " + scores[i].score + "<br>";
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