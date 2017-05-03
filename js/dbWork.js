/*******************************************************************************
*   File: proj2.js
*   Date created: 5/3/17
*   Last Modified: 5/3/17
*   Authors: Alex McCaslin, Brendan Waters, Eric Gottlieb, Taylor Brzuchalski
*
*   Email:
*           mccalex1@umbc.edu
*           b101@umbc.edu
*           eric29@umbc.edu
*           tbrz1@umbc.edu
*
*   Description: This file contains the functions which will call PHP scripts to
*                access or edit the database
*
*******************************************************************************/


//gets highscores from server, puts them in div for user to view
function setUpHighScores(){

	var scores = [];
	var table = document.getElementById("highScores");
	var url = wampURL + "php/getHighscores.php"; 
	
	if (window.XMLHttpRequest) {
		// code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
	} else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

        	table.innerHTML = "";

        	try{
        		scores = JSON.parse(this.responseText);
        		var row = table.insertRow(-1);
        		var nameCell = row.insertCell(0);
        		nameCell.innerHTML = "Name:";
        		var scoreCell = row.insertCell(1);
        		scoreCell.innerHTML = "Score:";
        	}catch(e){
        		table.innerHTML = "No Scores Yet!\n";
        	}

        	//takes scores json and pulls out the name and score for each perrson
        	//creates a new row with two columns and inserts the data
			for(var i=0; i<scores.length; i++){
				
				var row = table.insertRow(-1);
				
				var cell1 = row.insertCell(0);
				cell1.innerHTML = scores[i].name;

				var cell2 = row.insertCell(1);
				cell2.innerHTML = scores[i].score;
			}	

        }
    };
    xmlhttp.open("GET", url ,true);
    xmlhttp.send();

}



//adds a new highscore to the database
function addHighScore(name, score){
	
	var url = wampURL + "php/addHighscore.php";

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
    xmlhttp.open("GET", url + query, true);
    xmlhttp.send();

}



function eraseTopTen(){
		
	var url = wampURL + "php/eraseHighscores.php";

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

			if(response == "Success!"){
				openNextMenu('managementOptions','oregonTrail');
			}else{
				console.log(response);
			}
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

//creates a timestamp of the current time
function getTimestamp(){

    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth();
    if(month < 10){month = "0" + month;}
    var day = date.getDate();
    if(day < 10){day = "0"+ day;}
    var hour = date.getHours();
    if(hour < 10){hour = "0" + hour;}
    var minute = date.getMinutes();
    if(minute < 10){minute = "0" + minute;}
    var second = date.getSeconds();
    if(second < 10){second = "0" + second;}
    return(year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second);

}



//gets all tombstones from the database in between two given points
function getTombtones(lowerBound, upperBound){

    var tombstones = [];
    var url = wampURL + "php/getTombstones.php"; 
    
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            tombstones = JSON.parse(this.responseText);

            //tombstones[i] .timestamp .DOD .name .mile .message

        }
    };
        
    query = "?q=" + lowerBound + "," + upperBound;
    xmlhttp.open("GET", url + query, true);
    xmlhttp.send();

}



//adds a new tombstone to the database
function addTombstone(name, dateOfDeath, mile, message){

    var timestamp = getTimestamp();
    var url = wampURL + "php/addTombstone.php";

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

    var query = "?q=" + timestamp + "," + dateOfDeath + "," + name + "," + mile + "," + message;
    xmlhttp.open("GET", url + query, true);
    xmlhttp.send();

}



//remove all tombstones from db
function eraseTombstones(){
        
    var url = wampURL + "php/eraseTombstones.php";

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

            if(response == "Success!"){
                openNextMenu('managementOptions','oregonTrail');
            }else{
                console.log(response);
            }
        }
    };

    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}