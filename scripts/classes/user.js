import { currentDirection } from "../eventListeners.js";
import { app } from "../main.js";
import { gameoverHandler } from "../pages/gameoverPage.js";
import { levelupHandler } from "../pages/levelupPage.js";
import { gameObject } from "./gameObject.js";

var expProgress = document.getElementById("expProgress");
var expLabel = document.getElementById("expLabel");
var levelLabel = document.getElementById("levelLabel");

class user extends gameObject {
    constructor() {
        super(app.renderer.height / 2, app.renderer.width / 2, 2, new PIXI.Sprite(textureNormal));
        this.radius = 5;
        this.direction = "down";
        this.lives = 3;
        this.lastHit = new Date();
        this.exp = 0;
        this.level = 1;
        this.levelupExp = 5;
        this.firerate = 500;
    }

    updateLocation() {
        if (currentDirection.rightPressed) {
            this.x += this.speed;
            if (currentDirection.upPressed) {
                this.direction = "up right";
            } else if (currentDirection.downPressed) {
                this.direction = "down right";
            } else {
                this.direction = "right";
            }
            if (this.hitBorderX()) {
                this.x = app.renderer.width - this.radius;
            }
        }
        if (currentDirection.leftPressed) {
            this.x -= this.speed;
            if (currentDirection.upPressed) {
                this.direction = "up left";
            } else if (currentDirection.downPressed) {
                this.direction = "down left";
            } else {
                this.direction = "left";
            }
            if (this.hitBorderX()) {
                this.x = this.radius;
            }
        }

        if (currentDirection.downPressed) {
            this.y += this.speed;
            if (currentDirection.rightPressed) {
                this.direction = "down right";
            } else if (currentDirection.leftPressed) {
                this.direction = "down left";
            } else {
                this.direction = "down";
            }
            if (this.hitBorderY()) {
                this.y = app.renderer.height - this.radius;
            }
        }

        if (currentDirection.upPressed) {
            this.y -= this.speed;
            if (currentDirection.rightPressed) {
                this.direction = "up right";
            } else if (currentDirection.leftPressed) {
                this.direction = "up left";
            } else {
                this.direction = "up";
            }
            if (this.hitBorderY()) {
                this.y = this.radius;
            }
        }
    }

    takeDamage() {
        let newHit = new Date();
        if ((newHit - this.lastHit) < 1000) { return; }
        if (this.lives <= 1) {
            gameoverHandler();
            return;
        }
        this.lives--;
        this.lastHit = newHit;
        toggleInterval = setInterval(toggleSprite, 200);
        setTimeout(resetHurt, 1000)
    }

    hitBorderX() { return this.x + this.radius > app.renderer.width || this.x - this.radius < 0; }
    hitBorderY() { return this.y + this.radius > app.renderer.height || this.y - this.radius < 0; }

    getLocation() {
        var curLocation = [this.x, this.y];
        return curLocation;
    }

    gainExperience() {
        this.exp += 1;
        if (this.exp == this.levelupExp) {
            this.level++;
            this.levelupExp = 5 * this.level;
            this.exp = 0;
            levelLabel.textContent = "Level " + this.level;
            levelupHandler();
        }
        expProgress.style.width = (this.exp / this.levelupExp * 100 | 0) + "%";
        expLabel.textContent = (this.exp / this.levelupExp * 100 | 0) + "%";
    }

    addLife() {
        this.lives++;
    }

    addSpeed() {
        this.speed = this.speed * 1.1;
    }

    addFirerate() {
        this.firerate = this.firerate * 0.9;
    }
}

var defaultUser = 0;
var toggleInterval = 0;
var textureNormal = PIXI.Texture.from('images/user.png');
var textureHurt = PIXI.Texture.from('images/user_hurt.png');

function createUser() {
    defaultUser = new user();
}

function resetHurt() {
    clearInterval(toggleInterval);
    if (defaultUser.sprite.texture == textureHurt) {
        defaultUser.sprite.texture = textureNormal;
    }
}

function toggleSprite() {
    if (defaultUser.sprite.texture == textureNormal) {
        defaultUser.sprite.texture = textureHurt;
    } else {
        defaultUser.sprite.texture = textureNormal;
    }

}

function userLocationUpdate() {
    defaultUser.updateLocation();
}

function drawUser() {
    defaultUser.draw();
}

function deleteUser() {
    expProgress.style.width = "0%";
    expLabel.textContent = "0%";
    defaultUser = 0;
}

export { defaultUser, userLocationUpdate, drawUser, createUser, deleteUser };