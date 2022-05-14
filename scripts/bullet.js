import { bulletCollide } from "./collisionHandler.js";
import { app } from "./main.js";

var canvas = document.getElementById("myCanvas");
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
        this.width = 2;
        this.height = 2;
        this.sprite = new PIXI.Sprite.from('images/bullet.png');
        this.sprite.x = this.height;
        this.sprite.y = this.width;
        this.sprite.anchor.set(0.5);
    }
    
    get x() { return this._x; }
    set x(newX) { this._x = newX; }
    get y() { return this._y; }
    set y(newY) { this._y = newY; }
    get isAlive() { return this._isAlive; }
    set isAlive(newStatus) { this._isAlive = newStatus; }

    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        app.stage.addChild(this.sprite);
    }

    updateLocation() {
        this.x += this.dx;
        this.y += this.dy;
        if (bulletCheck(this)) {
            bulletCollide(this);
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
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].updateLocation();
    }
    bullets = bullets.filter(curBullet => bulletCheck(curBullet));
}

function drawBullets() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw();
    }
}

export { getBullet, bulletsLength, addBullet, bulletLocationUpdate, drawBullets };