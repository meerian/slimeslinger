//Main application
const app = new PIXI.Application({
    view: document.getElementById("myCanvas"),
    backgroundColor: 0xB9D980
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

const textStyleTitle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 30,
    fontWeight: "bold",
    fill: "0x235823",
    dropShadow: true,
    dropShadowAlpha: 0.1
});

//Default method to draw text with or without anchor
const drawText = (text, x, y, container, isAnchored = false) => {
    text.x = x;
    text.y = y;
    if (isAnchored) { text.anchor.set(0.5); }
    container.addChild(text);
 };

 const drawButton = (x, y, func, container, isAnchored = false) => {
    let button = new PIXI.Sprite(new PIXI.Texture.from('images/button.png'));
    button.x = x;
    button.y = y;
    if (isAnchored) { button.anchor.set(0.5); }
    button.interactive = true;
    button.click = function () {  func(); }
    container.addChild(button);
 }

 //Logo texture
const logoTexture = PIXI.Texture.from('images/logo.png');

//Blur filter
const blurFilter = new PIXI.filters.BlurFilter();

// -------------------------------------------------------------------------------

//user class initial values
const userVal = {
    startX: 500,
    startY: 500,
    speed: 1,
    width: 20,
    height: 20,
    textureNormal: PIXI.Texture.from('images/user.png'),
    textureHurt: PIXI.Texture.from('images/user_hurt.png'),
    lives: 3,
    invulTime: 1500,
};

//enemy class initial values
const enemyVal = {
    speed: 0.20,
    width: 15,
    height: 15,
    textureRedEnemy: PIXI.Texture.from('images/red_enemy.png'),
    lives: 1,
};

//bullet class initial values
const bulletVal = {
    speed: 0.75,
    width: 4,
    height: 4,
    texture: PIXI.Texture.from('images/bullet.png'),
    lives: 1,
};

//exp class initial values
const expVal = {
    speed: 1.25,
    width: 4,
    height: 4,
    texture: PIXI.Texture.from('images/exp.png'),
    range: 50,
};

//relic class textures
const rssheet = new PIXI.BaseTexture.from("images/relics/spritesheet.png");
const rw = 36;
const rh = 36;

//1st value is width, 2nd value is height
const relicTexture = {
    pbullet: [0, 0],
    sharpener: [1, 0],
    mshiftgun: [2, 0],
    bdust: [3, 0],
    idust: [4, 0],
    guninverter: [5, 0],
    oneup: [6, 0],
    lubricant: [7, 0],
    gunpowder: [8, 0],
    magnet: [9, 0],
};

// -------------------------------------------------------------------------------

//Common classes
class gameObject {
    constructor(x, y, speed, sprite, lives = 1) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.lives = lives;
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

class relic {
    constructor(name, description, pos, container) {
        this.name = name;
        this.description = description;
        this.container = container;
        this.graphic = 0;

        let texture = new PIXI.Texture(rssheet, new PIXI.Rectangle(pos[0] * rw, pos[1] * rh, rw, rh));
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.anchor.set(0.5);

        //Setting up the text
        this.text = new PIXI.Text(description, textStyle);
        this.text.x = app.renderer.height / 2;
        this.text.y = 5 * app.renderer.width / 6;
        this.text.anchor.set(0.5);
    }
    getName() {
        return this.name;
    }

    drawRelic(x, y) {
        this.sprite.x = x - 76;
        this.sprite.y = y;
        this.container.addChild(this.sprite);
    }

    showDescription() {
        this.container.addChild(this.text);
    }

    hideDescription() {
        this.container.removeChild(this.text);
    }

    //called when adding the relic
    add() {
        throw new Error("method add() not implemented.");
    }

    //called when removing the relic at the end of the game
    remove() {
        throw new Error("method remove() not implemented.");
    }
}