import { enemyCollide } from "./collisionHandler.js";
import { canvasLocation } from "./main.js";
import { defaultUser } from "./user.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var enemies = [];
var spawnLocation = [];

var spawnRadius = 10;

class enemy {
    constructor(x, y) {
        this.width = 10
        this.height = 10
        this.x = x;
        this.y = y;
        this.speed = 0.5;
        this.isAlive = true;
    }

    get x() { return this._x; }
    set x(newX) { this._x = newX; }
    get y() { return this._y; }
    set y(newY) { this._y = newY; }
    get isAlive() { return this._isAlive; }
    set isAlive(newStatus) { this._isAlive = newStatus; }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 10, 10);
        ctx.fillStyle = "#dd2100";
        ctx.fill();
        ctx.closePath();
    }

    updateLocation() {
        var userLocation = defaultUser.getLocation();
        var newX = this.x;
        var newY = this.y;
        canvasLocation[this.x * 2][this.y * 2] = 0;
        if (this.x < userLocation[0]) {
            newX = this.x + this.speed;
        } else if (this.x > userLocation[0]) {
            newX = this.x - this.speed;
        }
        if (this.y < userLocation[1]) {
            newY = this.y + this.speed;
        } else if (this.y > userLocation[1]) {
            newY = this.y - this.speed;
        }

        var cur = canvasLocation[newX * 2][newY * 2];
        if (newX == userLocation[0] && newY == userLocation[1]) {
            enemyCollide();
        } else if (cur == 0) {
            this.x = newX;
            this.y = newY;
        }
        if (enemyCheck(this)){
            canvasLocation[this.x * 2][this.y * 2] = this;
        }
    }
}

function getEnemy(i) {
    return enemies[i];
}

function addEnemy() {
    var ptAngle = Math.random() * 2 * Math.PI;
    var ptRadiusSq = Math.sqrt(Math.random()) * spawnRadius;
    var enemyX = Math.sqrt(ptRadiusSq) * Math.cos(ptAngle);
    var enemyY = Math.sqrt(ptRadiusSq) * Math.sin(ptAngle);
    enemies.push(new enemy(Math.floor(enemyX + spawnLocation[0]), Math.floor(enemyY + spawnLocation[1])));
}

function enemiesLength() {
    return enemies.length;
}

function enemyCheck(enemy) {
    return enemy.isAlive;
}

function enemyLocationUpate() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].updateLocation();
    }
    enemies = enemies.filter(curEnemy => enemyCheck(curEnemy));
}

export { enemy, spawnLocation, getEnemy, enemiesLength, addEnemy, enemyLocationUpate };