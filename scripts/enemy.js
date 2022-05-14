import { enemyCollide } from "./collisionHandler.js";
import { defaultUser } from "./user.js";
import { app } from "./main.js";

var canvas = document.getElementById("myCanvas");
var enemies = [];

class enemy {
    constructor(x, y) {
        this.width = 10
        this.height = 10
        this.x = x;
        this.y = y;
        this.colour = "0xDD2100"
        this.speed = 0.5;
        this.isAlive = true;
        this.graphic = new PIXI.Graphics();
    }

    get x() { return this._x; }
    set x(newX) { this._x = newX; }
    get y() { return this._y; }
    set y(newY) { this._y = newY; }
    get isAlive() { return this._isAlive; }
    set isAlive(newStatus) { this._isAlive = newStatus; }

    draw() {
        this.graphic.clear();
        this.graphic.beginFill(this.colour);
        this.graphic.drawRect(this.x, this.y, this.width, this.height);
        this.graphic.endFill();
        app.stage.addChild(this.graphic);
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