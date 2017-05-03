/*******************************************************************************
*	File: proj2.js
*	Date created: 4/1/17
*	Last Modified: 4/30/17
*	Authors: Alex McCaslin, Brendan Waters, Eric Gottlieb, Taylor Brzuchalski
*
*	Email:
*			mccalex1@umbc.edu
*			b101@umbc.edu
*			eric29@umbc.edu
*			tbrz1@umbc.edu
*
*	Description: This file contains the functions used in the project
*
*******************************************************************************/

//this file holds the functions used throughout the project		

function openNextMenu(currentDiv, nextDivId){
	document.getElementById(currentDiv).style.display = "none";
	document.getElementById(nextDivId).style.display = "block";
	if(nextDivId == 'seeTopTen'){
		setUpHighScores();
	}
}




//when the user is in a landmark menu and hits continue on trail
function continueFromLandmark(){
	//update landmark counter
	currentLandmark += 1;

	//update with next landmark
	updateLandmark();

	//updates the travel values with updated stuff
	setTravelValues();

	openNextMenu(shopOrNotShopMenu, 'theTrail');
	shopOrNotShopMenu = "noShopMenu";

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
	//continueTrail function updates other times
	//because if we reach a landmark that has a store we want to go to that landmarks store
	if(currentStoreNum == 0){
		currentStoreNum += 1;
	}
	


	document.getElementById("storeName").innerHTML = currentStore + " store";
	document.getElementById("moneyGoesHere").innerHTML = "You have $" + money + " to spend.";

	//set up shop with prices of stuff
	document.getElementById("oxenPrice").innerHTML = "$" + prices[currentStore].oxen + " per oxen (MAX " + MAXOXEN + ")";
	document.getElementById("foodPrice").innerHTML = "$" + prices[currentStore].food + " per 25lbs (MAX " + MAXFOOD + ")";
	document.getElementById("clothingPrice").innerHTML = "$" + prices[currentStore].clothes + " per pair (MAX " + MAXCLOTHES + ")";
	document.getElementById("wheelPrice").innerHTML = "$" + prices[currentStore].parts + " per wheel (MAX " + MAXPART + ")";
	document.getElementById("axelPrice").innerHTML = "$" + prices[currentStore].parts + " per axle (MAX " + MAXPART + ")";
	document.getElementById("tonguePrice").innerHTML = "$" + prices[currentStore].parts + " per tongue (MAX " + MAXPART + ")";
	
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
	theTotal += parseFloat(document.getElementById("wheelSub").innerHTML);
	theTotal += parseFloat(document.getElementById("axelSub").innerHTML); 
	
	total.innerHTML = theTotal;

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



	var canBuyThisStuff = canIBuy(oxenSub, foodSub, clothingSub, tongueSub, axelSub, totalPrice);

	if(canBuyThisStuff == true){
		openNextMenu("theStore", shopOrNotShopMenu);
		theFood += parseInt(document.getElementById("numFood").value);
		theOxen += parseInt(document.getElementById("numOxen").value);
		theClothes += parseInt(document.getElementById("numClothing").value);
		theTongues += parseInt(document.getElementById("numTongues").value);
		theAxels += parseInt(document.getElementById("numAxles").value);
		theWheels += parseInt(document.getElementById("numWheels").value);
		money -= totalPrice;
		setTravelValues();
	}

}



//function that returns whether or not you can buy this stuff
function canIBuy(oxenSub, foodSub, clothingSub, tongueSub, axelSub, totalPrice){
	var can = true;

	//invalid amount of money
	if(totalPrice > money){
		alert("You cannot spend more money than you have!");
		can = false;
	}

	//checks if they have no oxen, are buying no oxen, and they have enough money to purchase 1
	else if(theOxen == 0 && oxenSub == 0 && money > parseInt(prices[currentStore].oxen)){
		alert("You need at least one oxen to continue, and you have the money to buy at least 1");
		can = false;
	}

	//too many oxen
	else if(parseInt(document.getElementById("numOxen").value) + theOxen > MAXOXEN){
		alert("You can only have " + MAXOXEN + " oxen. You currently have " + theOxen);
		can = false;
	}

	//too much food
	else if(parseInt(document.getElementById("numFood").value) + theFood > MAXFOOD){
		alert("You can only have " + MAXFOOD + " pounds of food. You currently have " + theFood);
		can = false;
	}

	//too much clothes
	else if(parseInt(document.getElementById("numClothing").value) + theClothes > MAXCLOTHES){
		alert("You can only have " + MAXCLOTHES + " pairs of clothes. You currently have " + theClothes);
		can = false;
	}

	//too many tongues
	else if(parseInt(document.getElementById("numTongues").value) + theTongues > MAXPART){
		alert("You can only have " + MAXPART + " wagon tongues. You currently have " + theTongues);
		can = false;
	}

	//too many axels
	else if(parseInt(document.getElementById("numAxles").value) + theAxels > MAXPART){
		alert("You can only have " + MAXPART + " axels. You currently have " + theAxels);
		can = false;
	}

	//too many wheels
	else if(parseInt(document.getElementById("numWheels").value) + theWheels > MAXPART){
		alert("You can only have " + MAXPART + " wheels. You currently have " + theWheels);
		can = false;
	}



	return can
}




