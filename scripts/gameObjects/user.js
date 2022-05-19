import { currentDirection } from "../eventListeners.js";
import { gameoverHandler } from "../pages/gameoverPage.js";
import { levelupHandler } from "../pages/levelupPage.js";
import { relicHandler } from "../pages/relicPage.js"

// -------------------------------------------------------------------------------

class user extends gameObject {
    constructor() {
        super(userVal.startX, userVal.startY, userVal.speed, new PIXI.Sprite(userVal.textureNormal), userVal.lives);
        this.width = userVal.width;
        this.height = userVal.height;
        this.direction = "down";
        this.lastHit = new Date();
        this.exp = 0;
        this.level = 1;
        this.levelupExp = 5;
        this.firerate = 750;
    }

    updateLocation() {
        if (currentDirection.rightPressed) {
            this.x += this.speed;
            if (currentDirection.upPressed) {
                this.direction = "up right";
            } else if (currentDirection.downPressed) {
                this.direction = "down right";
            } else {
                this.direction = "right";
            }
            if (this.hitBorderX()) {
                this.x = app.renderer.width - this.width / 2;
            }
        }
        if (currentDirection.leftPressed) {
            this.x -= this.speed;
            if (currentDirection.upPressed) {
                this.direction = "up left";
            } else if (currentDirection.downPressed) {
                this.direction = "down left";
            } else {
                this.direction = "left";
            }
            if (this.hitBorderX()) {
                this.x = this.width  / 2;
            }
        }

        if (currentDirection.downPressed) {
            this.y += this.speed;
            if (currentDirection.rightPressed) {
                this.direction = "down right";
            } else if (currentDirection.leftPressed) {
                this.direction = "down left";
            } else {
                this.direction = "down";
            }
            if (this.hitBorderY()) {
                this.y = app.renderer.height - this.height  / 2;
            }
        }

        if (currentDirection.upPressed) {
            this.y -= this.speed;
            if (currentDirection.rightPressed) {
                this.direction = "up right";
            } else if (currentDirection.leftPressed) {
                this.direction = "up left";
            } else {
                this.direction = "up";
            }
            if (this.hitBorderY()) {
                this.y = this.height  / 2;
            }
        }
        this.spriteUpdate();
    }

    spriteUpdate() {
        switch(this.direction) {
            case "up": 
        }
    }

    takeDamage() {
        let newHit = new Date();
        if ((newHit - this.lastHit) < 1000) { return; }
        if (this.lives <= 1) {
            gameoverHandler();
            return;
        }
        this.lives--;
        this.lastHit = newHit;
        toggleInterval = setInterval(toggleSprite, 200);
        setTimeout(resetHurt, 1000)
    }

    hitBorderX() { return this.x + this.width / 2 > app.renderer.width || this.x - this.width / 2 < 0; }
    hitBorderY() { return this.y + this.height / 2 > app.renderer.height || this.y - this.height / 2 < 0; }

    getLocation() {
        var curLocation = [this.x, this.y];
        return curLocation;
    }

    gainExperience() {
        this.exp += 1;
        if (this.exp == this.levelupExp) {
            this.level++;
            this.levelupExp = 5 * this.level;
            this.exp = 0;
            levelLabel.textContent = "Level " + this.level;
            //levelupHandler();
            relicHandler();
        }
        expProgress.style.width = (this.exp / this.levelupExp * 100 | 0) + "%";
        expLabel.textContent = (this.exp / this.levelupExp * 100 | 0) + "%";
    }

    addLife() {
        this.lives++;
    }

    addSpeed() {
        this.speed = this.speed * 1.1;
    }

    addFirerate() {
        this.firerate = this.firerate * 0.9;
    }
}

// -------------------------------------------------------------------------------

//Variables
var expProgress = document.getElementById("expProgress");
var expLabel = document.getElementById("expLabel");
var levelLabel = document.getElementById("levelLabel");

// -------------------------------------------------------------------------------

//Public methods
export function addUser() {
    player = new user();
}

export function userLocationUpdate() {
    player.updateLocation();
}

export function drawUser(container) {
    player.draw(container);
}

export function emptyUser() {
    expProgress.style.width = "0%";
    expLabel.textContent = "0%";
    player = 0;
}
