import { defaultUser } from "./classes/user.js";

var upgrades = [];
const gameContainer = new PIXI.Container();

const textStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 16,
    fill: "0x235823"
})

function chooseUpgrades() {
    let counter = 3;
    let str = "";

    //Randomly chooses 3 upgrades
    while (counter > 0) {
        let check = Math.floor(Math.random() * 3 + 1);
        switch (check) {
            case 1:
                str = "LIFE";
                break;
            case 2:
                str = "SPEED";
                break;
            case 3:
                str = "FIRERATE"
                break;
        }
        if (upgradeCheck(str)) {
            upgrades.push(str);
            counter--;
        }
    }

    //TODO:
    //parseUpgrades();
}

function upgradeCheck(str) {
    return upgrades.includes(str) && str != "";
}