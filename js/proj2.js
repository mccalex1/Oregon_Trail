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



function continueFromRiver(){

	//update landmark counter by 1
	//only if we dont already jump 2
	//if it is after a split it needs to jump by two the way the data structure is set up
	if(jumpTwo.indexOf(currentLandmark) != -1){
		currentLandmark += 2;
	}
	else{
		currentLandmark += 1;
	}
	
	//update with next landmark
	updateLandmark();

	//updates the travel values with updated stuff
	setTravelValues();

	openNextMenu("riverCrossing", 'theTrail');
}


//when the user is in a landmark menu and hits continue on trail
function continueFromLandmark(){

	//update landmark counter by 1
	//only if we dont already jump 2
	//if it is after a split it needs to jump by two the way the data structure is set up
	if(jumpTwo.indexOf(currentLandmark) != -1){
		currentLandmark += 2;
	}
	else{
		currentLandmark += 1;
	}

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
		document.getElementById("noShopMenuLandmarkName").innerHTML = placesMiles[currentLandmark].place;
		document.getElementById("shopMenuLandmarkName").innerHTML = placesMiles[currentLandmark].place;
	}
	


	document.getElementById("storeName").innerHTML = currentStore + " store";
	document.getElementById("moneyGoesHere").innerHTML = "You have $" + money + " to spend.";

	//set up shop with prices of stuff
	document.getElementById("oxenPrice").innerHTML = "$" + prices[currentStore].oxen + " per oxen (MAX " + MAXOXEN + ")";
	document.getElementById("foodPrice").innerHTML = "$" + prices[currentStore].food + " per 25lbs (MAX " + MAXFOOD + ")";
	document.getElementById("clothingPrice").innerHTML = "$" + prices[currentStore].clothes + " per pair (MAX " + MAXCLOTHES + ")";
	document.getElementById("wheelPrice").innerHTML = "$" + prices[currentStore].parts + " per wheel (MAX " + MAXPART + ")";
	document.getElementById("axlePrice").innerHTML = "$" + prices[currentStore].parts + " per axle (MAX " + MAXPART + ")";
	document.getElementById("tonguePrice").innerHTML = "$" + prices[currentStore].parts + " per tongue (MAX " + MAXPART + ")";
	document.getElementById("wormsPrice").innerHTML = "$" + prices[currentStore].worms + " per 100 worms (MAX " + MAXWORMS + ")";
	
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

	//checks if value is empty
	if(document.getElementById(numDiv).value == ""){
		document.getElementById(numDiv).value = 0;
	}

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
	theTotal += parseFloat(document.getElementById("axleSub").innerHTML); 
	theTotal += parseFloat(document.getElementById("wormsSub").innerHTML); 
	
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
	var axleSub = parseFloat(document.getElementById("axleSub").innerHTML); 
	var wormsSub = parseFloat(document.getElementById("wormsSub").innerHTML); 

	totalPrice = oxenSub + foodSub + clothingSub + tongueSub + wheelSub + axleSub + wormsSub;



	var canBuyThisStuff = canIBuy(oxenSub, foodSub, clothingSub, tongueSub, axleSub, wormsSub, totalPrice);

	if(canBuyThisStuff == true){

		//if matts store open up the independence image instead of the normal menu
		if(currentStoreNum == 0){
			currentStoreNum += 1;
			document.getElementById("landmarkPic").src = placesMiles[currentLandmark].filePath;
			openNextMenu("theStore", "imageMenu");
		}
		else{
			openNextMenu("theStore", shopOrNotShopMenu);
		}


		theFood += parseInt(document.getElementById("numFood").value);
		theOxen += parseInt(document.getElementById("numOxen").value);
		theClothes += parseInt(document.getElementById("numClothing").value);
		theTongues += parseInt(document.getElementById("numTongues").value);
		theAxles += parseInt(document.getElementById("numAxles").value);
		theWheels += parseInt(document.getElementById("numWheels").value);
		theWorms += parseInt(document.getElementById("numWorms").value) * WORMSINABOX;
		money -= totalPrice;
		setTravelValues();

		//reset the values within the boxes
		document.getElementById("numFood").value = 0;
		document.getElementById("numOxen").value = 0;
		document.getElementById("numClothing").value = 0;
		document.getElementById("numTongues").value = 0;
		document.getElementById("numAxles").value = 0;
		document.getElementById("numWheels").value = 0;
		document.getElementById("numWorms").value = 0;

		//reset the sub totals
		document.getElementById("oxenSub").innerHTML = 0;
		document.getElementById("foodSub").innerHTML = 0;
		document.getElementById("clothingSub").innerHTML = 0;
		document.getElementById("tongueSub").innerHTML = 0;
		document.getElementById("wheelSub").innerHTML = 0;
		document.getElementById("axleSub").innerHTML = 0; 
		document.getElementById("wormsSub").innerHTML = 0; 
	}

}



