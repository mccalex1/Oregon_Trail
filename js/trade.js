/*******************************************************************************
*	File: trade.js
*	Date created: 4/1/17
*	Last Modified: 5/15/17
*	Authors: Alex McCaslin, Brendan Waters, Eric Gottlieb, Taylor Brzuchalski
*
*	Email:
*			mccalex1@umbc.edu
*			b101@umbc.edu
*			eric29@umbc.edu
*			tbrz1@umbc.edu
*
*	Description: This file contains the ability to trade with an NPC
*
*******************************************************************************/

//goes to the trade menu after updating the tds with the
//trade values
//takes in the current div
function goToTradeMenu(currentDiv){

	getRandomItem("theirItemNum", "theirItemName");

	getRandomItem("yourItemNum", "yourItemName");

	openNextMenu(currentDiv, "tradeMenu");
}


//picks random item against the max that you can possibly have
//takes in the number of items and the name of the item
function getRandomItem(numberOfItem, itemName){

	var random = Math.floor(Math.random() * 7) + 1;
	var item = "";

	var num = document.getElementById(numberOfItem);
	var name = document.getElementById(itemName);

	//picks a random number of something based off the max
	switch(random){
		case 1:
			num.innerHTML = (Math.floor(Math.random() * MAXOXEN) + 1)
			name.innerHTML = "oxen";
			break;

		case 2:
			num.innerHTML = (Math.floor(Math.random() * MAXFOOD) + 1)
			name.innerHTML = "food";
			break;

		case 3:
			num.innerHTML = (Math.floor(Math.random() * MAXCLOTHES) + 1)
			name.innerHTML = "clothes";
			break;

		case 4:
			num.innerHTML = (Math.floor(Math.random() * MAXPART) + 1)
			name.innerHTML = "wheels";
			break;

		case 5:
			num.innerHTML = (Math.floor(Math.random() * MAXPART) + 1)
			name.innerHTML = "axle";
			break;

		case 6:
			num.innerHTML = (Math.floor(Math.random() * MAXPART) + 1)
			name.innerHTML = "tongue";
			break;

		case 7:
			num.innerHTML = (Math.floor(Math.random() * MAXWORMS) + 1)
			name.innerHTML = "worm";
			break;
	}

}


//attempts to trade if they have enough of the item the NPC wants
//takes in no variables
function attemptToTrade(){

	var yourNum = parseInt(document.getElementById("yourItemNum").innerHTML);
	var yourName = document.getElementById("yourItemName").innerHTML;

	//checks if they have enough of the item to trade and if so subtracts it and updates the other
	switch(yourName){
		case "oxen":
			if(theOxen < yourNum){
				alert("Cannot trade, you do not have enough oxen");
			}
			else{
				theOxen -= yourNum;
				alert("gay");
				updateOther();
			}
			break;

		case "food":
			if(theFood < yourNum){
				alert("Cannot trade, you do not have enough food");
			}
			else{
				theFood -= yourNum;
				updateOther();
			}

			break;

		case "clothes":
			if(theClothes < yourNum){
				alert("Cannot trade, you do not have enough clothes");
			}
			else{
				theClothes -= yourNum;
				updateOther();
			}

			break;

		case "wheels":
			if(theWheels < yourNum){
				alert("Cannot trade, you do not have enough wheels");
			}
			else{
				theWheels -= yourNum;
				updateOther();
			}

			break;

		case "axle":
			if(theAxles < yourNum){
				alert("Cannot trade, you do not have enough axles");
			}
			else{
				theAxles -= yourNum;
				updateOther();
			}

			break;

		case "tongue":
			if(theTongues < yourNum){
				alert("Cannot trade, you do not have enough wagon tongues");
			}
			else{
				theTongues -= yourNum;
				updateOther();
			}

			break;

		case "worm":
			if(theWorms < yourNum){
				alert("Cannot trade, you do not have enough worms");
			}
			else{
				theWorms -= yourNum;
				updateOther();
			}

			break;
	}

}


//updates your values with whatever the npc wanted to give you
function updateOther(){

	var theirNum = parseInt(document.getElementById("theirItemNum").innerHTML);
	var theirName = document.getElementById("theirItemName").innerHTML;

	switch(theirName){
		case "oxen":
			theOxen += theirNum;
			break;

		case "food":
			theFood += theirNum;
			break;

		case "clothes":
			theClothes += theirNum;
			break;

		case "wheels":
			theWheels += theirNum;
			break;

		case "axle":
			theAxles += theirNum;
			break;

		case "tongue":
			theTongues += theirNum;
			break;

		case "worm":
			theWorms += theirNum;
			break;
	}

	//updates the travel values with updated stuff
	setTravelValues();
}