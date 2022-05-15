import { gameContainer } from "../main.js";

export class object {
    constructor(x, y, speed, sprite) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.isAlive = true;
        this.sprite = sprite;
        this.sprite.anchor.set(0.5);
    }

    get x() { return this._x; }
    set x(newX) { this._x = newX; }
    get y() { return this._y; }
    set y(newY) { this._y = newY; }
    get speed() { return this._speed; }
    set speed(newSpeed) { this._speed = newSpeed; }
    get isAlive() { return this._isAlive; }
    set isAlive(newStatus) { this._isAlive = newStatus; }

    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        gameContainer.addChild(this.sprite);
    }

    updateLocation() {
        throw new Error("method updateLocation() not implemented.");
    }
}