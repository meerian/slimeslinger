import { app, getScore, resetGame, restart, setHighscore, textStyle } from "../main.js";

const gameoverContainer = new PIXI.Container();

export function gameoverHandler() {
    let score = getScore();
    resetGame();
    setHighscore(score);
    createPage(score);
    app.stage.addChild(gameoverContainer);
}

function createPage(score) {

    //Generate GAME OVER
    let gameoverText = new PIXI.Text("GAME OVER", textStyle);
    gameoverText.anchor.set(0.5);
    gameoverText.x = app.renderer.height / 2;
    gameoverText.y = app.renderer.width / 3;
    gameoverContainer.addChild(gameoverText);

    //Generate score text
    let scoreText = new PIXI.Text("Your Score is: " + score, textStyle);
    scoreText.anchor.set(0.5);
    scoreText.x = app.renderer.height / 2;
    scoreText.y = 2 * app.renderer.width / 3;
    gameoverContainer.addChild(scoreText);

    let restartY = 2 * app.renderer.width / 3 + 50;
    //Generate restart button
    let button = new PIXI.Graphics();
    button.lineStyle(2, 0x235823, 1);
    button.beginFill(0xFCFBE4);
    button.drawRect(app.renderer.height / 2 - 100, restartY - 25, 200, 50);
    button.endFill();
    button.interactive = true;
    button.click = function(){  restartGame();  };
    gameoverContainer.addChild(button);

    let restartText = new PIXI.Text("Restart", textStyle);
    restartText.anchor.set(0.5);
    restartText.x = app.renderer.height / 2;
    restartText.y = restartY;
    gameoverContainer.addChild(restartText);
}

function restartGame() {
    cleanup();
    restart();
}

function cleanup() {
    while (gameoverContainer.children[0]) {
        gameoverContainer.removeChild(gameoverContainer.children[0]);
    }
    app.stage.removeChild(gameoverContainer);
}