import { pauseGame, resumeGame } from "../handlers/gameplayHandler.js";

// -------------------------------------------------------------------------------

class levelupPage extends page {
    constructor() {
        super(levelupContainer);
        this.upgrades = [];
    }

    init() {
        curPage.chooseUpgrades();
        curPage.createPage();
        curPage.stage();
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

        //Level up text
        drawTextAnchor(new PIXI.Text("Choose an upgrade", textStyleTitle), x, y - 100, this.container);

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
            switch (cur) {
                case "LIFE":
                    drawTextAnchor(new PIXI.Text("gain 1 health", textStyle), x, y, levelupContainer);
                    break;
                case "SPEED":
                    drawTextAnchor(new PIXI.Text("increase your speed", textStyle), x, y, levelupContainer);
                    break;
                case "FIRERATE":
                    drawTextAnchor(new PIXI.Text("increase your firerate", textStyle), x, y, levelupContainer);
                    break;
            }
            y = y + app.renderer.width / 6;
        }
    }
}

// -------------------------------------------------------------------------------

//Variables
const levelupContainer = new PIXI.Container();
var curPage = 0;

// -------------------------------------------------------------------------------

export function levelupHandler() {
    pauseGame();
    curPage = new levelupPage();
    curPage.init();
}

//Parse upgrade and apply based on choice selected
function parseUpgrade(str) {
    switch (str) {
        case "LIFE":
            player.addLife();
            break;
        case "SPEED":
            player.addSpeed();
            break;
        case "FIRERATE":
            player.addFirerate();
            break;
    }
    curPage.cleanup();
    resumeGame();
}
