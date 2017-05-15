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

var GAME_LENGTH = 100;
var PLAYER_SIZE = 40;
var ROCK_SIZE = 70;
var PLAYER_ACCELERATION_Y = 0.08;
var PLAYER_ACCELERATION_X = 0.05;
var PLAYER_DRIFT_SPEED = 0;
var PLAYER_MAX_SPEED_Y = 1.5;
var PLAYER_MAX_FORWARD_SPEED = 2.2;
var PLAYER_MAX_BACKWARD_SPEED = 1.8;
var SHORE_SIZE = 25;
var RIVER_SPEED = 1.8;
var CRASH_RECOVER_DISTANCE = 10;


var playerPiece;
var obstacles = [];
var gamePenalty = 0;

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
    document.getElementById("riverGamePenalty").innerHTML = gamePenalty;
    document.getElementById("riverGameDone").innerHTML = passed;
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
        this.image = new Image();
        this.image.src = "images/riverGameTemp.png";
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
    else if (this.type == "text") {

    }

    this.draw = function () {
        ctx = gameArea.context;
        if (this.type == "player" || this.type == "rock") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        else if (this.type == "background") {
            ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
        else {
            ctx.fillStyle = "red";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    };

    this.update = function () {
        this.x += this.speedX;
        if (this.type == "player") {
            this.y += this.speedY;
            this.y = Math.min(Math.max(this.y, SHORE_SIZE), gameArea.canvas.height - this.height - SHORE_SIZE);

            if (this.recovered == false &&
                (this.y > SHORE_SIZE + CRASH_RECOVER_DISTANCE) &&
                (this.y < gameArea.canvas.height - this.height - SHORE_SIZE - CRASH_RECOVER_DISTANCE)) {
                this.recovered = true;
            }

            else if (((this.y <= SHORE_SIZE+1) || (this.y >= gameArea.canvas.height - this.height - SHORE_SIZE - 1)) &&
                     this.recovered == true) {
                    gamePenalty += 0.25;
                    this.recovered = false;
            }

            this.x = Math.min(Math.max(this.x, 0), gameArea.canvas.width - this.width);
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

        if (this.recovered == false && rock.collided == true) {
            if (this.collision == "top" && (
                (playerBottom < rockTop - CRASH_RECOVER_DISTANCE ||
                 playerRight < rockLeft - CRASH_RECOVER_DISTANCE ||
                 playerLeft > rockRight + CRASH_RECOVER_DISTANCE))) {
                this.recovered = true;
                this.collision = "";
                rock.collided = false;
                this.curMaxDown = PLAYER_MAX_SPEED_Y;
            }
            else if (this.collision == "bottom" && (
                    (playerTop > rockBottom + CRASH_RECOVER_DISTANCE ||
                    playerRight < rockLeft - CRASH_RECOVER_DISTANCE ||
                    playerLeft > rockRight + CRASH_RECOVER_DISTANCE))) {
                this.recovered = true;
                this.collision = "";
                rock.collided = false;
                this.curMaxUp = PLAYER_MAX_SPEED_Y;
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

        else if (this.recovered == true) {
            if (playerBottom >= rockTop && playerTop < rockTop &&
                ( (playerRight > rockLeft && playerRight < rockRight) ||
                (playerLeft > rockLeft && playerLeft < rockRight))) {
                this.collision = "top";
                this.recovered = false;
                this.speedY = 0;
                this.curMaxDown = 0;
                rock.collided = true;
                this.y = rockTop - PLAYER_SIZE;
                gamePenalty += 1;
            }
            else if (playerTop <= rockBottom && playerBottom > rockBottom &&
                ((playerRight > rockLeft && playerRight < rockRight) ||
                (playerLeft > rockLeft && playerLeft < rockRight)))  {
                this.collision = "bottom";
                this.recovered = false;
                this.speedY = 0;
                this.curMaxUp = 0;
                rock.collided = true;
                this.y = rockBottom;
                gamePenalty += 1;
            }
            else if (playerRight >= rockLeft && playerLeft < rockLeft &&
                ((playerTop > rockBottom && playerTop < rockTop) ||
                (playerBottom < rockBottom && playerBottom > rockTop)))  {
                this.collision = "left";
                this.recovered = false;
                this.speedX = 0;
                this.curMaxRight = 0;
                rock.collided = true;
                this.x = rockLeft - PLAYER_SIZE;
                gamePenalty += 1;
            }
            else if (playerLeft <= rockRight && playerRight > rockRight &&
                ((playerTop > rockBottom && playerTop < rockTop) ||
                (playerBottom < rockBottom && playerBottom> rockTop)))  {
                this.collision = "right";
                this.recovered = false;
                this.speedX = 0;
                this.curMaxLeft = 0;
                rock.collided = true;
                this.x = rockRight;
                gamePenalty += 1;
            }
        }
    };

}

function updateGame() {
    for (var i = 0; i < obstacles.length; i++) {
        playerPiece.crashTest(obstacles[i]);
    }
    if (playerPiece.dead == true) {
        finishRiverGame(true);
    }
    else if (gameArea.frameNum >= GAME_LENGTH) {
        finishRiverGame(false);
    }

    gameArea.clear();
    background.update();
    background.draw();

    //calculate new speed
    var speedX = playerPiece.speedX;
    var speedY = playerPiece.speedY;

    if (gameArea.keys && gameArea.keys[37]) {speedX = Math.max(-playerPiece.curMaxLeft, speedX - PLAYER_ACCELERATION_X); }
    if (gameArea.keys && gameArea.keys[39]) {speedX = Math.min(playerPiece.curMaxRight, speedX + PLAYER_ACCELERATION_X); }
    if (gameArea.keys && gameArea.keys[38]) {speedY = Math.max(-playerPiece.curMaxDown, speedY - PLAYER_ACCELERATION_Y); }
    if (gameArea.keys && gameArea.keys[40]) {speedY = Math.min(playerPiece.curMaxUp, speedY + PLAYER_ACCELERATION_Y); }

    if ((gameArea.keys && gameArea.keys[37] && gameArea.keys[39]) ||
        (gameArea.keys && !gameArea.keys[37] && !gameArea.keys[39])) {
        if (speedX > -PLAYER_DRIFT_SPEED) {
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

    createRocks();
    for (i = 0; i < obstacles.length; i++) {
        if (obstacles[i].x > -ROCK_SIZE) {
            obstacles[i].update();
            obstacles[i].draw();
        }
        else {
        }
    }

    playerPiece.update();
    playerPiece.draw();

    gameArea.frameNum++;
}


function createRocks() {
    var range = gameArea.canvas.height - 2*SHORE_SIZE - ROCK_SIZE;
    if (((gameArea.frameNum < 1200) && ((gameArea.frameNum/200) % 1== 0)) ||
        ((gameArea.frameNum >= 1000) && (gameArea.frameNum <= GAME_LENGTH) && ((gameArea.frameNum/150) % 1 == 0))) {
        rockPos = Math.floor(Math.random()*range + (SHORE_SIZE + ROCK_SIZE/2));
        obstacles.push(new component("rock", gameArea.canvas.width, rockPos));
    }
}
