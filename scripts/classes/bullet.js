import { bulletCollide } from "../collisionHandler.js";
import { object } from "./object.js";
import { app } from "../main.js";

var bullets = [];

class bullet extends object {
    constructor(userX, userY, direction) {
        let speed = 1;
        super(userX, userY, speed, new PIXI.Sprite.from('images/bullet.png'));
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
        this.width = 2;
        this.height = 2;
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
    return curBullet.isAlive && !(curBullet.x >= app.renderer.width || curBullet.x <= 0 || curBullet.y >= app.renderer.width || curBullet.y <= 0);
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

function emptyBullets() {
    bullets = [];
}

export { getBullet, bulletsLength, addBullet, bulletLocationUpdate, drawBullets, emptyBullets };