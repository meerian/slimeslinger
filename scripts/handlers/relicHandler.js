import { piercingBullet, sharpener, mshiftGun, invisiDust, blinkDust } from "../relics/relicList.js";

export function parseRelic(index, container) {
    switch (index) {
        case 1:
            return new piercingBullet(container);
        case 2:
            return new sharpener(container);
        case 3:
            return new mshiftGun(container);
        case 4:
            return new blinkDust(container);
        case 5:
            return new invisiDust(container);
    }
}

export function clearRelics() {
    while (relicTracker[0]) {
        let curRec = relicTracker.pop();
        curRec.remove();
        //toggleInterval = setInterval(toggleSprite, 200);
        //setTimeout(resetHurt, userVal.invulTime);
    }
}