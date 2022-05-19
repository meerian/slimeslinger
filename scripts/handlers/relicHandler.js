import { piercingBullet, sharpener, mshiftGun, invisiDust, blinkDust, gunInverter, oneUp, lubricant, gunpowder, magnet } from "../relics/relicList.js";

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
        case 6:
            return new gunInverter(container);
        case 7:
            return new oneUp(container);
        case 8:
            return new lubricant(container);
        case 9:
            return new gunpowder(container);
        case 10:
            return new magnet(container);
    }
}

//Checks if a unique relic was chosen when user already has it (for now only gun inverter)
export function uniqueRcheck(index) {
    return index == 6 && relicDict.guninverter;
}


export function clearRelics() {
    while (relicTracker[0]) {
        let curRec = relicTracker.pop();
        curRec.remove();
    }
}