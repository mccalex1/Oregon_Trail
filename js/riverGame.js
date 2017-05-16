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

var GAME_LENGTH = 1000;
var PLAYER_SIZE = 45;
var ROCK_SIZE = 70;
var DOCK_SIZE = 100;
var PLAYER_ACCELERATION_Y = 0.1;
var PLAYER_ACCELERATION_X = 0.1;
var PLAYER_DRIFT_SPEED = 0;
var PLAYER_MAX_SPEED_Y = 1.5;
var PLAYER_MAX_FORWARD_SPEED = 0.7;
var PLAYER_MAX_BACKWARD_SPEED = 1.5;
var SHORE_SIZE = 25;
var RIVER_SPEED = 2.5;
var CRASH_RECOVER_DISTANCE = 10;
var ROCK_DIST_1 = 120;
var ROCK_DIST_2 = 60;


var playerPiece;
var obstacles = [];
var gamePenalty = 0;
var rockImage = new Image();
rockImage.src = "images/riverGameTemp.png";

function startRiverGame() {
    document.getElementById("riverGameIntro").setAttribute("style", "display: none");
    gameArea.start();
    playerPiece = new component("player", gameArea.canvas.width/4, gameArea.canvas.height/2);
    background = new component("background", 0, 0);
    gameArea.play();
}

function finishRiverGame(passed) {
    window.clearInterval(gameArea.interval);
    document.getElementById("riverGameDone").setAttribute("style", "display: block");
    document.getElementById("riverGamePenalty").innerHTML = "Penalty: " + gamePenalty;
    if (passed == true) {
        document.getElementById("riverGameDone").innerHTML = "You made it!";
    }
    else {
        document.getElementById("riverGameDone").innerHTML = "You died!";
    }
}


var gameArea = {
    canvas : document.getElementById("riverGameCanvas"),
    start : function() {
        this.canvas = document.getElementById("riverGameCanvas");
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        this.frameNum = 0;
    },
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
    clear : function() {
        this.context.clearRect(0,0,this.canvas.width, this.canvas.height);
    }
};



function component(type, x, y) {
    ctx = gameArea.context;
    this.type = type;
    this.x = x;
    this.y = y;
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

    this.draw = function () {
        ctx = gameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        if (this.type == "background") {
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
        }
    };

    this.update = function () {
        this.x += this.speedX;
        if (this.type == "player") {
            this.y += this.speedY;
            this.y = Math.min(Math.max(this.y, SHORE_SIZE), gameArea.canvas.height - this.height - SHORE_SIZE);

            if (this.recoveredShore == false &&
                (this.y > SHORE_SIZE + CRASH_RECOVER_DISTANCE) &&
                (this.y < gameArea.canvas.height - this.height - SHORE_SIZE - CRASH_RECOVER_DISTANCE)) {
                this.recoveredShore = true;
            }

            else if (((this.y <= SHORE_SIZE+1) || (this.y >= gameArea.canvas.height - this.height - SHORE_SIZE - 1)) &&
                     this.recoveredShore == true) {
                    gamePenalty += 0.25;
                    this.recoveredShore = false;
            }

            this.x = Math.min(Math.max(this.x, 0), gameArea.canvas.width/2 - this.width);
        }
        else if (this.type == "background") {
            if (this.x <= -this.width) {
                this.x = 0;
            }
        }
    };

    this.crashTest = function (rock) {
        playerTop = this.y;
        playerRight = this.x + this.width;
        playerBottom = this.y + this.height;
        playerLeft = this.x;
        rockTop = rock.y;
        rockRight = rock.x + rock.width;
        rockBottom = rock.y + rock.height;
        rockLeft = rock.x;

        if (rock.collided == true) {
            if (this.collision == "bottom" && (
                    (playerTop > rockBottom + CRASH_RECOVER_DISTANCE ||
                    playerRight < rockLeft - CRASH_RECOVER_DISTANCE ||
                    playerLeft > rockRight + CRASH_RECOVER_DISTANCE))) {
                this.recovered = true;
                this.collision = "";
                rock.collided = false;
                this.curMaxUp = PLAYER_MAX_SPEED_Y;
            }
            else if (this.collision == "top" && (
                    (playerBottom < rockTop - CRASH_RECOVER_DISTANCE ||
                    playerRight < rockLeft - CRASH_RECOVER_DISTANCE ||
                    playerLeft > rockRight + CRASH_RECOVER_DISTANCE))) {
                this.recovered = true;
                this.collision = "";
                rock.collided = false;
                this.curMaxDown = PLAYER_MAX_SPEED_Y;
            }
            else if (this.collision == "right" && (
                    (playerTop > rockBottom + CRASH_RECOVER_DISTANCE ||
                    playerBottom < rockTop - CRASH_RECOVER_DISTANCE ||
                    playerLeft > rockRight + CRASH_RECOVER_DISTANCE))) {
                this.recovered = true;
                this.collision = "";
                rock.collided = false;
                this.curMaxLeft = PLAYER_MAX_BACKWARD_SPEED;
            }
            else if (this.collision == "left" && (
                    (playerTop > rockBottom + CRASH_RECOVER_DISTANCE ||
                    playerRight < rockLeft - CRASH_RECOVER_DISTANCE ||
                    playerBottom < rockTop - CRASH_RECOVER_DISTANCE))) {
                this.recovered = true;
                this.collision = "";
                rock.collided = false;
                this.curMaxRight = PLAYER_MAX_FORWARD_SPEED;
            }
            else if (this.collision == "left" && this.x <= 0) {
                this.dead = true;
            }
        }

        else {
            if (playerLeft < rockRight && playerRight > rockRight &&
                ((playerTop > rockBottom && playerTop < rockTop) ||
                (playerBottom < rockBottom && playerBottom> rockTop)))  {
                this.collision = "right";
                this.recovered = false;
                this.speedX = -RIVER_SPEED;
                this.curMaxLeft = -RIVER_SPEED;
                rock.collided = true;
                this.x = rockRight;
            }
            else if (playerBottom > rockTop && playerTop < rockTop &&
                ( (playerRight > rockLeft && playerRight < rockRight) ||
                (playerLeft > rockLeft && playerLeft < rockRight))) {
                this.collision = "top";
                this.recovered = false;
                this.speedY = 0;
                this.curMaxDown = 0;
                rock.collided = true;
                this.y = rockTop - PLAYER_SIZE - 1;
            }
            else if (playerTop < rockBottom && playerBottom > rockBottom &&
                ((playerRight > rockLeft && playerRight < rockRight) ||
                (playerLeft > rockLeft && playerLeft < rockRight)))  {
                this.collision = "bottom";
                this.recovered = false;
                this.speedY = 0;
                this.curMaxUp = 0;
                rock.collided = true;
                this.y = rockBottom + 1;
            }
            else if (playerRight > rockLeft && playerLeft < rockLeft &&
                ((playerTop > rockBottom && playerTop < rockTop) ||
                (playerBottom < rockBottom && playerBottom > rockTop)))  {
                this.collision = "left";
                this.recovered = false;
                this.speedX = -RIVER_SPEED;
                this.curMaxRight = -RIVER_SPEED;
                rock.collided = true;
                this.x = rockLeft - PLAYER_SIZE - 1;
            }
        }
        return rock.collided;
    };

}

