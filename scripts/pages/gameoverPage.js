import { app, getScore, resetGame, restart, setHighscore, textStyle } from "../main.js";
import { page } from "./page.js";

const gameoverContainer = new PIXI.Container();
var curPage = 0;

class gameoverPage extends page {
    constructor(score) {
        super(gameoverContainer);
        this.score = score;
    }

    createPage() {
        //Generate GAME OVER
        let gameoverText = new PIXI.Text("GAME OVER", textStyle);
        gameoverText.anchor.set(0.5);
        gameoverText.x = app.renderer.height / 2;
        gameoverText.y = app.renderer.width / 2 - 50;
        this.container.addChild(gameoverText);

        //Generate score text
        let scoreText = new PIXI.Text("Your Score is: " + this.score, textStyle);
        scoreText.anchor.set(0.5);
        scoreText.x = app.renderer.height / 2;
        scoreText.y = app.renderer.width / 2;
        this.container.addChild(scoreText);

        let restartY = app.renderer.width / 2 + 50;
        //Generate restart button
        let button = new PIXI.Graphics();
        button.lineStyle(2, 0x235823, 1);
        button.beginFill(0xFCFBE4);
        button.drawRect(app.renderer.height / 2 - 100, restartY - 25, 200, 50);
        button.endFill();
        button.interactive = true;
        button.click = function () { restartGame(); };
        this.container.addChild(button);

        let restartText = new PIXI.Text("Back to start", textStyle);
        restartText.anchor.set(0.5);
        restartText.x = app.renderer.height / 2;
        restartText.y = restartY;
        this.container.addChild(restartText);
    }
}

export function gameoverHandler() {
    let score = getScore();
    resetGame();
    setHighscore(score);
    curPage = new gameoverPage(score);
    curPage.createPage();
    curPage.stage();
}

function restartGame() {
    curPage.cleanup();
    restart();
}
