import { defaultUser } from "./classes/user.js";
import { app, resumeGame, textStyle } from "./main.js";

var upgrades = [];
var canvas = document.getElementById("myCanvas");
const levelupContainer = new PIXI.Container();

//Builds the level up page
export function levelupHandler() {
    chooseUpgrades();
    app.stage.addChild(levelupContainer);
}

//Randomly chooses 3 upgrades
function chooseUpgrades() {
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
        if (upgradeCheck(str)) {
            upgrades.push(str);
            counter--;
        }
    } 
    generateUpgrades();
}

//Generates text for the container
function generateUpgrades() {
    let x = app.renderer.height / 2;
    let y = app.renderer.width / 3;
    while (upgrades[0]) {
        let cur = upgrades.pop();

        //Creates the button around the text
        let button = new PIXI.Graphics();
        button.lineStyle(2, 0x235823, 1);
        button.beginFill(0xFCFBE4);
        button.drawRect(x - 100, y - 25, 200, 50);
        button.endFill();
        button.interactive = true;
        levelupContainer.addChild(button);
        button.click = function(){		parseUpgrade(cur);	}

        //Creates the text
        let upgradeText = new PIXI.Text("", textStyle);
        upgradeText.anchor.set(0.5);
        switch (cur) {
            case "LIFE":
                upgradeText.text = "gain 1 health";
                upgradeText.x = x;
                upgradeText.y = y;
                levelupContainer.addChild(upgradeText);
                break;
            case "SPEED":
                upgradeText.text = "increase your speed";
                upgradeText.x = x;
                upgradeText.y = y;
                levelupContainer.addChild(upgradeText);
                break;
            case "FIRERATE":
                upgradeText.text = "increase your firerate";
                upgradeText.x = x;
                upgradeText.y = y;
                levelupContainer.addChild(upgradeText);
                break;
        }
        y = y + canvas.width / 6;
    }
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
    cleanup();
}

//Cleans up the container and return to the game
function cleanup() {
    while (levelupContainer.children[0]) {
        levelupContainer.removeChild(levelupContainer.children[0]);
    }
    app.stage.removeChild(levelupContainer);
    resumeGame();
}

function upgradeCheck(str) {
    return upgrades.includes(str) == false && str != "";
}