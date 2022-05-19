import { start } from "../handlers/gameplayHandler.js";

// -------------------------------------------------------------------------------

class startPage extends page {
    constructor(hscore) {
        super(startscreenContainer);
        this.highscore = hscore;
    }

    createPage() {

        //Create logo
        let logo = new PIXI.Sprite(logoTexture);
        logo.x = app.renderer.width / 2;
        logo.y = app.renderer.height / 3;
        logo.anchor.set(0.5);
        this.container.addChild(logo);
    
        //create highscore
        drawText(new PIXI.Text("High Score: " + Highscore, textStyle), 10, 10, startscreenContainer);

        //Create start button
        let button = new PIXI.Graphics();
        button.lineStyle(2, 0x235823, 1);
        button.beginFill(0xFCFBE4);
        button.drawRect(app.renderer.width / 2 - 100, app.renderer.height / 2 - 25, 200, 50);
        button.endFill();
        button.interactive = true;
        button.click = function(){  startGame();  };
        this.container.addChild(button);
    
        //Create start text
        drawTextAnchor(new PIXI.Text("Start!", textStyle), app.renderer.width / 2, app.renderer.height / 2, startscreenContainer);
    }
}

// -------------------------------------------------------------------------------

//Variables
const startscreenContainer = new PIXI.Container();
var curPage = 0;


// -------------------------------------------------------------------------------

export function startHandler(hScore) {
    curPage = new startPage(hScore);
    curPage.init();
}

function startGame() {
    curPage.cleanup();
    start();
}
