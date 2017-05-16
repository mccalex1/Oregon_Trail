/*******************************************************************************
 *	File: riverGame.js
 *	Date: 5/16/2017
 *	Authors: Alex McCaslin, Brendan Waters, Eric Gottlieb, Taylor Brzuchalski
 *
 *	Email:
 *			mccalex1@umbc.edu
 *			b101@umbc.edu
 *			eric29@umbc.edu
 *			tbrz1@umbc.edu
 *
 *	Description: This file contains the functions for the river traversal mini-game
 *  REFERENCES: https://www.w3schools.com/graphics/
 *
 *******************************************************************************/

//Gameplay configuration variables, placed here for easy access and adjustment
var GAME_LENGTH = 2000;                 //How long the game lasts
var PLAYER_SIZE = 45;                   //size of the player icon in pixels
var ROCK_SIZE = 70;                     //size of rocks in pixels
var DOCK_SIZE = 100;                    //width of the dock in pixels (height is 2*width)
var PLAYER_ACCELERATION_Y = 0.1;        //rate of vertical player acceleration
var PLAYER_ACCELERATION_X = 0.1;        //rate of horizontal player acceleration
var PLAYER_DRIFT_SPEED = 0;             //speed that the player drifts backwards with no horizontal input
var PLAYER_MAX_SPEED_Y = 1.5;           //maximum vertical speed
var PLAYER_MAX_FORWARD_SPEED = 0.7;     //maximum forward speed
var PLAYER_MAX_BACKWARD_SPEED = 1.5;    //maximum backward speed
var SHORE_SIZE = 25;                    //size of the shoreline on the top and bottom of the canvas
var RIVER_SPEED = 2.5;                  //speed of the river/rocks
var CRASH_RECOVER_DISTANCE = 7;         //distance the player must move away from a rock to recover from a crash, in pixels
var ROCK_HITBOX_BUFFER = 5;             //distance inside the border of a rock object that a player must move to crash into it
var GAME_STAGE_RATIO = 3;               //fraction of the game that is easier; e.g. 3 = difficulty increases after first 1/3
var ROCK_DIST_1 = 120;                  //distance between rocks in the first stage of the game
var ROCK_DIST_2 = 60;                   //distance between rocks in the more difficult stage

//game objects
var playerPiece;
var obstacles = [];
var rockImage = new Image();
rockImage.src = "images/riverGameTemp.png";

//penalty counter for crashing
var gamePenalty = 0;

//Begins the game
function startRiverGame() {
    //hide intro overlay
    document.getElementById("riverGameIntro").setAttribute("style", "display: none");
    //setup game and canvas elements
    gameArea.start();
    playerPiece = new component("player", gameArea.canvas.width/4, gameArea.canvas.height/2);
    background = new component("background", 0, 0);
    gameArea.play();
}

//stops the game and displays the results
function finishRiverGame(passed) {
    window.clearInterval(gameArea.interval);
    document.getElementById("riverGameDone").setAttribute("style", "display: block");
    document.getElementById("riverGamePenalty").innerHTML = "Penalty: " + gamePenalty;
    if (passed == true) {
        document.getElementById("riverGamePassed").innerHTML = "You made it!";
        winGame("riverGameDiv");
    }
    else {
        document.getElementById("riverGamePassed").innerHTML = "You died!";
        loseGame("riverGameDiv", "You did not make it down the river.");
    }
}

//game object
var gameArea = {
    canvas : document.getElementById("riverGameCanvas"),
    //sets up canvas
    start : function() {
        this.canvas = document.getElementById("riverGameCanvas");
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        this.frameNum = 0;
    },
    //starts game loop and listens for user input
    play : function() {
        this.interval = setInterval(updateGame, 20);
        window.addEventListener('keydown', function (e) {
            gameArea.keys = (gameArea.keys || []);
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        });
        window.addEventListener('keyup', function (e) {
            gameArea.keys[e.keyCode] = (e.type == "keydown");
        });

    },
    //clears canvas
    clear : function() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    }
};


