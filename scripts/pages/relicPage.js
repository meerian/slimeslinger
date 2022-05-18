import { pauseGame, resumeGame } from "../handlers/gameplayHandler.js";
import { relic } from "../relics/relic.js";

// -------------------------------------------------------------------------------

class relicPage extends page {
    constructor() {
        super(relicContainer);
        this.relics = [];
    }

    init() {
        curPage.chooseRelics();
        curPage.createPage();
        curPage.stage();
    }

    //Randomly chooses 3 upgrades
    chooseRelics() {
        let counter = 3;
        let str = "";

        while (counter > 0) {
            let check = Math.floor(Math.random() * 3 + 1);
            switch (check) {
                case 1:
                    str = "RELIC 1";
                    break;
                case 2:
                    str = "RELIC 2";
                    break;
                case 3:
                    str = "RELIC 3"
                    break;
            }
            if (this.relicCheck(str)) {
                this.relics.push(str);
                counter--;
            }
        }
    }

    //Checks if upgrade chosen is valid
    relicCheck(str) {
        return this.relics.includes(str) == false && str != "";
    }

    createPage() {
        let x = app.renderer.height / 2;
        let y = app.renderer.width / 3;
        while (this.relics[0]) {
            let cur = this.relics.pop();
            let curRec = new relic(this.container);
            console.log(curRec);

            //Create relicBox
            let box = new PIXI.Sprite(new PIXI.Texture.from('images/relic_textbox.png'));
            box.x = x;
            box.y = y;
            box.anchor.set(0.5);
            box.interactive = true;
            box.click = function () { parseRelic(cur); }
            box.on("mouseover", function (event) {
                curRec.showDescription();
            });

            box.on("mouseout", function (event) {
                curRec.hideDescription();
            });
            this.container.addChild(box);

            //Create relic image
            curRec.drawRelic(x, y);

            //Creates the text
            let upgradeText = new PIXI.Text("", textStyle);
            upgradeText.anchor.set(0.5);
            switch (cur) {
                case "RELIC 1":
                    drawText(new PIXI.Text("relic 1 name", textStyle), x + 22, y, this.container);
                    break;
                case "RELIC 2":
                    drawText(new PIXI.Text("relic 2 name", textStyle), x + 22, y, this.container);
                    break;
                case "RELIC 3":
                    drawText(new PIXI.Text("relic 3 name", textStyle), x + 22, y, this.container);
                    break;
            }
            y = y + app.renderer.width / 6;
        }

        //Create relicDescBox
        let descBox = new PIXI.Graphics();
        descBox.lineStyle(2, 0x235823, 1);
        descBox.beginFill(0xFCFBE4);
        descBox.drawRect(x - 100, y - 50, 200, 100);
        descBox.endFill();
        this.container.addChild(descBox);
    }
}

// -------------------------------------------------------------------------------

//Variables
const relicContainer = new PIXI.Container();
var curPage = 0;

// -------------------------------------------------------------------------------

export function relicHandler() {
    pauseGame();
    curPage = new relicPage();
    curPage.init();
}

//Parse upgrade and apply based on choice selected
function parseRelic(str) {
    switch (str) {
        case "RELIC 1":
            console.log("Chose relic 1");
            break;
        case "RELIC 2":
            console.log("Chose relic 2");
            break;
        case "RELIC 3":
            console.log("Chose relic 3");
            break;
    }
    curPage.cleanup();
    resumeGame();
}
