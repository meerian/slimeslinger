import { enemyCollide } from "./collisionHandler.js";
import { canvasLocation } from "./main.js";
import { defaultUser } from "./user.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var enemies = [];

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
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.fillStyle = "#dd2100";
        ctx.fill();
        ctx.closePath();
    }

    //Checks if enemy's new location collides with a pre-existing one.
    checkAround(newX, newY) {
        for (let i = 0; i < enemies.length; i++) {
            let cur = enemies[i];
            if (this != cur && Math.abs(cur._x - newX) < 5 && Math.abs(cur._y - newY) < 5) {
                return false;
            }
        }
        return true;
    }

    updateLocation() {
        let userLocation = defaultUser.getLocation();
        let newX = this.x;
        let newY = this.y;
        canvasLocation[this.x * 2][this.y * 2] = 0;
        if (this.x < userLocation[0]) {
            if (this.checkAround(this.x + this.speed, this.y)) {
                newX = this.x + this.speed;
            }
        } else if (this.x > userLocation[0]) {
            if (this.checkAround(this.x - this.speed, this.y)) {
                newX = this.x - this.speed;
            }
        }
        if (this.y < userLocation[1]) {
            if (this.checkAround(this.x, this.y + this.speed)) {
                newY = this.y + this.speed;
            }
        } else if (this.y > userLocation[1]) {
            if (this.checkAround(this.x, this.y - this.speed)) {
                newY = this.y - this.speed;
            }
        }

        this.x = newX;
        this.y = newY;
        if (this.isAlive){
            enemyCollide(this);
            canvasLocation[this.x * 2][this.y * 2] = this;
        }
    }
}

function getEnemy(i) {
    return enemies[i];
}

function addEnemy(x, y) {
    enemies.push(new enemy(x, y));
}

function enemiesLength() {
    return enemies.length;
}

function enemyCheck(enemy) {
    return enemy.isAlive;
}

function enemyLocationUpate() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].updateLocation();
    }
    enemies = enemies.filter(curEnemy => enemyCheck(curEnemy));
}

function drawEnemies() {
    for(let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

export { enemy, enemies, getEnemy, enemiesLength, addEnemy, enemyLocationUpate, drawEnemies };