function updateGame() {
    for (var i = 0; i < obstacles.length; i++) {
        if (playerPiece.crashTest(obstacles[i])) {
            gamePenalty += 1;
        }
    }

    if (playerPiece.dead == true) {
        finishRiverGame(false);
    }

    else if (gameArea.frameNum == GAME_LENGTH) {
        dock = new component("dock", gameArea.canvas.width, SHORE_SIZE);
    }


    gameArea.clear();
    background.update();
    background.draw();

    //calculate new speed
    var speedX = playerPiece.speedX;
    var speedY = playerPiece.speedY;

    if (gameArea.keys && gameArea.keys[37]) {speedX = Math.max(-playerPiece.curMaxLeft, speedX - PLAYER_ACCELERATION_X); }
    if (gameArea.keys && gameArea.keys[39]) {speedX = Math.min(playerPiece.curMaxRight, speedX + PLAYER_ACCELERATION_X); }
    if (gameArea.keys && gameArea.keys[38]) {speedY = Math.max(-playerPiece.curMaxUp, speedY - PLAYER_ACCELERATION_Y); }
    if (gameArea.keys && gameArea.keys[40]) {speedY = Math.min(playerPiece.curMaxDown, speedY + PLAYER_ACCELERATION_Y); }

    if ((gameArea.keys && gameArea.keys[37] && gameArea.keys[39]) ||
        (gameArea.keys && !gameArea.keys[37] && !gameArea.keys[39])) {
        if (playerPiece.collision == "left") {
            speedX = -RIVER_SPEED;
        }
        else if (speedX > -PLAYER_DRIFT_SPEED) {
            speedX = Math.max(-PLAYER_DRIFT_SPEED, speedX - PLAYER_ACCELERATION_X);
        }
        else if (speedX < -PLAYER_DRIFT_SPEED) {
            speedX = Math.min(-PLAYER_DRIFT_SPEED, speedX + PLAYER_ACCELERATION_X)
        }
    }
    if ((gameArea.keys && gameArea.keys[38] && gameArea.keys[40]) ||
        (gameArea.keys && !gameArea.keys[38] && !gameArea.keys[40])) {
        if (speedY > 0) {
            speedY = Math.max(0, speedY - PLAYER_ACCELERATION_Y);
        }
        else if (speedY < 0) {
            speedY = Math.min(0, speedY + PLAYER_ACCELERATION_Y);
        }
    }

    playerPiece.speedX = speedX;
    playerPiece.speedY = speedY;

    if (gameArea.frameNum > GAME_LENGTH + 130) {
        if (gameArea.frameNum > GAME_LENGTH + 210) {
            background.speedX = Math.min(0, background.speedX + 0.0125);
            dock.speedX = background.speedX;
        }
        dock.update();
        dock.draw();

        for (i = 0; i < obstacles.length; i++) {
            if (obstacles[i].x > -ROCK_SIZE) {
                obstacles[i].speedX = background.speedX;
                obstacles[i].update();
                obstacles[i].draw();
            }
        }
        if (playerPiece.crashTest(dock)) {
            finishRiverGame(true);
        }
    }
    else {
        createRocks();
        for (i = 0; i < obstacles.length; i++) {
            if (obstacles[i].x > -ROCK_SIZE) {
                obstacles[i].update();
                obstacles[i].draw();
            }
        }
    }

    playerPiece.update();
    playerPiece.draw();

    gameArea.frameNum++;
}


function createRocks() {
    var range = gameArea.canvas.height - 2*SHORE_SIZE - ROCK_SIZE;
    if (((gameArea.frameNum < GAME_LENGTH/3) && ((gameArea.frameNum/ROCK_DIST_1) % 1== 0)) ||
        ((gameArea.frameNum >= GAME_LENGTH/3) && (gameArea.frameNum <= GAME_LENGTH) && ((gameArea.frameNum/ROCK_DIST_2) % 1 == 0))) {
        rockPos = Math.floor(Math.random()*range + (SHORE_SIZE + ROCK_SIZE/2));
        obstacles.push(new component("rock", gameArea.canvas.width, rockPos));
    }
}