//game object
function component(type, x, y) {
    ctx = gameArea.context;
    this.type = type;
    this.x = x;
    this.y = y;
    //initialize variables based on component type
    if (type == "player") {
        this.height = PLAYER_SIZE;
        this.width = PLAYER_SIZE;
        this.speedX = -PLAYER_DRIFT_SPEED;
        this.speedY = 0;
        this.image = new Image();
        this.image.src = "images/wagon_for_river_icon.gif";
        this.recoveredShore = true;
        this.recovered = true;
        this.collision = "";
        this.dead = false;
        this.curMaxUp = PLAYER_MAX_SPEED_Y;
        this.curMaxDown = PLAYER_MAX_SPEED_Y;
        this.curMaxLeft = PLAYER_MAX_BACKWARD_SPEED;
        this.curMaxRight = PLAYER_MAX_FORWARD_SPEED;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    else if (type == "background") {
        this.height = gameArea.canvas.height;
        this.width = gameArea.canvas.width;
        this.speedX = -RIVER_SPEED;
        this.speedY = 0;
        this.image = rockImage;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    else if (this.type == "rock") {
        this.height = ROCK_SIZE;
        this.width = ROCK_SIZE;
        this.speedX = -RIVER_SPEED;
        this.speedY = 0;
        this.image = new Image();
        this.image.src = "images/riverGameRockTemp.png";
        this.collided = false;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    }
    else if (this.type == "dock") {
        this.height = 2*DOCK_SIZE;
        this.width = DOCK_SIZE;
        this.speedX = -RIVER_SPEED;
        this.speedY = 0;
        this.image = new Image();
        this.image.src = "images/riverGameDock.png";
        this.collided = false;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

    }

    //draw the compenent on the canvas
    this.draw = function () {
        ctx = gameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        //draw the background twice for looping
        if (this.type == "background") {
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    };

    //update the component's position based on its speed
    this.update = function () {
        this.x += this.speedX;
        if (this.type == "player") {
            this.y += this.speedY;
            this.y = Math.min(Math.max(this.y, SHORE_SIZE), gameArea.canvas.height - this.height - SHORE_SIZE);

            //if the player has carshed into the shore and moved far enough away, they recover
            if (this.recoveredShore == false &&
                (this.y > SHORE_SIZE + CRASH_RECOVER_DISTANCE) &&
                (this.y < gameArea.canvas.height - this.height - SHORE_SIZE - CRASH_RECOVER_DISTANCE)) {
                this.recoveredShore = true;
            }

            //if they hit the shore, they've crashed
            else if (((this.y <= SHORE_SIZE+1) || (this.y >= gameArea.canvas.height - this.height - SHORE_SIZE - 1)) &&
                     this.recoveredShore == true) {
                    gamePenalty += 0.25;
                    this.recoveredShore = false;
            }

            //keep the player on the left half of the canvas
            this.x = Math.min(Math.max(this.x, 0), gameArea.canvas.width/2 - this.width);
        }
        //if the background reaches the end of the canvas, move it back to the other side
        else if (this.type == "background") {
            if (this.x <= -this.width) {
                this.x = 0;
            }
        }
    };

    //check for collisions
    this.crashTest = function (rock) {
        playerTop = this.y;
        playerRight = this.x + this.width;
        playerBottom = this.y + this.height;
        playerLeft = this.x;

        rockTop = rock.y + ROCK_HITBOX_BUFFER;
        rockRight = rock.x + rock.width - ROCK_HITBOX_BUFFER;
        rockBottom = rock.y + rock.height - ROCK_HITBOX_BUFFER;
        rockLeft = rock.x + ROCK_HITBOX_BUFFER;

        //if the player is currently colliding with this obstacle
        if (rock.collided == true) {
            //check which direction, and if they've recovered yet
            if (this.collision == "bottom" && (
                    (playerTop > (rockBottom + CRASH_RECOVER_DISTANCE) ||
                    playerRight < (rockLeft - CRASH_RECOVER_DISTANCE) ||
                    playerLeft > (rockRight + CRASH_RECOVER_DISTANCE)))) {
                console.log("Recovered bottom");
                this.recovered = true;
                this.collision = "";
                rock.collided = false;
                this.curMaxUp = PLAYER_MAX_SPEED_Y;
            }
            else if (this.collision == "top" && (
                    (playerBottom < (rockTop - CRASH_RECOVER_DISTANCE) ||
                    playerRight < (rockLeft - CRASH_RECOVER_DISTANCE) ||
                    playerLeft > (rockRight + CRASH_RECOVER_DISTANCE)))) {
                console.log("Recovered top");
                this.recovered = true;
                this.collision = "";
                rock.collided = false;
                this.curMaxDown = PLAYER_MAX_SPEED_Y;
            }
            else if (this.collision == "right" && (
                    (playerTop > (rockBottom + CRASH_RECOVER_DISTANCE) ||
                    playerBottom < (rockTop - CRASH_RECOVER_DISTANCE) ||
                    playerLeft > (rockRight + CRASH_RECOVER_DISTANCE)))) {
                console.log("Recovered right");
                this.recovered = true;
                this.collision = "";
                rock.collided = false;
                this.curMaxLeft = PLAYER_MAX_BACKWARD_SPEED;
            }
            else if (this.collision == "left" && (
                    (playerTop > (rockBottom + CRASH_RECOVER_DISTANCE) ||
                    playerRight < (rockLeft - CRASH_RECOVER_DISTANCE) ||
                    playerBottom < (rockTop - CRASH_RECOVER_DISTANCE)))) {
                console.log("Recovered left");
                this.recovered = true;
                this.collision = "";
                rock.collided = false;
                this.curMaxRight = PLAYER_MAX_FORWARD_SPEED;
            }
            //if they get pushed off the canvas, they die
            else if (this.collision == "left" && this.x <= 0) {
                this.dead = true;
            }
        }

        //if they aren't colliding with this obstacle
        else {
            //check for collisions in each direction
            if (playerLeft < rockRight && playerRight > rockRight && playerLeft > (rockRight - ROCK_HITBOX_BUFFER) &&
                ((playerTop > rockBottom && playerTop < rockTop) ||
                (playerBottom < rockBottom && playerBottom > rockTop)))  {
                //if they collide, record it and change their speed so they can't move through the obstacle
                this.collision = "right";
                this.recovered = false;
                this.speedX = -RIVER_SPEED;
                this.curMaxLeft = -RIVER_SPEED;
                rock.collided = true;
                //add to the penalty
                gamePenalty += 1;
                //this.x = rockRight;
            }
            else if (playerRight > rockLeft && playerLeft < rockLeft && playerRight < (rockLeft + ROCK_HITBOX_BUFFER) &&
                ((playerTop < rockBottom && playerTop > rockTop) ||
                (playerBottom < rockBottom && playerBottom > rockTop)))  {
                this.collision = "left";
                this.recovered = false;
                this.speedX = -RIVER_SPEED;
                this.curMaxRight = -RIVER_SPEED;
                rock.collided = true;
                gamePenalty += 1;
                //this.x = rockLeft - PLAYER_SIZE - 1;
            }
            else if (playerBottom > rockTop && playerTop < rockTop && playerBottom < (rockTop + ROCK_HITBOX_BUFFER) &&
                ( (playerRight > rockLeft && playerRight < rockRight) ||
                (playerLeft > rockLeft && playerLeft < rockRight))) {
                this.collision = "top";
                this.recovered = false;
                this.speedY = 0;
                this.curMaxDown = 0;
                rock.collided = true;
                gamePenalty += 1;
                //this.y = rockTop - PLAYER_SIZE - 1;
            }
            else if (playerTop < rockBottom && playerBottom > rockBottom && playerTop > (rockBottom - ROCK_HITBOX_BUFFER) &&
                ((playerRight > rockLeft && playerRight < rockRight) ||
                (playerLeft > rockLeft && playerLeft < rockRight)))  {
                this.collision = "bottom";
                this.recovered = false;
                this.speedY = 0;
                this.curMaxUp = 0;
                rock.collided = true;
                gamePenalty += 1;
                //this.y = rockBottom + 1;
            }
        }
        //return whether they are colliding with the current obstacle
        return rock.collided;
    };

}

//main game loop function
function updateGame() {
    //check for rock collisions
    for (var i = 0; i < obstacles.length; i++) {
        playerPiece.crashTest(obstacles[i])
    }

    //if they're dead, return false
    if (playerPiece.dead == true) {
        finishRiverGame(false);
    }

    //if they've reached the end create the dock
    else if (gameArea.frameNum == GAME_LENGTH) {
        dock = new component("dock", gameArea.canvas.width, SHORE_SIZE);
    }

    //clear the canvas and draw the background
    gameArea.clear();
    background.update();
    background.draw();

    //calculate new speed
    var speedX = playerPiece.speedX;
    var speedY = playerPiece.speedY;

    //check for user input and calculate new speed
    if (gameArea.keys && gameArea.keys[37]) {speedX = Math.max(-playerPiece.curMaxLeft, speedX - PLAYER_ACCELERATION_X); }
    if (gameArea.keys && gameArea.keys[39]) {speedX = Math.min(playerPiece.curMaxRight, speedX + PLAYER_ACCELERATION_X); }
    if (gameArea.keys && gameArea.keys[38]) {speedY = Math.max(-playerPiece.curMaxUp, speedY - PLAYER_ACCELERATION_Y); }
    if (gameArea.keys && gameArea.keys[40]) {speedY = Math.min(playerPiece.curMaxDown, speedY + PLAYER_ACCELERATION_Y); }

    //if both or neither left and/nor right are pressed
    if ((gameArea.keys && gameArea.keys[37] && gameArea.keys[39]) ||
        (gameArea.keys && !gameArea.keys[37] && !gameArea.keys[39])) {
        //if they are colliding from the left, set their speed to the river/rock speed
        if (playerPiece.collision == "left") {
            speedX = -RIVER_SPEED;
        }
        //if they are moving faster than the drift speed, gradually decrease it to the drift speed
        else if (speedX > -PLAYER_DRIFT_SPEED) {
            speedX = Math.max(-PLAYER_DRIFT_SPEED, speedX - PLAYER_ACCELERATION_X);
        }
        //if they are moving slower than the drift speed, gradually increase it to the drift speed
        else if (speedX < -PLAYER_DRIFT_SPEED) {
            speedX = Math.min(-PLAYER_DRIFT_SPEED, speedX + PLAYER_ACCELERATION_X)
        }
    }
    //if both or neither up and/nor down are pressed
    if ((gameArea.keys && gameArea.keys[38] && gameArea.keys[40]) ||
        (gameArea.keys && !gameArea.keys[38] && !gameArea.keys[40])) {
        //if the speed is less than or greater than 0, gradually increment it towards 0
        if (speedY > 0) {
            speedY = Math.max(0, speedY - PLAYER_ACCELERATION_Y);
        }
        else if (speedY < 0) {
            speedY = Math.min(0, speedY + PLAYER_ACCELERATION_Y);
        }
    }

    //set the new speeds
    playerPiece.speedX = speedX;
    playerPiece.speedY = speedY;

    //if the game has ended, slow down river movement speed
    if (gameArea.frameNum > GAME_LENGTH + 130) {
        if (gameArea.frameNum > GAME_LENGTH + 210) {
            background.speedX = Math.min(0, background.speedX + 0.0125);
            dock.speedX = background.speedX;
        }
        //update/draw the dock
        dock.update();
        dock.draw();

        //adjust the rock speeds and update/draw them
        for (i = 0; i < obstacles.length; i++) {
            if (obstacles[i].x > -ROCK_SIZE) {
                obstacles[i].speedX = background.speedX;
                obstacles[i].update();
                obstacles[i].draw();
            }
        }
        //end the game when the player docks
        if (playerPiece.crashTest(dock)) {
            finishRiverGame(true);
        }
    }
    //if the game hasn't ended, draw rocks
    else {
        createRocks();
        for (i = 0; i < obstacles.length; i++) {
            if (obstacles[i].x > -ROCK_SIZE) {
                obstacles[i].update();
                obstacles[i].draw();
            }
        }
    }

    //update/draw the player
    playerPiece.update();
    playerPiece.draw();

    //increment the frame counter
    gameArea.frameNum++;
}

//creates rocks at specified intervals
function createRocks() {
    //calculate the area in which the rocks can be placed
    var range = gameArea.canvas.height - 2*SHORE_SIZE - ROCK_SIZE;
    //place a rock depending on game progression and time since the previous rock
    if (((gameArea.frameNum < GAME_LENGTH/GAME_STAGE_RATIO) && ((gameArea.frameNum/ROCK_DIST_1) % 1== 0)) ||
        ((gameArea.frameNum >= GAME_LENGTH/GAME_STAGE_RATIO) && (gameArea.frameNum <= GAME_LENGTH) && ((gameArea.frameNum/ROCK_DIST_2) % 1 == 0))) {
        //pick a random position and add the rock to the list of rocks
        rockPos = Math.floor(Math.random()*range) + SHORE_SIZE;
        obstacles.push(new component("rock", gameArea.canvas.width, rockPos));
    }
}

