import { currentDirection } from "./eventListeners.js";

var canvas = document.getElementById("myCanvas");

class user {
    constructor() {
        this.radius = 5;
        this.direction = "down";
        this.x = 250;
        this.y = 250;
        this.speed = 2;
    }

    get direction() { return this._direction; }
    set direction(newDirection) { this._direction = newDirection; }
    get x() { return this._x; }
    set x(newX) { this._x = newX; }
    get y() { return this._y; }
    set y(newY) { this._y = newY; }
    get speed() { return this._speed; }
    set speed(newSpeed) { this._speed = newSpeed; }

    hitBorderX() { return this.x + this.radius > canvas.width || this.x - this.radius < 0; }
    hitBorderY() { return this.y + this.radius > canvas.height || this.y - this.radius < 0; }
    getLocation() {
        var curLocation = [defaultUser.x, defaultUser.y];
        return curLocation;
    }
}

var defaultUser = new user();

export function defaultUserCreator() {
    return defaultUser;
}

export function userLocationUpdate(user) {
    if (currentDirection.rightPressed) {
        user.x += user.speed;
        if (currentDirection.upPressed) {
            user.direction = "up right";
        } else if (currentDirection.downPressed) {
            user.direction = "down right";
        } else {
            user.direction = "right";
        }
        if (user.hitBorderX()) {
            user.x = canvas.width - user.radius;
        }
    }
    if (currentDirection.leftPressed) {
        user.x -= user.speed;
        if (currentDirection.upPressed) {
            user.direction = "up left";
        } else if (currentDirection.downPressed) {
            user.direction = "down left";
        } else {
            user.direction = "left";
        }
        if (user.hitBorderX()) {
            user.x = user.radius;
        }
    }

    if (currentDirection.downPressed) {
        user.y += user.speed;
        if (currentDirection.rightPressed) {
            user.direction = "down right";
        } else if (currentDirection.leftPressed) {
            user.direction = "down left";
        } else {
            user.direction = "down";
        }
        if (user.hitBorderY()) {
            user.y = canvas.height - user.radius;
        }
    }

    if (currentDirection.upPressed) {
        user.y -= user.speed;
        if (currentDirection.rightPressed) {
            user.direction = "up right";
        } else if (currentDirection.leftPressed) {
            user.direction = "up left";
        } else {
            user.direction = "up";
        }
        if (user.hitBorderY()) {
            user.y = user.radius;
        }
    }
}