//helper function to continueTrail()
//can only continue if there are people alive and have oxen
function continuePressed(){

	if(getNumAlive() == 0){
		alert("All your people are dead");
	}
	else if(theOxen == 0){
		alert("You have no oxen, you cannot go anywhere");
	}
	else{
		continueTrail();
	}

}


//this function is called whenever continue is pressed while user is traveling
function continueTrail(){

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

		updateLandmarkPixel();

		//if this landmark is in the list of stores open ask for store menu
		if(listOfStores.indexOf(placesMiles[currentLandmark].place) != -1){
			alert("You made it to the " + placesMiles[currentLandmark].place + "and it has a store!!!");
			currentStoreNum += 1;
			shopOrNotShopMenu = "landmarkWithShopMenu";
			openNextMenu("theTrail", shopOrNotShopMenu);
		}
		else{
			alert("You made it to the " + placesMiles[currentLandmark].place);
		}




		//if green river or fort walla walla we need to increase by 2
		//THIS IS BY DEFAULT FOR NOW THE USER WILL HAVE CHOICE
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



//function that updates the landmark back to the left side of the screen
function updateLandmarkPixel(){
	landmarkPixel = 0;
	document.getElementById("animateLandmark").style.left = "1px";
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

	animateLandmark(milesToAdd);
}



//moves the landmark image over with each click of continue
//https://www.w3schools.com/js/tryit.asp?filename=tryjs_dom_animate_3
function animateLandmark(milesToAdd){

	var distanceToMove = parseInt(window.innerWidth * (milesToAdd / placesMiles[currentLandmark].distance) * .75);

	console.log("Distance to move " + distanceToMove);

	var elem = document.getElementById("animateLandmark");

	var start = landmarkPixel;
	console.log("Start: " + start);

	var pos = 0;

	var id = setInterval(frame, 10);
	function frame(){

		if(pos == distanceToMove){
			clearInterval(id);
			landmarkPixel += distanceToMove;
		}
		else{
			pos++;
			elem.style.left = pos + start;
		}
	}
}





//finds the next landmark and replaces the nextLandmark with the newest one
function updateLandmark(){
	var thisJson = placesMiles[currentLandmark];
	nextLandmark = "Next landmark: " + thisJson.place + "(" + (thisJson.distance - milesWithThisLandmark) + " miles)";
}







//gets random weather based upon the month
function updateWeather(){

	month = theDate.getMonth();

	var weatherChoices = monthWeather[month];

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

		numAlive = getNumAlive();

		theFood -= numAlive * rationingChoices[currentRationing].lbsPer;

		if(theFood < 0){
			theFood = 0;
		}
	}


	//update health based on how well they are being fed
	updateHealth(rationingChoices[tempRation].health);

}


//checks how many characters are still alive
function getNumAlive(){
	var numAlive = 0;
	for(var i =0; i < theHealth.length; i++){
		if(theHealth[i] > 0){
			numAlive += 1;
		}
	}

	return numAlive;
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
		alert("Everyone is dead");
		return "Dead";
	}
}


function sizeUp(){
	shopOrNotShopMenu = 'noShopMenu';
	openNextMenu('theTrail', shopOrNotShopMenu);
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
	openNextMenu('paceMenu', shopOrNotShopMenu);
}

//changes rationing based on button selected
//PROBABLY SHOULD GO BACK A MENU AFTER
function changeFoodRations(rationsChosen){
	currentRationing = rationsChosen;
	openNextMenu('foodMenu', shopOrNotShopMenu);
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
