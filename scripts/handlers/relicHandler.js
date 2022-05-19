import { sharperBullet } from "../relics/relicList.js";

export function parseRelic(index, container) {
    switch (index) {
        case 1:
            return new sharperBullet(container);
        case 2:
            return new sharperBullet(container);
        case 3:
            return new sharperBullet(container);
    }
}

export function clearRelics() {
    while (relicTracker[0]) {
        let curRec = relicTracker.pop();
        curRec.remove();
    }
}