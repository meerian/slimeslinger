import { defaultUser } from "../classes/user.js";
import { app, pauseGame, resumeGame, textStyle } from "../main.js";
import { page } from "./page.js";

const upgrades = [];
const levelupContainer = new PIXI.Container();
var curPage = 0;

class levelupPage extends page {
    constructor() {
        super(levelupContainer);
        this.upgrades = [];
    }

    //Randomly chooses 3 upgrades
    chooseUpgrades() {
        let counter = 3;
        let str = "";

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
            if (this.upgradeCheck(str)) {
                this.upgrades.push(str);
                counter--;
            }
        }
    }

    //Checks if upgrade chosen is valid
    upgradeCheck(str) {
        return this.upgrades.includes(str) == false && str != "";
    }

    createPage() {
        let x = app.renderer.height / 2;
        let y = app.renderer.width / 3;
        while (this.upgrades[0]) {
            let cur = this.upgrades.pop();

            //Creates the button around the text
            let button = new PIXI.Graphics();
            button.lineStyle(2, 0x235823, 1);
            button.beginFill(0xFCFBE4);
            button.drawRect(x - 100, y - 25, 200, 50);
            button.endFill();
            button.interactive = true;
            button.click = function () { parseUpgrade(cur); }
            this.container.addChild(button);

            //Creates the text
            let upgradeText = new PIXI.Text("", textStyle);
            upgradeText.anchor.set(0.5);
            switch (cur) {
                case "LIFE":
                    upgradeText.text = "gain 1 health";
                    upgradeText.x = x;
                    upgradeText.y = y;
                    this.container.addChild(upgradeText);
                    break;
                case "SPEED":
                    upgradeText.text = "increase your speed";
                    upgradeText.x = x;
                    upgradeText.y = y;
                    this.container.addChild(upgradeText);
                    break;
                case "FIRERATE":
                    upgradeText.text = "increase your firerate";
                    upgradeText.x = x;
                    upgradeText.y = y;
                    this.container.addChild(upgradeText);
                    break;
            }
            y = y + app.renderer.width / 6;
        }
    }
}

export function levelupHandler() {
    pauseGame();
    curPage = new levelupPage();
    curPage.chooseUpgrades();
    curPage.createPage();
    curPage.stage();
}

//Parse upgrade and apply based on choice selected
function parseUpgrade(str) {
    switch (str) {
        case "LIFE":
            defaultUser.addLife();
            break;
        case "SPEED":
            defaultUser.addSpeed();
            break;
        case "FIRERATE":
            defaultUser.addFirerate();
            break;
    }
    curPage.cleanup();
    resumeGame();
}
