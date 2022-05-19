import { resetGame, restart } from "../handlers/gameplayHandler.js";

// -------------------------------------------------------------------------------

class gameoverPage extends page {
    constructor(score) {
        super(gameoverContainer);
        this.score = score;
    }

    createPage() {
        //Generate GAME OVER
        drawTextAnchor(new PIXI.Text("GAME OVER", textStyleTitle), app.renderer.height / 2, app.renderer.width / 2 - 50, gameoverContainer);

        //Generate score text
        drawTextAnchor(new PIXI.Text("Your Score is: " + this.score, textStyle), app.renderer.height / 2, app.renderer.width / 2, gameoverContainer);

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

        drawTextAnchor(new PIXI.Text("Back to start", textStyle), app.renderer.height / 2, restartY, gameoverContainer);
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
