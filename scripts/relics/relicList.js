export class piercingBullet extends relic {
    constructor(container) {
        super("Piercing Bullets","Bullets can pierce through 1 more enemy", relicTexture.pbullet, container);
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
        super("Sharpner","Bullets travel faster", relicTexture.sharpener, container);
    }

    add() {
        bulletVal.speed += 0.5;
        relicTracker.push(this);
    }

    remove() {
        bulletVal.speed = 0.75;
    }
}
