import { currentDirection } from "./eventListeners.js";
import { canvasLocation } from "./main.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

class user {
    constructor() {
        this.radius = 5;
        this.direction = "down";
        this.x = 250;
        this.y = 250;
        this.speed = 2;
        console.log(this.x + ' and ' + this.y);
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
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
    }

    hitBorderX() { return this.x + this.radius > canvas.width || this.x - this.radius < 0; }
    hitBorderY() { return this.y + this.radius > canvas.height || this.y - this.radius < 0; }
    getLocation() {
        var curLocation = [this.x, this.y];
        return curLocation;
    }
}

var defaultUser = new user();

function userLocationUpdate() {
    canvasLocation[defaultUser.x][defaultUser.y] = 0;
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
    canvasLocation[defaultUser.x][defaultUser.y] = defaultUser;
}

export { defaultUser, userLocationUpdate };