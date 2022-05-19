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

export function clearRelics() {
    while (relicTracker[0]) {
        let curRec = relicTracker.pop();
        curRec.remove();
    }
}