import { currentDirection } from "../eventListeners.js";
import { endGame } from "../main.js";
import { object } from "./object.js";

var canvas = document.getElementById("myCanvas");
var expProgress = document.getElementById("expProgress");
var expLabel = document.getElementById("expLabel");

class user extends object {
    constructor() {
        super(250, 250, 2, new PIXI.Sprite(textureNormal));
        this.radius = 5;
        this.direction = "down";
        this.lives = 3;
        this.lastHit = new Date();
        this.exp = 0;
        this.level = 0;
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
                this.x = canvas.width - this.radius;
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
                this.y = canvas.height - this.radius;
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
        if (this.lives == 1) {
            endGame();
        }
        this.lives--;
        this.lastHit = newHit;
        toggleInterval = setInterval(toggleSprite, 200);
        setTimeout(resetHurt, 1000)
    }

    hitBorderX() { return this.x + this.radius > canvas.width || this.x - this.radius < 0; }
    hitBorderY() { return this.y + this.radius > canvas.height || this.y - this.radius < 0; }

    getLocation() {
        var curLocation = [this.x, this.y];
        return curLocation;
    }

    levelUp() {
        this.level += this.level;
    }

    gainExperience() {
        this.exp += 10;
        if (this.exp == 100) {
            this.levelUp();
            this.exp = 0;
        }
        expProgress.style.width = this.exp + "%";
        expLabel.textContent = this.exp + "%";
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

export { defaultUser, userLocationUpdate, drawUser, createUser };