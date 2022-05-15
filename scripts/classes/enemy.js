import { enemyCollide } from "../collisionHandler.js";
import { defaultUser } from "./user.js";
import { object } from "./object.js";

var enemies = [];

class enemy extends object {
    constructor(x, y) {
        super(x, y, 0.5, new PIXI.Sprite.from('images/redEnemy.png'));
        this.width = 10
        this.height = 10
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
        if (this.isAlive) {
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
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw();
    }
}

function emptyEnemies() {
    enemies = [];
}

export { enemy, enemies, getEnemy, enemiesLength, addEnemy, enemyLocationUpate, drawEnemies, emptyEnemies };