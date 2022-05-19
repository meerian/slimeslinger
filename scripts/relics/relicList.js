import { addBullet } from "../gameObjects/bullet.js";

export class piercingBullet extends relic {
    constructor(container) {
        super("Piercing Bullets", "Bullets can pierce through 1 more enemy",
            relicTexture.pbullet, container);
    }

    add() {
        bulletVal.lives++;
        relicTracker.push(this);
    }

    remove() {
        bulletVal.lives = 1;
    }
}

export class sharpener extends relic {
    constructor(container) {
        super("Sharpner", "Bullets travel faster", relicTexture.sharpener, container);
    }

    add() {
        bulletVal.speed += 0.5;
        relicTracker.push(this);
    }

    remove() {
        bulletVal.speed = 0.75;
    }
}

export class mshiftGun extends relic {
    constructor(container) {
        super("Makeshift Gun", "Fires additional bullet at a random direction", relicTexture.mshiftgun, container);
    }

    add() {
        function bulletAutofire() {
            let direction = "";
            let check = Math.floor(Math.random() * 8 + 1);
            switch (check) {
                case 1:
                    direction = "up";
                    break;
                case 2:
                    direction = "up right";
                    break;
                case 3:
                    direction = "up left";
                    break;
                case 4:
                    direction = "down";
                    break;
                case 5:
                    direction = "down right";
                    break;
                case 6:
                    direction = "down left";
                    break;
                case 7:
                    direction = "left";
                    break;
                case 8:
                    direction = "right";
                    break;
            }
            addBullet(player.x, player.y, direction);
            timeouts.push(setTimeout(bulletAutofire, 1000));
        }
        bulletAutofire();
        relicTracker.push(this);
    }

    remove() {

    }
}

export class blinkDust extends relic {
    constructor(container) {
        super("Blink Dust", "Longer invulnerability time after taking damage", relicTexture.bdust, container);
    }

    add() {
        userVal.invulTime += 500;
        relicTracker.push(this);
    }

    remove() {
        userVal.invulTime = 1000;
    }
}

export class invisiDust extends relic {
    constructor(container) {
        super("Invisibility Dust", "Turn invulnerable once in awhile", relicTexture.idust, container);
        this.interval = 0;
    }

    add() {
        function invulnerable() {
            player.lastHit = new Date();
            toggleInvisidust = setInterval(toggleSprite, 200);
            setTimeout(reset, 1500);
            timeouts.push(setTimeout(invulnerable, 10000));
        }

        function reset() {
            clearInterval(toggleInvisidust);
            if (player.sprite.texture == userVal.textureHurt) {
                player.sprite.texture = userVal.textureNormal;
            }
        }

        invulnerable();
        relicTracker.push(this);
    }

    remove() {

    }
}