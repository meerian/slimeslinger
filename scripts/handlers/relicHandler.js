import { piercingBullet, sharpener } from "../relics/relicList.js";

export function parseRelic(index, container) {
    switch (index) {
        case 1:
            return new piercingBullet(container);
        case 2:
            return new sharpener(container);
        case 3:
            return new piercingBullet(container);
    }
}

export function clearRelics() {
    while (relicTracker[0]) {
        let curRec = relicTracker.pop();
        curRec.remove();
    }
}