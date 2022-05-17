//Main application
const app = new PIXI.Application({
    view: document.getElementById("myCanvas"),
    backgroundColor: 0xFFFFFF
});
app.renderer.resize(1000, 1000);

//Main textstyle for the game
const textStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 16,
    fill: "0x235823",
    dropShadow: true,
    dropShadowAlpha: 0.1
});

const drawText = (text, x, y, container) => {
    text.x = x;
    text.y = y;
    container.addChild(text);
 };

//Blur filter
const blurFilter = new PIXI.filters.BlurFilter();

// -------------------------------------------------------------------------------

//user class initial values
const userVal = {
    startX: 500,
    startY: 500,
    speed: 1,
    radius: 5,
    textureNormal: PIXI.Texture.from('images/user.png'),
    textureHurt: PIXI.Texture.from('images/user_hurt.png'),
    lives: 3,
};

//enemy class initial values
const enemyVal = {
    speed: 0.25,
    width: 10,
    height: 10,
    textureRedEnemy: PIXI.Texture.from('images/red_enemy.png'),
};

//bullet class initial values
const bulletVal = {
    speed: 0.75,
    width: 2,
    height: 2,
    texture: PIXI.Texture.from('images/bullet.png'),
};

//exp class initial values
const expVal = {
    speed: 1.25,
    radius: 2,
    texture: PIXI.Texture.from('images/exp.png'),
};

// -------------------------------------------------------------------------------

//Common classes
class gameObject {
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

    draw(container) {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        container.addChild(this.sprite);
    }

    updateLocation() {
        throw new Error("method updateLocation() not implemented.");
    }
}

class page {
    constructor(container) {
        this.container = container;
    }

    init() {
        this.createPage();
        this.stage();
    }

    createPage() {
        throw new Error("method createPage() not implemented.");
    }

    stage() {
        app.stage.addChild(this.container);
    }

    cleanup() {
        while (this.container.children[0]) {
            this.container.removeChild(this.container.children[0]);
        }
        app.stage.removeChild(this.container);
    }

}