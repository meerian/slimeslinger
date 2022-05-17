import { enemyCollide } from "../collisionHandler.js";
import { defaultUser } from "./user.js";

// -------------------------------------------------------------------------------

class enemy extends gameObject {
    constructor(x, y) {
        super(x, y, enemyVal.speed, new PIXI.Sprite.from(enemyVal.textureRedEnemy));
        this.width = enemyVal.width;
        this.height = enemyVal.height;
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
        if (this.enemyCheck()) {
            enemyCollide(this);
        }
    }

    enemyCheck() {
        return this.isAlive;
    }
}

// -------------------------------------------------------------------------------

//Variables
export var enemies = [];

// -------------------------------------------------------------------------------

//Public methods
export function addEnemy(x, y) {
    enemies.push(new enemy(x, y));
}

export function enemyLocationUpate() {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].updateLocation();
    }
    enemies = enemies.filter(curEnemy => curEnemy.enemyCheck());
}

export function drawEnemies(container) {
    for (let i = 0; i < enemies.length; i++) {
        enemies[i].draw(container);
    }
}

export function emptyEnemies() {
    enemies = [];
}
