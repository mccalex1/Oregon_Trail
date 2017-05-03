/*******************************************************************************
*	File: constants.js
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
*	Description: This file contains the constants used in the project
*
*******************************************************************************/


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

var wampURL = "http://localhost/Oregon_Trail/"

var monthNames = ["January", "February", "March", "April", "May", "June",
  					"July", "August", "September", "October", "November", "December"];

var careers = 	{
					"Banker" : {"money": "1600", "pointMultiplyer": "1"},
					"Carpenter" : {"money": "800", "pointMultiplyer": "2"},
					"Farmer" : {"money": "400", "pointMultiplyer": "3"}
				};

var monthWeather = [
						["Very Cold", "Cold", "Cool"],			//january
						["Very Cold", "Cold", "Cool"],    		//february
						["Very Cold", "Cold", "Cool", "Warm"],	//march
						["Cold", "Cool", "Warm"],				//april
						["Cool", "Warm", "Hot"],				//may
						["Cool", "Warm", "Hot", "Very Hot"],	//June
						["Warm", "Hot", "Very Hot"],			//july
						["Cool", "Warm", "Hot", "Very Hot"],    //august
						["Cool", "Warm", "Hot"], 				//september
						["Cold", "Cool", "Warm"], 				//november
						["Very Cold", "Cold", "Cool", "Warm"]	//december
					];

//health points based on weather
var weather =   {
					"Very Cold":{"health": -2},
					"Cold":     {"health": -1},
					"Cool":     {"health": 0},
					"Warm":     {"health": 0},
					"Hot":      {"health": -1},
					"Very Hot": {"health": -2}
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


//Max number of extra stuff
var MAXOXEN = 9;
var MAXFOOD = 2000;
var MAXCLOTHES = 99;
var MAXPART = 3;


//prices based on place
//2 oxen, 1 pound of food
var theOxen = 0;
var theClothes = 0;
var theWheels = 0;
var theAxels = 0;
var theTongues = 0;


var shopOrNotShopMenu = "landmarkWithShopMenu";
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
var landmarkPixel = 0;
var placesMiles = 	[

						{"place" : "Independence, MO",				'distance' : 0, 	'filePath' : "images/"},	//landmark 0
						{"place" : "Kansas River Crossing",			'distance' : 102, 	'filePath' : "images/"},	//landmark 1
						{"place" : "Big Blue River Crossing",		'distance' : 83, 	'filePath' : "images/"},	//landmark 2
						{"place" : "Ft. Kearney",					'distance' : 119, 	'filePath' : "images/"},	//landmark 3
						{"place" : "Chimney Rock", 					'distance' : 250, 	'filePath' : "images/"},	//landmark 4
						{"place" : "Ft. Laramie", 					'distance' : 86, 	'filePath' : "images/"},	//landmark 5
						{"place" : "Independence Rock", 			'distance' : 190, 	'filePath' : "images/"},	//landmark 6
						{"place" : "South Pass",					'distance' : 102, 	'filePath' : "images/"},	//landmark 7

						//road splits here
						{"place" : "Green River",					'distance' : 57, 	'filePath' : "images/"},	//landmark (8) 8.1
						{"place" : "Fort Bridge",					'distance' : 125, 	'filePath' : "images/"},	//landmark (9) 8.2
						{"place" : "Soda Springs",					'distance' : 144, 	'filePath' : "images/"},	//landmark (10) 9.1 distance from green river
						{"place" : "Soda Springs",					'distance' : 162, 	'filePath' : "images/"},	//landmark (11) 9.2 distance from fort bridge

						//road comes back together
						{"place" : "Ft. Hall",						'distance' : 57, 	'filePath' : "images/"},	//landmark 12 
						{"place" : "Snake River",					'distance' : 182, 	'filePath' : "images/"},	//landmark 13 
						{"place" : "Ft. Boise",						'distance' : 114, 	'filePath' : "images/"},	//landmark 14 
						{"place" : "Blue Mountain",					'distance' : 160, 	'filePath' : "images/"},	//landmark 15 

						//road splits here
						{"place" : "Ft. Walla Walla",				'distance' : 55, 	'filePath' : "images/"},	//landmark (16) 16.1
						{"place" : "The Dalles",					'distance' : 125, 	'filePath' : "images/"},	//landmark (18) 17.1 distance from blue mountain
						{"place" : "The Dalles",					'distance' : 120, 	'filePath' : "images/"},	//landmark (17) 17.2 distance from ft walla

						//road comes back together
						{"place" : "Barlow Toll Road",				'distance' : 100, 	'filePath' : "images/"}	//landmark 19
					];
