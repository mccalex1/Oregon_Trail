

var CAREER1 = "Banker";
var CAREER2 = "Carpenter";
var CAREER3 = "Farmer";

var careerChosen = "";
var money = 0;
var mutilplyer = 0;
/*
var careers = 	{
					{'name': CAREER1, 'money': '1600', 'pointMultiplyer': '1'},
					{'name': CAREER2,	'money': '800', 'pointMultiplyer': '2'},
					{'name': CAREER3, 'money': '400', 'pointMultiplyer': '3'}
				};

//POINT CONSTANTS USE THIS WEBSITE
//https://www.gamefaqs.com/pc/577345-the-oregon-trail/faqs/9660

//points at end of the game per X
var wagonPoints = 50;
var oxPoints = 4;
var wagonPart = 2;
var clothPoint = 2;
var foodPointPer25 = 1;
var cashPointPer5 = 1;

//rationing constants
var fillingPerDay = 3;
var meagerPerDay = 2;
var barebonesPerDay = 1;

//pace constants
var gruelingPace = 1;
var strenuousPace = .75;
var steadyPace = .5;

//random event list
var randomEvents = ["Find Wild Fruit", "Stolen Waggon", "Wagon Part Broken", 
					"Rain Washes out Path", "Bad Track", "Thunderstorm",
					"Develops Cholera", "Develops Exhaustion", "Breaks Arm", "Breaks Leg",
					"Contracts Measels", "Gets Typhoid?", "Gets Dysentery?"];

//prices based on place
//2 oxen, 1 pound of food
var prices = { 
				{ 'place': "Matt's", 			'oxen': '20', 'clothes': '10', 		'parts': '10', 		'food': '.2'},	
				{ 'place': "Ft. Kearney", 		'oxen': '25', 'clothes': '12.5', 	'parts': '12.5', 	'food': '.25'},	
				{ 'place': "Ft. Laramie", 		'oxen': '30', 'clothes': '15', 		'parts': '15', 		'food': '.3'},
				{ 'place': "Ft. Bridger", 		'oxen': '35', 'clothes': '17.5',	'parts': '17.5', 	'food': '.35'},	
				{ 'place': "Ft. Hall", 			'oxen': '40', 'clothes': '20', 		'parts': '20', 		'food': '.4'},	
				{ 'place': "Ft. Boise", 		'oxen': '45', 'clothes': '22.5', 	'parts': '22.5',	'food': '.45'},	
				{ 'place': "Ft. Walla Walla", 	'oxen': '50', 'clothes': '25', 		'parts': '25', 		'food': '.5'}	
			};

//miles from start
var placesMiles = 	[
						{'name':"Independence, MO", 		'distance' : '102'},
						{'name':"Kansas River Crossing", 	'distance' : '83'},
						{'name':"Big Blue River Crossing",	'distance' : '119'},
						{'name':"Ft. Kearney", 				'distance' : '250'},
						{'name':"Chimney Rock", 			'distance' : '86'},
						{'name':"Ft. Laramie", 				'distance' : '190'},
						{'name':"Independence Rock", 		'distance' : '102'}
					];
					
*/


function openNextMenu(currentDiv, nextDivId){

	document.getElementById(currentDiv).style.display = "none";

	document.getElementById(nextDivId).style.display = "block";

}




//onload function should set up and data that needs to be pulled from js file

function getData(){

	setUpHighScores();

}


//what happens when they choose the career
function chooseCareer(careerType){

	careerChosen = career;
	money = 0;
	mutilplyer = 0;

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