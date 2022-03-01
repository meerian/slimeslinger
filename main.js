import { addBullet, bulletLocationUpdate } from "./bullet.js";
import { addEnemy, enemiesLength, enemyLocationUpate, spawnLocation } from "./enemy.js";
import { defaultUser,userLocationUpdate } from "./user.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var spawnRadius = 50;
var score = 0;
var lives = 3;
var count = 0;
export var canvasLocation = [];
for (var i = 0; i < canvas.height * 2; i++) {
    canvasLocation[i] = new Array(1000).fill(0);
}

function drawAll() {
    for (var i = 0; i < canvasLocation.length; i++) {
        for (var j = 0; j < canvasLocation[0].length; j++) {
            if (canvasLocation[i][j] != 0) {
                canvasLocation[i][j].draw();
            }
        }
    }
}

function drawSpawn() {
    ctx.beginPath();
    ctx.arc(spawnLocation[0], spawnLocation[1], spawnRadius, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(221, 0, 22, " + (count == 0 ? 0.3: 1 - 0.5 / count) + ")";
    ctx.stroke();
    ctx.closePath();
}

function bulletAutofire() {
    addBullet(defaultUser.x, defaultUser.y, defaultUser.direction);
    setTimeout(bulletAutofire, 500);
}

function enemySpawnLocation() {
    if (!count) {
        var x = Math.random() * (canvas.width - spawnRadius - spawnRadius) + spawnRadius; //formula to find coord in canvas
        var y = Math.random() * (canvas.width - spawnRadius - spawnRadius) + spawnRadius; //formula to find coord in canvas
        spawnLocation[0] = x;
        spawnLocation[1] = y;
        count = 5;
    }
    addEnemy();
    count--;
    setTimeout(enemySpawnLocation, 1000);
}

function drawValue() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("enemies:" + enemiesLength(), 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears canvas
    drawAll(); //updates all locations
    drawSpawn();
    drawValue();
    userLocationUpdate(); //updates user location based on keystrokes
    enemyLocationUpate(); //updates enemy location to next frame
    bulletLocationUpdate(); //updates bullet location to next frame

    requestAnimationFrame(draw);
}
function start() {
    enemySpawnLocation();
    bulletAutofire();
    draw();
}

start();