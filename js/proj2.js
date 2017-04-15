var careerChosen = "";
var money = 0;
var mutilplyer = 0;
var team = [];
var month = "";

var CAREER1 = "Banker";
var CAREER2 = "Carpenter";
var CAREER3 = "Farmer";

var careers = 	{
					CAREER1 : {'name': CAREER1, 'money': '1600', 'pointMultiplyer': '1'},
					CAREER2 : {'name': CAREER2,	'money': '800', 'pointMultiplyer': '2'},
					CAREER3 : {'name': CAREER3, 'money': '400', 'pointMultiplyer': '3'}
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
				"Matts" : 			{'oxen': '20', 'clothes': '10', 	'parts': '10', 		'food': '.2'},	
				"Ft. Kearney" : 	{'oxen': '25', 'clothes': '12.5', 	'parts': '12.5', 	'food': '.25'},	
				"Ft. Laramie" : 	{'oxen': '30', 'clothes': '15', 	'parts': '15', 		'food': '.3'},
				"Ft. Bridger" : 	{'oxen': '35', 'clothes': '17.5',	'parts': '17.5', 	'food': '.35'},	
				"Ft. Hall" : 		{'oxen': '40', 'clothes': '20', 	'parts': '20', 		'food': '.4'},	
				"Ft. Boise" : 		{'oxen': '45', 'clothes': '22.5', 	'parts': '22.5',	'food': '.45'},	
				"Ft. Walla Walla" : {'oxen': '50', 'clothes': '25', 	'parts': '25', 		'food': '.5'}	
			};

//miles from start
var placesMiles = 	{
						"Independence, MO" : 		{'distance' : '102'},
						"Kansas River Crossing" : 	{'distance' : '83'},
						"Big Blue River Crossing" :	{'distance' : '119'},
						"Ft. Kearney" :				{'distance' : '250'},
						"Chimney Rock" : 			{'distance' : '86'},
						"Ft. Laramie" :				{'distance' : '190'},
						"Independence Rock" : 		{'distance' : '102'}
					};
					



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

	careerChosen = careerType;

	if(careerType == CAREER1){
		money = careers.CAREER1["money"];
		mutilplyer = careers.CAREER1["pointMultiplyer"];
	}
	else if(careerType == CAREER2){
		money = careers.CAREER2["money"];
		mutilplyer = careers.CAREER2["pointMultiplyer"];
	}
	else if(careerType == CAREER3){
		money = careers.CAREER3["money"];
		mutilplyer = careers.CAREER3["pointMultiplyer"];
	}

	openNextMenu("travelTrail", "chooseNames");
}


function goToStore(storeName){

	/*
	document.getElementById("oxenPrice") = prices.storeName.oxen + " per oxen";
	document.getElementById("foodPrice") = prices.storeName.food + " per 25lbs";
	document.getElementById("clothingPrice") = prices.storeName.clothes + " per pair";
	document.getElementById("wheelPrice") = prices.storeName.parts + " per wheel";
	document.getElementById("axelPrice") = prices.storeName.parts + " per axle";
	document.getElementById("tonguePrice") = prices.storeName.parts + " per tongue";
	*/
	openNextMenu('helloMatt', 'theStore');
}



function setNames(){
	
	var name1 = document.getElementById("name1").value;
	var name2 = document.getElementById("name2").value;
	var name3 = document.getElementById("name3").value;
	var name4 = document.getElementById("name4").value;
	var name5 = document.getElementById("name5").value;

	//makes sure all the names are not the same and null
	if((name1 != name2) && (name2 != name3) && (name3 != name4) && (name4 != name5) && (name1 != "")){
		
		team.push(name1);
		team.push(name2);
		team.push(name3);
		team.push(name4);
		team.push(name5);

		openNextMenu("chooseNames", "startMonth");

	}

	else{
		document.getElementById("nameError").innerHTML = "Names Must not be left empty nor be the same";
	}

}



function setMonth(theMonth){
	month = theMonth;
	openNextMenu("startMonth", "goToStore");
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