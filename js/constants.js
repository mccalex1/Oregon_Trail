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
var MAXWORMS = 2000;
var WORMSINABOX = 100;


//prices based on place
//2 oxen, 1 pound of food
var theOxen = 0;
var theClothes = 0;
var theWheels = 0;
var theAxels = 0;
var theTongues = 0;
var theWorms = 0;


var shopOrNotShopMenu = "landmarkWithShopMenu";
currentStore = "";
currentStoreNum = 0;
listOfStores = ["Matts", "Independence", "Ft. Kearney", "Ft. Laramie", "Ft. Bridger", "Ft. Hall", "Ft. Boise", "Ft. Walla Walla"];
var prices = { 
				"Matts" : 			{'oxen': '20', 'clothes': '10', 	'parts': '10', 		'food': '.2',  'worms': '2'},	
				"Independence" : 	{'oxen': '25', 'clothes': '12.5', 	'parts': '12.5', 	'food': '.25', 'worms': '2.5'},		
				"Ft. Kearney" : 	{'oxen': '25', 'clothes': '12.5', 	'parts': '12.5', 	'food': '.25', 'worms': '3'},	
				"Ft. Laramie" : 	{'oxen': '30', 'clothes': '15', 	'parts': '15', 		'food': '.3',  'worms': '3.5'},
				"Ft. Bridger" : 	{'oxen': '35', 'clothes': '17.5',	'parts': '17.5', 	'food': '.35', 'worms': '4'},	
				"Ft. Hall" : 		{'oxen': '40', 'clothes': '20', 	'parts': '20', 		'food': '.4',  'worms': '4.5'},	
				"Ft. Boise" : 		{'oxen': '45', 'clothes': '22.5', 	'parts': '22.5',	'food': '.45', 'worms': '5'},	
				"Ft. Walla Walla" : {'oxen': '50', 'clothes': '25', 	'parts': '25', 		'food': '.5',  'worms': '5.5'}	
			};



//miles from start
var currentLandmark = 0;
var milesWithThisLandmark = 0;
var landmarkPixel = 0;
var splitBegins = [7, 15];
var jumpTwo = [8, 9, 10, 16, 17];
var placesMiles = [

					{"place" : "Independence, MO",			'isRiver': false, 'distance' : 0, 		'icon': "", 						'filePath' : "images/independence_background_from_game.jpg"},	//landmark 0
					{"place" : "Kansas River Crossing",		'isRiver': true, 'distance' : 102, 		'icon': "images/river_icon.gif", 	'filePath' : "images/kansas_river_crossing_background.jpg"},	//landmark 1
					{"place" : "Big Blue River Crossing",	'isRiver': true, 'distance' : 83, 		'icon': "images/river_icon.gif", 	'filePath' : "images/big_blue_river_crosssing.jpg"},			//landmark 2
					{"place" : "Ft. Kearney",				'isRiver': false, 'distance' : 119, 	'icon': "images/fort_icon_1.gif", 	'filePath' : "images/fort_kearney_background.jpg"},				//landmark 3
					{"place" : "Chimney Rock", 				'isRiver': false, 'distance' : 250, 	'icon': "images/rock_icon_1.gif", 	'filePath' : "images/Chimney_rock_background.jpg"},				//landmark 4
					{"place" : "Ft. Laramie", 				'isRiver': false, 'distance' : 86, 		'icon': "images/fort_icon_2.gif", 	'filePath' : "images/fort_laramie_background.jpg"},				//landmark 5
					{"place" : "Independence Rock", 		'isRiver': false, 'distance' : 190, 	'icon': "images/mountains_icon.gif",'filePath' : "images/indepence_rock_background.jpg"},		//landmark 6
					{"place" : "South Pass",				'isRiver': false, 'distance' : 102, 	'icon': "images/rock_icon_1.gif", 	'filePath' : "images/south_pass_background.jpg"},				//landmark 7

					//road splits here
					{"place" : "Green River",				'isRiver': true, 'distance' : 57, 		'icon': "images/river_icon.gif", 	'filePath' : "images/green_river_crossing_background.jpg"},	//landmark (8) 8.1 (left)
					{"place" : "Fort Bridger",				'isRiver': false, 'distance' : 125, 	'icon': "images/fort_icon_1.gif", 	'filePath' : "images/fort_bridger.jpg"},						//landmark (9) 8.2 (right)
					{"place" : "Soda Springs",				'isRiver': false, 'distance' : 144, 	'icon': "images/springs_icon.gif", 	'filePath' : "images/soda_springs_background.jpg"},				//landmark (10) 9.1 distance from green river (left)
					{"place" : "Soda Springs",				'isRiver': false, 'distance' : 162, 	'icon': "images/springs_icon.gif", 	'filePath' : "images/soda_springs_background.jpg"},				//landmark (11) 9.2 distance from fort bridge (right)

					//road comes back together
					{"place" : "Ft. Hall",					'isRiver': false, 'distance' : 57, 		'icon': "images/fort_icon_1.gif", 	'filePath' : "images/Fort_hall_background.jpg"},				//landmark 12 
					{"place" : "Snake River",				'isRiver': true, 'distance' : 182, 		'icon': "images/river_icon.gif", 	'filePath' : "images/snake_river_crossing.jpg"},				//landmark 13 
					{"place" : "Ft. Boise",					'isRiver': false, 'distance' : 114, 	'icon': "images/fort_icon_2.gif", 	'filePath' : "images/Fort_boise.jpg"},							//landmark 14 
					{"place" : "Blue Mountain",				'isRiver': false, 'distance' : 160, 	'icon': "images/mountains_icon.gif",'filePath' : "images/blue_mountains.jpg"},						//landmark 15 

					//road splits here
					{"place" : "Ft. Walla Walla",			'isRiver': false, 'distance' : 55, 		'icon': "images/fort_icon_1.gif", 	'filePath' : "images/fort_walla_walla.jpg"},					//landmark (16) 16.1(Left)
					{"place" : "The Dalles",				'isRiver': true, 'distance' : 125, 		'icon': "images/river_icon.gif", 	'filePath' : "images/the_dalles.jpg"},							//landmark (17) 17.1 distance from blue mountain (Right)
					{"place" : "The Dalles",				'isRiver': true, 'distance' : 120, 		'icon': "images/river_icon.gif", 	'filePath' : "images/the_dalles.jpg"},							//landmark (18) 17.2 distance from ft walla(left)

					//road comes back together
					{"place" : "Barlow Toll Road",			'isRiver': false, 'distance' : 100, 	'icon': "images/rock_icon_1.gif", 	'filePath' : "images/"}											//landmark 19
				];
