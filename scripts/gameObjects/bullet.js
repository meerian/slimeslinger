import { bulletCollide } from "../handlers/collisionHandler.js";

// -------------------------------------------------------------------------------

class bullet extends gameObject {
    constructor(userX, userY, direction) {
        super(userX, userY, bulletVal.speed, new PIXI.Sprite.from(bulletVal.texture), bulletVal.lives);
        switch (direction) {
            case "left":
                this.dx = -1 * bulletVal.speed;
                this.dy = 0;
                break;
            case "right":
                this.dx = bulletVal.speed;
                this.dy = 0;
                break;
            case "up":
                this.dx = 0;
                this.dy = -1 * bulletVal.speed;
                break;
            case "down":
                this.dx = 0;
                this.dy = bulletVal.speed;
                break;
            case "up left":
                this.dx = -1 * bulletVal.speed;
                this.dy = -1 * bulletVal.speed;
                break;
            case "up right":
                this.dx = bulletVal.speed;
                this.dy = -1 * bulletVal.speed;
                break;
            case "down left":
                this.dx = -1 * bulletVal.speed;
                this.dy = bulletVal.speed;
                break;
            case "down right":
                this.dx = bulletVal.speed;
                this.dy = bulletVal.speed;
                break;
        }
        if (relicDict.guninverter) {
            this.dx = -this.dx;
            this.dy = -this.dy;
        }

        this.x = userX + this.dx;
        this.y = userY + this.dy;
        this.width = bulletVal.width;
        this.height = bulletVal.height;
    }

    updateLocation() {
        this.x += this.dx;
        this.y += this.dy;
        if (this.bulletCheck()) {
            bulletCollide(this);
        }
    }

    bulletCheck() {
        return this.lives > 0 && !(this.x >= app.renderer.width || this.x <= 0 || this.y >= app.renderer.width || this.y <= 0);
    }
}

// -------------------------------------------------------------------------------

//Variables
var bullets = [];

// -------------------------------------------------------------------------------

//Public methods
export function addBullet(userX, userY, direction) {
    bullets.push(new bullet(userX, userY, direction));
}

export function bulletLocationUpdate() {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].updateLocation();
    }
    bullets = bullets.filter(curBullet => curBullet.bulletCheck());
}

export function drawBullets(container) {
    for (let i = 0; i < bullets.length; i++) {
        bullets[i].draw(container);
    }
}

export function emptyBullets() {
    bullets = [];
}
