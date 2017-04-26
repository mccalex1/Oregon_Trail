var careerChosen = "";
var money = 0;
var mutilplyer = 0;
var team = [];

//variables based on traveling
var theDate;
var theWeather;
var theHealth = [100, 100, 100, 100, 100];
var theFood = 0;
var nextLandmark = "";
var milesTraveled = 0;



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

var monthWeather = [
						["Snowy", "Cold", "Cool"],	//march
						["Snowy", "Cold", "Cool"],	//april
						["Cold", "Cool", "Warm"],	//may
						["Cool", "Warm", "Hot"],	//June
						["Cool", "Warm", "Hot"],	//july
					];

//health points based on weather
var weather =   {
					"Snowy":  {"health": -2},
					"Cold":   {"health": -1},
					"Cool":   {"health": 0},
					"Warm":   {"health": -1},
					"Hot":    {"health": -2}
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
var currentRationing = "Filling";
var rationingChoices = {
						"Filling" 	: {lbsPer : 3, health: 0},		//per person
						"Meager" 	: {lbsPer : 2, health: -1},		//per person
						"Barebones" : {lbsPer : 1, health: -2},		//per person
						"None" 		: {lbsPer : 0, health: -3},		//per person
						};

//pace constants
var currentPace = "Steady";
var paceChoices = 	{
						"Grueling" 	: {ratio : 1, health: -4},		//per person
						"Strenuous" : {ratio : .75, health: -2},	//per person
						"Steady" 	: {ratio : .5, health: 0}		//per person
//						"Resting" 	: {ratio : 0, health: 1},		//per person
					};

//random event list
var randomEvents = ["Find Wild Fruit", "Stolen Waggon", "Wagon Part Broken", 
					"Rain Washes out Path", "Bad Track", "Thunderstorm",
					"Develops Cholera", "Develops Exhaustion", "Breaks Arm", "Breaks Leg",
					"Contracts Measels", "Gets Typhoid?", "Gets Dysentery?"];

//prices based on place
//2 oxen, 1 pound of food
var theOxen = 0;
var theClothes = 0;
var theWheels = 0;
var theAxels = 0;
var theTongues = 0;



currentStore = "";
currentStoreNum = 0;
listOfStores = ["Matts", "Independence", "Ft. Kearney", "Ft. Laramie", "Ft. Bridger", "Ft. Hall", "Ft. Boise", "Ft. Walla Walla"];
var prices = { 
				"Matts" : 			{'oxen': '20', 'clothes': '10', 	'parts': '10', 		'food': '.2'},	
				"Independence" : 	{'oxen': '25', 'clothes': '12.5', 	'parts': '12.5', 	'food': '.25'},		
				"Ft. Kearney" : 	{'oxen': '25', 'clothes': '12.5', 	'parts': '12.5', 	'food': '.25'},	
				"Ft. Laramie" : 	{'oxen': '30', 'clothes': '15', 	'parts': '15', 		'food': '.3'},
				"Ft. Bridger" : 	{'oxen': '35', 'clothes': '17.5',	'parts': '17.5', 	'food': '.35'},	
				"Ft. Hall" : 		{'oxen': '40', 'clothes': '20', 	'parts': '20', 		'food': '.4'},	
				"Ft. Boise" : 		{'oxen': '45', 'clothes': '22.5', 	'parts': '22.5',	'food': '.45'},	
				"Ft. Walla Walla" : {'oxen': '50', 'clothes': '25', 	'parts': '25', 		'food': '.5'}	
			};



//miles from start
var currentLandmark = 0;
var milesWithThisLandmark = 0;
var placesMiles = 	[

						{"place" : "Independence, MO",				'distance' : 0},	//landmark 0
						{"place" : "Kansas River Crossing",			'distance' : 102},	//landmark 1
						{"place" : "Big Blue River Crossing",		'distance' : 83},	//landmark 2
						{"place" : "Ft. Kearney",					'distance' : 119},	//landmark 3
						{"place" : "Chimney Rock", 					'distance' : 250},	//landmark 4
						{"place" : "Ft. Laramie", 					'distance' : 86},	//landmark 5
						{"place" : "Independence Rock", 			'distance' : 190},	//landmark 6
						{"place" : "South Pass",					'distance' : 102},	//landmark 7

						//road splits here
						{"place" : "Green River",					'distance' : 57},	//landmark (8) 8.1
						{"place" : "Fort Bridge",					'distance' : 125},	//landmark (9) 8.2
						{"place" : "Soda Springs",					'distance' : 144},	//landmark (10) 9.1 distance from green river
						{"place" : "Soda Springs",					'distance' : 162},	//landmark (11) 9.2 distance from fort bridge

						//road comes back together
						{"place" : "Ft. Hall",						'distance' : 57},	//landmark 12 
						{"place" : "Snake River",					'distance' : 182},	//landmark 13 
						{"place" : "Ft. Boise",						'distance' : 114},	//landmark 14 
						{"place" : "Blue Mountain",					'distance' : 160},	//landmark 15 

						//road splits here
						{"place" : "Ft. Walla Walla",				'distance' : 55},	//landmark (16) 16.1
						{"place" : "The Dalles",					'distance' : 125},	//landmark (18) 17.1 distance from blue mountain
						{"place" : "The Dalles",					'distance' : 120},	//landmark (17) 17.2 distance from ft walla

						//road comes back together
						{"place" : "Barlow Toll Road",				'distance' : 100}	//landmark 19
					];
					



function openNextMenu(currentDiv, nextDivId){
	document.getElementById(currentDiv).style.display = "none";
	document.getElementById(nextDivId).style.display = "block";
}




//when the user is in a landmark menu and hits continue on trail
function continueFromLandmark(){

	//so after continue trail is pressed, we should update the currentStore number
	//only if that landmark was a store
	//the other place it is updated is goToStore, only for matts store
	/*
	if(listOfStores.indexOf(currentLandmark) != -1){
		currentStoreNum += 1;
	}
	*/
	//update landmark counter
	currentLandmark += 1;

	//update with next landmark
	updateLandmark();

	//updates the travel values with updated stuff
	setTravelValues();

	openNextMenu('landmarkWithShopMenu', 'theTrail');

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




function goToStore(currentDiv){


	currentStore = listOfStores[currentStoreNum];

	//only if it's matts store we increase the number
	//continueFromLandmark function updates other times
	//because as soon as we continue on the trail we are done with that landmark
	/*
	if(currentStoreNum == 0){
		currentStoreNum += 1;
	}
	*/


	document.getElementById("storeName").innerHTML = currentStore + " store";
	document.getElementById("moneyGoesHere").innerHTML = "You have $" + money + " to spend.";

	//set up shop with prices of stuff
	document.getElementById("oxenPrice").innerHTML = "$" + prices[currentStore].oxen + " per oxen (MAX 9)";
	document.getElementById("foodPrice").innerHTML = "$" + prices[currentStore].food + " per 25lbs (MAX 9999)";
	document.getElementById("clothingPrice").innerHTML = "$" + prices[currentStore].clothes + " per pair (MAX 99)";
	document.getElementById("wheelPrice").innerHTML = "$" + prices[currentStore].parts + " per wheel (MAX 9)";
	document.getElementById("axelPrice").innerHTML = "$" + prices[currentStore].parts + " per axle (MAX 9)";
	document.getElementById("tonguePrice").innerHTML = "$" + prices[currentStore].parts + " per tongue (MAX 9)";
	
	openNextMenu(currentDiv, 'theStore');
}



function setNames(){

	//get names in the elements
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

	//set month of the year
	switch(theMonth){
		case "March":
			m = 2;
			break;
		
		case "April":
			m = 3;
			break;
		
		case "May":
			m = 4;
			break;
		
		case "June":
			m = 5;
			break;

		case "July":
			m = 6;
			break;
	}

	theDate = new Date(1880, m, 1);
	
	//updates weather based on month
	updateWeather();

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


//inside shop
//gets subTotals of stuff
function updateSubTotal(numDiv, subDiv, item){

	var number = document.getElementById(numDiv).value;
	var sub = document.getElementById(subDiv);
	var total = document.getElementById("total");

	//changes sub total of current item
	sub.innerHTML = Math.round( (parseInt(number) * prices[currentStore][item]) * 100) / 100;

	//adds up totals of all items
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

	//gets sub total of all items
	var oxenSub = parseFloat(document.getElementById("oxenSub").innerHTML);
	var foodSub = parseFloat(document.getElementById("foodSub").innerHTML);
	var clothingSub = parseFloat(document.getElementById("clothingSub").innerHTML);
	var tongueSub = parseFloat(document.getElementById("tongueSub").innerHTML);
	var wheelSub = parseFloat(document.getElementById("wheelSub").innerHTML)
	var axelSub = parseFloat(document.getElementById("axelSub").innerHTML); 

	totalPrice = oxenSub + foodSub + clothingSub + tongueSub + wheelSub + axelSub;

	//invalid amount of money
	if(totalPrice > money){
		alert("You cannot spend more money than you have!");
	}

	//valid amount of money
	else{
		openNextMenu("theStore", "landmarkWithShopMenu");
		theFood = document.getElementById("numFood").value;
		theOxen = document.getElementById("numOxen").value;
		theClothes = document.getElementById("numClothing").value;
		theTongues = document.getElementById("numTongues").value;
		theAxels = document.getElementById("numAxles").value;
		theWheels = document.getElementById("numWheels").value;
		money -= totalPrice;
	}

	setTravelValues();
}






//this function is called whenever continue is pressed while user is traveling
function continueTrail(){
	console.log("Pace: " + currentPace);
	console.log("Rationing: " + currentRationing);

	//increment date before getting weather because weather is based off of month
	theDate.setDate(theDate.getDate() + 1);

	//function that uses the current month to update the weather based on that month
	//function should also update the health
	updateWeather();

	//takes current food and updates it based on how much they are eating
	//this function should also update the health
	updateFood();

	//takes current distance and updates it based on ox and speed up to an amount
	//function should also update the health
	updateDistance();


	//updates next landmark with distance and changes name of landmark if it goes over
	if(placesMiles[currentLandmark].distance == milesWithThisLandmark){

		alert("You made it to " + placesMiles[currentLandmark].place);

		//if green river or fort walla walla we need to increase by 2
		if(currentLandmark == 8 || currentLandmark == 10 || currentLandmark == 16){
			currentLandmark += 2;
		}
		else{
			currentLandmark += 1;
		}
		milesWithThisLandmark = 0;

		if(currentLandmark == 8 || currentLandmark == 10 || currentLandmark == 16){
			alert("Taking " + placesMiles[currentLandmark].place + " path by default");
		}
	}

	updateLandmark();


	getHealth();
	setTravelValues();

	console.log("Health Bars: " + theHealth);
}






//this function takes the current values and updates them with whatever values are pesent
//does not take any parameters or give any output
function setTravelValues(){

	//there are two places where the date should go
	//for some reason they cant have the same name
	document.getElementById("dateGoesHere").innerHTML = "Date: " + monthNames[theDate.getMonth()] + " " + theDate.getDate() + " " + theDate.getFullYear();
	document.getElementById("theDateGoesHere").innerHTML = "Date: " + monthNames[theDate.getMonth()] + " " + theDate.getDate() + " " + theDate.getFullYear();
	
	document.getElementById("weatherGoesHere").innerHTML = "Weather: " + theWeather;
	document.getElementById("healthGoesHere").innerHTML = "Health: " + getHealth();
	document.getElementById("foodGoesHere").innerHTML = "Food: " + theFood;

	//update with next landmark
	var thisJson = placesMiles[currentLandmark];
	document.getElementById("nextLandmarkGoesHere").innerHTML = nextLandmark;

	document.getElementById("milesTraveledGoesHere").innerHTML = "Miles traveled: " + milesTraveled;
}





//changes distance based on number of oxen
//Subtracts a random number between 0-2 from distance for randomness
//updates health when done
function updateDistance(){

	var milesToAdd = 4 * theOxen * paceChoices[currentPace].ratio;
	var max = 0;


	//based on pace there can only be so much change in distance
	if(currentPace == "Grueling"){
		max = 50;
	}
	
	else if(currentPace == "Strenuous"){
		max = 40;
	}

	else if(currentPace ==	"Steady"){
		max = 30;
	}


	//can only go a max of so many miles
	if(milesToAdd > max){
		milesToAdd = max;
	}

	milesToAdd -= Math.floor(Math.random() * 3);

	//if overshoot a landmark, go back to the landmark
	if(milesToAdd + milesWithThisLandmark > placesMiles[currentLandmark].distance){
		milesToAdd = placesMiles[currentLandmark].distance - milesWithThisLandmark;
	}


	//add total miles
	milesWithThisLandmark += milesToAdd;
	milesTraveled += milesToAdd;


	//update the health with the current pace they're goin at
	updateHealth(paceChoices[currentPace].health);
}







//finds the next landmark and replaces the nextLandmark with the newest one
function updateLandmark(){
	var thisJson = placesMiles[currentLandmark];
	nextLandmark = "Next landmark: " + thisJson.place + "(" + (thisJson.distance - milesWithThisLandmark) + " miles)";
}







//gets random weather based upon the month
function updateWeather(){

	month = theDate.getMonth();

	var weatherChoices;


	//december, jan, feb, march
	if(month >= 11 || month <= 3){
		weatherChoices = monthWeather[0];
	}
		
	//april
	if(month == 4){
		weatherChoices = monthWeather[1];
	}

	//may
	if(month == 5){
		weatherChoices = monthWeather[2];
	}

	//june
	if(month == 6){
		weatherChoices = monthWeather[3];	
	}
		
	//july, aug, sept, oct
	if(month >= 7 && month <= 10){
		weatherChoices = monthWeather[4];
	}

	theWeather = weatherChoices[Math.floor(Math.random() * weatherChoices.length)];

	updateHealth(weather[theWeather].health);
}








//updates food based on current rationing
//also updates the health
function updateFood(){

	var tempRation = currentRationing;

	//if they currently have no food they lose a bunch of points
	if(theFood == 0){
		tempRation = "None";
	}



	//count how many are still alive, and then deduct the total food left based on rationing and num people
	else if(theFood != 0){

		var numAlive = 0;
		for(var i =0; i < theHealth.length; i++){
			if(theHealth[i] > 0){
				numAlive += 1;
			}
		}

		theFood -= numAlive * rationingChoices[currentRationing].lbsPer;

		if(theFood < 0){
			theFood = 0;
		}
	}


	//update health based on how well they are being fed
	updateHealth(rationingChoices[tempRation].health);

}







//adds whatever health constant is passed in
//if someone falls below 0 they die
function updateHealth(healthChange){
	for(var i = 0; i < theHealth.length; i++){

		//player cannot be ressurected if already dead
		if(theHealth[i] != 0){
			theHealth[i] += healthChange
		}

		//the player dies
		if(theHealth[i] < 0){
			theHealth[i] = 0;
		}

	}
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
	else if(avgHealth > 0){
		return "Poor";
	}
	else{
		return "Dead";
	}
}


function sizeUp(){
	openNextMenu('theTrail', 'landmarkWithShopMenu');
}



//pulls up all supplies?
function checkSupplies(divId){
	document.getElementById("numberOfOxen").innerHTML = theOxen;
	document.getElementById("numberOfClothes").innerHTML = theClothes;
	document.getElementById("numberOfWheels").innerHTML = theWheels;
	document.getElementById("numberOfAxles").innerHTML = theAxels;
	document.getElementById("numberOfTongues").innerHTML = theTongues;
	document.getElementById("numberOfFood").innerHTML = theFood;
	document.getElementById("numberOfMoney").innerHTML = "$" + money;
	openNextMenu(divId, "suppliesMenu");
}




//changes pace based on button selected
//PROBABLY SHOULD GO BACK A MENU AFTER
function changePace(paceChosen){
	currentPace = paceChosen;
	openNextMenu('paceMenu', 'landmarkWithShopMenu');
}

//changes rationing based on button selected
//PROBABLY SHOULD GO BACK A MENU AFTER
function changeFoodRations(rationsChosen){
	currentRationing = rationsChosen;
	openNextMenu('foodMenu', 'landmarkWithShopMenu');
}

//complex function
//does more than just advance days
//similar to continue trail
function stopToRest(){

}


function attemptToTrade(){

}

function talkToPeople(){

}
