export class sharperBullet extends relic {
    constructor(container) {
        super("Sharper Bullets","Bullets can pierce through 1 more enemy", relicTexture.sharperBullet, container);
    }

    add() {
        bulletVal.lives = 2;
        relicTracker.push(this);
    }

    remove() {
        bulletVal.lives = 1;
    }
}

