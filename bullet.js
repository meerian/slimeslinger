import { bulletCollide } from "./collisionHandler.js";
import { canvasLocation } from "./main.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var bullets = [];

class bullet {
    constructor(userX, userY, direction) {
        this.alive = 1;
        var speed = 1;
        switch (direction) {
            case "left":
                this.dx = -1 * speed;
                this.dy = 0;
                break;
            case "right":
                this.dx = speed;
                this.dy = 0;
                break;
            case "up":
                this.dx = 0;
                this.dy = -1 * speed;
                break;
            case "down":
                this.dx = 0;
                this.dy = speed;
                break;
            case "up left":
                this.dx = -1 * speed;
                this.dy = -1 * speed;
                break;
            case "up right":
                this.dx = speed;
                this.dy = -1 * speed;
                break;
            case "down left":
                this.dx = -1 * speed;
                this.dy = speed;
                break;
            case "down right":
                this.dx = speed;
                this.dy = speed;
                break;
        }
        this.x = userX + this.dx;
        this.y = userY + this.dy;
        this.isAlive = true;
        canvasLocation[this.x * 2][this.y * 2] = this;
    }
    
    get x() { return this._x; }
    set x(newX) { this._x = newX; }
    get y() { return this._y; }
    set y(newY) { this._y = newY; }
    get isAlive() { return this._isAlive; }
    set isAlive(newStatus) { this._isAlive = newStatus; }

    draw() {
        ctx.beginPath();
        ctx.rect(this.x, this.y, 2, 2);
        ctx.fillStyle = "#00dd29";
        ctx.fill();
        ctx.closePath();
    }

    updateLocation() {
        canvasLocation[this.x * 2][this.y * 2] = 0;
        this.x += this.dx;
        this.y += this.dy;
        if (bulletCheck(this)) {
            bulletCollide(this);
            canvasLocation[this.x * 2][this.y * 2] = this;
        }
    }
}

function getBullet(i) {
    return bullets[i];
}

function bulletsLength() {
    return bullets.length;
}

function addBullet(userX, userY, direction) {
    bullets.push(new bullet(userX, userY, direction));
}

function bulletCheck(curBullet) {
    return curBullet.isAlive && !(curBullet.x >= canvas.width || curBullet.x <= 0 || curBullet.y >= canvas.width || curBullet.y <= 0);
}

function bulletLocationUpdate() {
    for (var i = 0; i < bullets.length; i++) {
        bullets[i].updateLocation();
    }
    bullets = bullets.filter(curBullet => bulletCheck(curBullet));
}

export { getBullet, bulletsLength, addBullet, bulletLocationUpdate };