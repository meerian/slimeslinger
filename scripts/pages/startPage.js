import { start } from "../gameplayHandler.js";

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
        drawText(new PIXI.Text("High Score: " + Highscore, textStyle), 8, 10, startscreenContainer);

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
        let startText = new PIXI.Text("Start!", textStyle);
        startText.anchor.set(0.5);
        startText.x = app.renderer.width / 2;
        startText.y = app.renderer.height / 2;
        this.container.addChild(startText);
    }
}

// -------------------------------------------------------------------------------

//Variables
const startscreenContainer = new PIXI.Container();
const logoTexture = PIXI.Texture.from('images/game_logo.png');
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
