import { currentDirection } from "./eventListeners.js";
import { app, endGame } from "./main.js";

var canvas = document.getElementById("myCanvas");
var expProgress = document.getElementById("expProgress");

class user {
    constructor() {
        this.radius = 5;
        this.direction = "down";
        this.x = 250;
        this.y = 250;
        this.speed = 2;
        this.lives = 3;
        this.lastHit = new Date();
        this.exp = 0;
        this.level = 0;
        this.sprite = new PIXI.Sprite(textureNormal);
        this.sprite.anchor.set(0.5);
    }

    get direction() { return this._direction; }
    set direction(newDirection) { this._direction = newDirection; }
    get x() { return this._x; }
    set x(newX) { this._x = newX; }
    get y() { return this._y; }
    set y(newY) { this._y = newY; }
    get speed() { return this._speed; }
    set speed(newSpeed) { this._speed = newSpeed; }

    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        app.stage.addChild(this.sprite);
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
        expProgress.textContent = this.exp + "%";
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
    if (currentDirection.rightPressed) {
        defaultUser.x += defaultUser.speed;
        if (currentDirection.upPressed) {
            defaultUser.direction = "up right";
        } else if (currentDirection.downPressed) {
            defaultUser.direction = "down right";
        } else {
            defaultUser.direction = "right";
        }
        if (defaultUser.hitBorderX()) {
            defaultUser.x = canvas.width - defaultUser.radius;
        }
    }
    if (currentDirection.leftPressed) {
        defaultUser.x -= defaultUser.speed;
        if (currentDirection.upPressed) {
            defaultUser.direction = "up left";
        } else if (currentDirection.downPressed) {
            defaultUser.direction = "down left";
        } else {
            defaultUser.direction = "left";
        }
        if (defaultUser.hitBorderX()) {
            defaultUser.x = defaultUser.radius;
        }
    }

    if (currentDirection.downPressed) {
        defaultUser.y += defaultUser.speed;
        if (currentDirection.rightPressed) {
            defaultUser.direction = "down right";
        } else if (currentDirection.leftPressed) {
            defaultUser.direction = "down left";
        } else {
            defaultUser.direction = "down";
        }
        if (defaultUser.hitBorderY()) {
            defaultUser.y = canvas.height - defaultUser.radius;
        }
    }

    if (currentDirection.upPressed) {
        defaultUser.y -= defaultUser.speed;
        if (currentDirection.rightPressed) {
            defaultUser.direction = "up right";
        } else if (currentDirection.leftPressed) {
            defaultUser.direction = "up left";
        } else {
            defaultUser.direction = "up";
        }
        if (defaultUser.hitBorderY()) {
            defaultUser.y = defaultUser.radius;
        }
    }
}

function drawUser() {
    defaultUser.draw();
}

export { defaultUser, userLocationUpdate, drawUser, createUser };