//function that returns whether or not you can buy this stuff
function canIBuy(oxenSub, foodSub, clothingSub, tongueSub, axleSub, wormsSub, totalPrice){
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

	//too many axles
	else if(parseInt(document.getElementById("numAxles").value) + theAxles > MAXPART){
		alert("You can only have " + MAXPART + " axles. You currently have " + theAxles);
		can = false;
	}

	//too many wheels
	else if(parseInt(document.getElementById("numWheels").value) + theWheels > MAXPART){
		alert("You can only have " + MAXPART + " wheels. You currently have " + theWheels);
		can = false;
	}


	//too many worms
	else if((parseInt(document.getElementById("numWorms").value) * WORMSINABOX) + theWorms > MAXWORMS){
		alert("You can only have " + MAXWORMS + " worms. You currently have " + theWorms);
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

		//see if random event happens
		eventHappened = randomEvent();

		if(!eventHappened){
			continueTrail();
		}

	}

}

function doDay(){
	//increment date before getting weather because weather is based off of month
	theDate.setDate(theDate.getDate() + 1);

	//function that uses the current month to update the weather based on that month
	//function should also update the health
	updateWeather();

	//takes current food and updates it based on how much they are eating
	//this function should also update the health
	updateFood();

	setTravelValues();
}



//this function is called whenever continue is pressed while user is traveling
function continueTrail(){

	doDay();

	//takes current distance and updates it based on ox and speed up to an amount
	//function should also update the health
	updateDistance();

	var atRiver = false;

	//updates next landmark with distance and changes name of landmark if it goes over
	if(placesMiles[currentLandmark].distance == milesWithThisLandmark){
		console.log("made it to " + placesMiles[currentLandmark].place);
		updateLandmarkPixel();

		//if this landmark is in the list of stores open ask for store menu
		if(listOfStores.indexOf(placesMiles[currentLandmark].place) != -1){
			
			shopOrNotShopMenu = "landmarkWithShopMenu";

			//alert("You made it to the " + placesMiles[currentLandmark].place + " and it has a store!!!");
			currentStoreNum += 1;

		}
		else{

			//alert("You made it to the " + placesMiles[currentLandmark].place);

			//if the place is a river
			if(placesMiles[currentLandmark].isRiver == true){
				atRiver = true;
			}

		}
		
		setTravelValues();

		document.getElementById("landmarkPic").src = placesMiles[currentLandmark].filePath;
		document.getElementById("noShopMenuLandmarkName").innerHTML = placesMiles[currentLandmark].place;
		document.getElementById("shopMenuLandmarkName").innerHTML = placesMiles[currentLandmark].place;

		//if i am at the river go to the river menu
		if(atRiver == true){
			document.getElementById("whatRiverAmIAt").innerHTML = placesMiles[currentLandmark].place;
			document.getElementById("riverDate").innerHTML = "Date: " + monthNames[theDate.getMonth()] + " " + theDate.getDate() + " " + theDate.getFullYear();
			document.getElementById("riverWidth").innerHTML = "River Width: " + placesMiles[currentLandmark].width;
			document.getElementById("riverDepth").innerHTML = "River Depth: " + (placesMiles[currentLandmark].depth + getRandomDepthChange());
			document.getElementById("riverPic").src = placesMiles[currentLandmark].filePath;
			openNextMenu("theTrail","riverMenu");
		}


		//if green river or fort walla walla we need to increase by 2
		//THIS IS BY DEFAULT FOR NOW THE USER WILL HAVE CHOICE
		if(splitBegins.indexOf(currentLandmark) != -1){

			document.getElementById("trailLeft").innerHTML = "To " + placesMiles[currentLandmark + 1].place;
			document.getElementById("trailRight").innerHTML = "To " + placesMiles[currentLandmark + 2].place;

			openNextMenu("theTrail", "trailDivides");


		}
		else if(!atRiver){
			openNextMenu("theTrail","imageMenu");
		}
		/*
		//if it is after a split it needs to jump by two the way the data structure is set up
		else if(jumpTwo.indexOf(currentLandmark) != -1){
			console.log("442: adding 2");
			currentLandmark += 2;
			if(!atRiver){
				openNextMenu("theTrail","imageMenu");
			}
		}

		else{
			if(!atRiver){
				//if its at river the open river menu was already called
				openNextMenu("theTrail","imageMenu");
			}
		}
		*/
		milesWithThisLandmark = 0;

	}

	document.getElementById("landmarkIcon").src = placesMiles[currentLandmark].icon;

	getHealth();
	setTravelValues();

	console.log("Health Bars: " + theHealth);
}



