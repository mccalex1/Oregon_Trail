var careerChosen = "";
var money = 0;
var mutilplyer = 0;
var team = [];

//variables based on traveling
var theDate;
var theWeather;
var theHealth = [100, 100, 100, 100, 100];
var theFood = 0;
var nextLandmark = "Kansas River Crossing";
var milesTraveled = 0;

currentStore = "";

var CAREER1 = "Banker";
var CAREER2 = "Carpenter";
var CAREER3 = "Farmer";

var monthNames = ["January", "February", "March", "April", "May", "June",
  					"July", "August", "September", "October", "November", "December"];

var careers = 	{
					"Banker" : {"money": "1600", "pointMultiplyer": "1"},
					"Carpenter" : {"money": "800", "pointMultiplyer": "2"},
					"Farmer" : {"money": "400", "pointMultiplyer": "3"}
				};

//health points based on weather
var weather =   {
					"Snowy":  {"health": -2},
					"Cold":   {"health": -1},
					"Cool":   {"health": 0},
					"Warm":   {"health": 1},
					"Hot":    {"health": 2}
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

	money = careers[careerType].money;
	mutilplyer = careers[careerType].pointMultiplyer;

	openNextMenu("travelTrail", "chooseNames");
}


function goToStore(storeName){

	currentStore = storeName;
	document.getElementById("storeName").innerHTML = storeName + " store";

	document.getElementById("moneyGoesHere").innerHTML = "You have $" + money + " to spend.";

	
	document.getElementById("oxenPrice").innerHTML = "$" + prices[storeName].oxen + " per oxen (MAX 9)";
	document.getElementById("foodPrice").innerHTML = "$" + prices[storeName].food + " per 25lbs (MAX 9999)";
	document.getElementById("clothingPrice").innerHTML = "$" + prices[storeName].clothes + " per pair (MAX 99)";
	document.getElementById("wheelPrice").innerHTML = "$" + prices[storeName].parts + " per wheel (MAX 9)";
	document.getElementById("axelPrice").innerHTML = "$" + prices[storeName].parts + " per axle (MAX 9)";
	document.getElementById("tonguePrice").innerHTML = "$" + prices[storeName].parts + " per tongue (MAX 9)";
	
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

	var m;

	switch(theMonth){
		case "March":
			theWeather = "Snowy";
			m = 3;
			break;
		
		case "April":
			theWeather = "Cold";
			m = 4;
			break;
		
		case "May":
			theWeather = "Cool";
			m = 5;
			break;
		
		case "June":
			theWeather = "Warm";
			m = 6;
			break;

		case "July":
			theWeather = "Hot";
			m = 7;
			break;
	}

	theDate = new Date(1880, m, 0);

	openNextMenu("startMonth", "goToStore");
}





function setUpHighScores(){

	var scores = [];
	var table = document.getElementById("highScores");
	var url = "http://localhost/proj2/php/getHighscores.php"; 
	
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
			}	

        }
    };
    xmlhttp.open("GET", url ,true);
    xmlhttp.send();

}




function addHighScore(name, score){
	
	var url = "http://localhost/proj2/php/addHighscore.php";

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



function updateSubTotal(numDiv, subDiv, item){

	var number = document.getElementById(numDiv).value;
	var sub = document.getElementById(subDiv);
	var total = document.getElementById("total");

	sub.innerHTML = Math.round( (parseInt(number) * prices[currentStore][item]) * 100) / 100;

	var theTotal = parseFloat(document.getElementById("oxenSub").innerHTML);
	theTotal += parseFloat(document.getElementById("foodSub").innerHTML);
	theTotal += parseFloat(document.getElementById("clothingSub").innerHTML);
	theTotal += parseFloat(document.getElementById("tongueSub").innerHTML);
	theTotal += parseFloat(document.getElementById("wheelSub").innerHTML)
	theTotal += parseFloat(document.getElementById("axelSub").innerHTML); 
	
	total.innerHTML = theTotal;

}

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

function getTombtones(lowerBound, upperBound){

	var tombstones = [];
	var url = "http://localhost/proj2/php/getTombstones.php"; 
	
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

function addTombstone(name, dateOfDeath, mile, message){

	//TODO update how name and score are retrieved
	var timestamp = getTimestamp();
	var url = "http://localhost/proj2/php/addTombstone.php";

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



function buyStuff(){

	var totalPrice = 0;

	var oxenSub = parseFloat(document.getElementById("oxenSub").innerHTML);
	var foodSub = parseFloat(document.getElementById("foodSub").innerHTML);
	var clothingSub = parseFloat(document.getElementById("clothingSub").innerHTML);
	var tongueSub = parseFloat(document.getElementById("tongueSub").innerHTML);
	var wheelSub = parseFloat(document.getElementById("wheelSub").innerHTML)
	var axelSub = parseFloat(document.getElementById("axelSub").innerHTML); 

	totalPrice = oxenSub + foodSub + clothingSub + tongueSub + wheelSub + axelSub;

	//invalid
	if(totalPrice > money){
		alert("You cannot spend more money than you have!");
	}

	//valid
	else{
		openNextMenu("theStore", "travelMenu");
		theFood += foodSub;
	}

	setTravelValues();
}



function continueTrail(){

	setTravelValues();

}

function setTravelValues(){

	//there are two places where the date should go
	//for some reason they cant have the same name
	document.getElementById("dateGoesHere").innerHTML = "Date: " + monthNames[theDate.getMonth()] + " " + theDate.getDate() + " " + theDate.getFullYear();
	document.getElementById("theDateGoesHere").innerHTML = "Date: " + monthNames[theDate.getMonth()] + " " + theDate.getDate() + " " + theDate.getFullYear();
	
	document.getElementById("weatherGoesHere").innerHTML = "Weather: " + theWeather;
	document.getElementById("healthGoesHere").innerHTML = "Health: " + getHealth();
	document.getElementById("foodGoesHere").innerHTML = "Food: " + theFood;
	document.getElementById("nextLandmarkGoesHere").innerHTML = "Next landmark: " + nextLandmark;
	document.getElementById("milesTraveledGoesHere").innerHTML = "Miles traveled: " + milesTraveled;
}





//based on current health get what the value should be
function getHealth(){
	var totalDead = 0;
	var totalHealth = 0;

	//gets total health among people
	for(var i = 0; i < theHealth.length; i++){

		//checks if dead
		if(theHealth[i] == 0){
			totalDead += 1;
		}
		totalHealth += theHealth[i];
	}

	var avgHealth = totalHealth / (theHealth.length - totalDead);


	//comes up with a health check system
	if(avgHealth > 75){
		return "Good";
	}
	else if(avgHealth > 50){
		return "Fair";
	}
	else{
		return "Poor";
	}
}

function checkSupplies(){

}

function lookAtMap(){

}

function changePace(){

}

function changeFoodRations(){

}

function stopToRest(){

}

function attemptToTrade(){

}
function talkToPeople(){

}
