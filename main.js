import { getBullet, bulletsLength, addBullet, bulletLocationUpdate } from "./bullet.js";
import { addEnemy, enemiesLength, enemyLocationUpate, getEnemy, spawnLocation } from "./enemy.js";
import { defaultUserCreator,userLocationUpdate } from "./user.js";

var defaultUser = defaultUserCreator();
var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var spawnRadius = 50;
var score = 0;
var lives = 3;
var count = 0;

resetState();

function resetState() {
}

function drawUser() {
    ctx.beginPath();
    ctx.arc(defaultUser.x, defaultUser.y, defaultUser.radius, 0, Math.PI * 2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBullet() {
    for (var i = 0; i < bulletsLength(); i++) {
        ctx.beginPath();
        ctx.rect(getBullet(i).x, getBullet(i).y, 2, 2);
        ctx.fillStyle = "#00dd29";
        ctx.fill();
        ctx.closePath();
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

function drawEnemy() {
    for (var i = 0; i < enemiesLength(); i++) {
        ctx.beginPath();
        ctx.rect(getEnemy(i).x, getEnemy(i).y, 10, 10);
        ctx.fillStyle = "#dd2100";
        ctx.fill();
        ctx.closePath();
    }
}

function drawValue() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("enemies: " + "and", 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears canvas
    drawUser(); //draw new user location
    drawBullet(); //draw new bullet locations
    drawSpawn();
    drawEnemy();
    drawValue();
    userLocationUpdate(defaultUser); //updates user location based on keystrokes
    bulletLocationUpdate(); //upates bullet location to next frame
    enemyLocationUpate();


    requestAnimationFrame(draw);
}

enemySpawnLocation();
bulletAutofire();
draw();