//called whenever the user picks to ford, caulk, ferry, or wait
function river(option){

	//Decide if they made it based on option
	var success = true;

	width = parseFloat(document.getElementById("riverWidth").innerHTML.substring(13));
	currentDepth = parseFloat(document.getElementById("riverDepth").innerHTML.substring(13));

	if(option == "ford"){

		if(currentDepth > 3.0){
			//automatic fail
			success = false;
		}

	}else if(option == "caulk"){

		if(width > 650){
			//automatic fail
			success = false;
		}else if(currentDepth > 3.0){

			chance = Math.random();
			if(chance < 0.2){
				success = false;
			}

		}

	}else if(option == "ferry"){

		//wait on ferry
		daysToWait = Math.floor(Math.random() * 7 + 1);
		alert("Waiting " + daysToWait + " days for the ferry...");
		//update stuff
		for(var i = 0; i < daysToWait; i++){
			theDate.setDate(theDate.getDate() + 1);
			updateWeather();
			updateFood();
		}

	}else if(option == "wait"){

		//wait 1 day
		theDate.setDate(theDate.getDate() + 1);
		updateWeather();
		updateFood();
		document.getElementById("riverDate").innerHTML = "Date: " + monthNames[theDate.getMonth()] + " " + theDate.getDate() + " " + theDate.getFullYear();
		document.getElementById("riverWidth").innerHTML = "River Width: " + placesMiles[currentLandmark].width;
		document.getElementById("riverDepth").innerHTML = "River Depth: " + (placesMiles[currentLandmark].depth + getRandomDepthChange());

		//lazy, cut it early
		return

	}

	var picSrc = "";

	//if they dont make it
	if(!success){
		var ranOxen = Math.floor(Math.random() * theOxen);
		var ranFood = Math.floor(Math.random() * theFood);
		var ranClothes = Math.floor(Math.random() * theClothes);
		var ranWheels = Math.floor(Math.random() * theWheels);
		var ranAxles = Math.floor(Math.random() * theAxles);
		var ranTongues = Math.floor(Math.random() * theTongues);
		var ranWorms = Math.floor(Math.random() * theWorms);


		document.getElementById("youLostFromRiver").innerHTML = "You Lost:"
																	+ "<br>Oxen: " + ranOxen
																	+ " Food: " + ranFood
																	+ "<br>Clothes: " + ranClothes
																	+ " Wheels: " + ranWheels
																	+ " <br>Axles: " + ranAxles
																	+ " Tongues: " + ranTongues
																	+ " Worms: " + ranWorms;

		theOxen -= ranOxen;
		theFood -= ranFood;
		theClothes -= ranClothes;
		theWheels -= ranWheels;
		theAxles -= ranAxles;
		theTongues -= ranTongues; 
		theWorms -= ranWorms; 


		if(option == 'ford' || option == 'caulk' || option == 'wait'){
			picSrc = "images/unsafe_river_crssoing.gif";
		}

		if(option == 'ferry'){
			picSrc = "images/unsafe_ferry_river_crossing.gif";
		}

	}

	//was successful
	else{
		document.getElementById("youLostFromRiver").innerHTML = "";
	
		if(option == 'ford' || option == 'caulk' || option == 'wait'){
			picSrc = "images/safe_river_crossing.gif";
		}

		if(option == 'ferry'){
			picSrc = "images/safe_ferry_river_crossing.gif";
		}

	}

	document.getElementById("riverCrossingImg").src = "";
	document.getElementById("riverCrossingImg").src = picSrc;

	openNextMenu("riverOptionsMenu", "riverCrossing");
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

	document.getElementById("lostAWorm").innerHTML = "Number of worms: " + theWorms;

	//update with next landmark
	var thisJson = placesMiles[currentLandmark];
	document.getElementById("nextLandmarkGoesHere").innerHTML = nextLandmark + "(" + (placesMiles[currentLandmark].distance - milesWithThisLandmark) + " miles to go)";

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


//when a split in the road is reached
//this functio is called with parameter left or right
function trailClick(direction){

	if(direction == "left"){
		console.log("622: adding 1");
		currentLandmark += 1;
	}

	//right
	else{
		console.log("628: adding 2");
		currentLandmark += 2;
	}

	//update with next landmark
	updateLandmark();

	//updates the travel values with updated stuff
	setTravelValues()

	openNextMenu("trailDivides", "theTrail");
}


//moves the landmark image over with each click of continue
//https://www.w3schools.com/js/tryit.asp?filename=tryjs_dom_animate_3
function animateLandmark(milesToAdd){

	var distanceToMove = parseInt(window.innerWidth * (milesToAdd / placesMiles[currentLandmark].distance) * .5);

	var elem = document.getElementById("animateLandmark");

	var start = landmarkPixel;
	console.log("Start: " + start);

	var pos = 0;

	//document.getElementById("pressToContinue").disabled = true;
	//document.getElementById("pressToContinue").className = "disabledButton";

	/*
	var id = setInterval(frame, 5);
	function frame(){

		if(pos == distanceToMove){
			clearInterval(id);
			document.getElementById("pressToContinue").disabled = false;
			document.getElementById("pressToContinue").className = "";
			landmarkPixel += distanceToMove;
		}
		else{
			pos++;
			elem.style.left = pos + start;
		}
	}
	*/
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
	document.getElementById("numberOfAxles").innerHTML = theAxles;
	document.getElementById("numberOfTongues").innerHTML = theTongues;
	document.getElementById("numberOfFood").innerHTML = theFood;
	document.getElementById("numberOfMoney").innerHTML = "$" + money;
	document.getElementById("numberOfWorms").innerHTML = theWorms;
	openNextMenu(divId, "suppliesMenu");
}


function fishAttempt(){
	
	var gotFishPath = "images/Fishing_gif_fish.gif";
	var notFishPath = "images/Fishing_gif_no_fish.gif";

	document.getElementById("fishingImg").src = "";



	//makes sure user has worms
	if(theWorms > 0){
		
		theWorms -= 1;
		document.getElementById("lostAWorm").innerHTML = "Number of worms: " + theWorms;

		//caught fish
		//give random weight of fish
		//update image src and food
		if(Math.floor(Math.random() * 3) + 1 == 3){

			document.getElementById("fishingImg").src = gotFishPath;

			var fishWeight = Math.floor(Math.random() * 30) + 1;

			document.getElementById("fishCatch").innerHTML = "You caught a fish that was " + fishWeight + " pounds!";
			if(theFood + fishWeight > MAXFOOD){
				theFood = MAXFOOD;
			}
			else{
				theFood += fishWeight;
			}

		}

		//didnt catch fish :(
		//update image src
		else{
			document.getElementById("fishingImg").src = notFishPath;
			document.getElementById("fishCatch").innerHTML = "You did not catch any fish";
		}
	}
	else{
		alert("You have no worms to fish with!");
	}

	setTravelValues();

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

function getRandomDepthChange(){
	//between +/-3, with 1 decimal place
	depthChange = Math.floor((Math.random() * 6 - 3) * 10) / 10;
	return depthChange;
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

function randomEvent(){

	chance = Math.random();

	if(chance < FIND_FRUIT){
		document.getElementById("eventImage").src = "";
		document.getElementById("eventImage").src = "images/wild_fruit.gif";
		document.getElementById("eventMessage").innerHTML = "You found wild fruit!";
		openNextMenu('theTrail','eventHappening');
		theFood += 50;
	}else if(chance < FIND_FRUIT + WAGON_FIRE){
		document.getElementById("eventImage").src = "";
		document.getElementById("eventImage").src = "images/wagon_fire.gif";
		document.getElementById("eventMessage").innerHTML = "Your wagon caught fire!";
		openNextMenu('theTrail','eventHappening');
		//TODO pull up lose screen
	}else if(chance < FIND_FRUIT + WAGON_FIRE + WAGON_PART){

		wagonPart = Math.random();

		//which part of the wagon broke
		if(wagonPart < 0.33){
			document.getElementById("eventImage").src = "";
			document.getElementById("eventImage").src = "images/wagon_broken_wheel.jpg";
			if(theWheels > 0){
				document.getElementById("eventMessage").innerHTML = "A wheel broke and had to be replaced.";
				theWheels -= 1;
				openNextMenu('theTrail','eventHappening');
			}else{
				document.getElementById("eventMessage").innerHTML = "A wheel broke and you have no replacements.";
				//lose
			}
		}else if(wagonPart < .66){
			document.getElementById("eventImage").src = "";
			document.getElementById("eventImage").src = "images/wagon_axle.gif";
			if(theAxles > 0){
				document.getElementById("eventMessage").innerHTML = "An axle broke and had to be replaced.";
				theAxles -= 1;
				openNextMenu('theTrail','eventHappening');
			}else{
				document.getElementById("eventMessage").innerHTML = "An axle broke and you have no replacements.";
				//lose
			}
		}else{
			document.getElementById("eventImage").src = "";
			document.getElementById("eventImage").src = "images/wagon_tongue.gif";
			if(theTongues > 0){
				document.getElementById("eventMessage").innerHTML = "A tongue broke and had to be replaced.";
				theTongues -= 1;
				openNextMenu('theTrail','eventHappening');
			}else{
				document.getElementById("eventMessage").innerHTML = "A tongue broke and you have no replacements.";
				//lose
			}
		}

	}else if(chance < FIND_FRUIT + WAGON_FIRE + WAGON_PART + ALIEN_ABDUCTION){
		
		document.getElementById("eventImage").src = "";
		document.getElementById("eventImage").src = "images/alien_gif.gif";

		//choose which member gets abducted
		member = Math.floor(Math.random() * team.length);
		while(theHealth[member] == 0){
			//this member is already dead, choose new one
			member = Math.floor(Math.random() * team.length);
		}

		document.getElementById("eventMessage").innerHTML = team[member] + " has been abducted!";

		//this member "died"
		theHealth[member] = 0;

		openNextMenu('theTrail','eventHappening');

		//TODO check for lose?

	}else if(chance < FIND_FRUIT + WAGON_FIRE + WAGON_PART + ALIEN_ABDUCTION + LOST_PATH){

		//lost for 1 to 4 days
		daysLost = Math.floor(Math.random() * 4 + 1);
		alert("Lost the path! Lose " + daysLost + " day(s).");
		for(var i = 0; i < daysLost; i++){
			theDate.setDate(theDate.getDate() + 1);
			updateWeather();
			updateFood();
		}

	}else if(chance < FIND_FRUIT + WAGON_FIRE + WAGON_PART + ALIEN_ABDUCTION + LOST_PATH + STORM){
		
		//lost for 1 to 4 days
		daysLost = Math.floor(Math.random() * 4 + 1);

		//decide what kind of storm based on month
		if(theDate.getMonth() >= 3 && theDate.getMonth() <= 8){
			document.getElementById("eventImage").src = "";
			document.getElementById("eventImage").src = "images/storm_gif.gif";
			document.getElementById("eventMessage").innerHTML = "Stuck in a storm! Lose " + daysLost + " day(s)."
		}else{
			document.getElementById("eventImage").src = "";
			document.getElementById("eventImage").src = "images/blizzard_gif.gif";
			document.getElementById("eventMessage").innerHTML = "Stuck in a blizzard! Lose " + daysLost + " day(s)."
		}

		openNextMenu('theTrail','eventHappening');

		for(var i = 0; i < daysLost; i++){
			theDate.setDate(theDate.getDate() + 1);
			updateWeather();
			updateFood();
		}

	}else if(chance < FIND_FRUIT + WAGON_FIRE + WAGON_PART + ALIEN_ABDUCTION + LOST_PATH + STORM + STOLEN_CLOTHING){

		if(theClothes > 0){

			//lost 1 to 3 clothing
			clothesLost = Math.floor(Math.random() * 3 + 1);
			while(clothesLost > theClothes){
				//user can only lose as many clothes as they have, just pick again
				clothesLost = Math.floor(Math.random() * 3 + 1);
			}

			document.getElementById("eventImage").src = "";
			document.getElementById("eventImage").src = "images/theif.gif";
			document.getElementById("eventMessage").innerHTML = "A thief has stolen " + clothesLost + " clothes!";
			openNextMenu('theTrail','eventHappening');	
			theClothes -= clothesLost;

		}

	}else if(chance < FIND_FRUIT + WAGON_FIRE + WAGON_PART + ALIEN_ABDUCTION + LOST_PATH + STORM + STOLEN_CLOTHING + SICKNESS){

		//choose which member gets sick
		member = Math.floor(Math.random() * team.length);
		while(theHealth[member] == 0){
			//this member is already dead, choose new one
			member = Math.floor(Math.random() * team.length);
		}

		//choose the sickness
		sickness = Math.floor(Math.random() * sicknesses.length);

		alert(team[member] + " has gotten " + sicknesses[sickness].name + "!");

		//update health, but don't go below zero
		theHealth[member] -= sicknesses[sickness].detriment;
		if(theHealth[member] < 0){
			theHealth[member] = 0;
		}



	}else if(chance < FIND_FRUIT + WAGON_FIRE + WAGON_PART + ALIEN_ABDUCTION + LOST_PATH + STORM + STOLEN_CLOTHING + SICKNESS + OX_WANDERED){
		
		if(theOxen > 0){
			document.getElementById("eventImage").src = "";
			document.getElementById("eventImage").src = "images/ox_icon.gif";
			document.getElementById("eventMessage").innerHTML = "An ox has wandered off!";
			openNextMenu('theTrail','eventHappening');
			theOxen -= 1;
		}

	}

	//if an event happened, let continueTrail know
	if(chance < EVENTS_TOTAL){
		return true;
	}else{
		return false;
	}

}
