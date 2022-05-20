import { resetGame, restart } from "../handlers/gameplayHandler.js";

// -------------------------------------------------------------------------------

class gameoverPage extends page {
    constructor(score) {
        super(gameoverContainer);
        this.score = score;
    }

    createPage() {
        //Generate GAME OVER
        drawText(new PIXI.Text("GAME OVER", textStyleTitle), app.renderer.height / 2, app.renderer.width / 2 - 50, gameoverContainer, true);

        //Generate score text
        drawText(new PIXI.Text("Your Score is: " + this.score, textStyle), app.renderer.height / 2, app.renderer.width / 2, gameoverContainer, true);

        let restartY = app.renderer.width / 2 + 50;
        //Generate restart button
        drawButton(app.renderer.width / 2, restartY, restartGame, this.container, true);

        drawText(new PIXI.Text("Back to start", textStyle), app.renderer.height / 2, restartY, gameoverContainer, true);
    }
}

// -------------------------------------------------------------------------------

//Variables
const gameoverContainer = new PIXI.Container();
var curPage = 0;

// -------------------------------------------------------------------------------

export function gameoverHandler() {
    setHighscore(score);
    curPage = new gameoverPage(score);
    resetGame();
    curPage.init();
}

function restartGame() {
    curPage.cleanup();
    restart();
}
