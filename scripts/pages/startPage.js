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
        drawText(new PIXI.Text("High Score: " + Highscore, textStyle), 10, 10, this.container);

        //Create start button
        drawButton(app.renderer.width / 2, app.renderer.height / 2, startGame, this.container, true);
  
    
        //Create start text
        drawText(new PIXI.Text("Start!", textStyle), app.renderer.width / 2, app.renderer.height / 2, this.container, true);

        //Create share description box and text
        let shareContainer = new PIXI.Container();
        let descBox = new PIXI.Graphics();
        descBox.lineStyle(2, 0x235823, 1);
        descBox.beginFill(0xFCFBE4);
        descBox.drawRect(app.renderer.width / 2 + 175, app.renderer.height / 2 + 10, 100, 50);
        descBox.endFill();
        shareContainer.addChild(descBox);
        let text = new PIXI.Text("Share your\nhighscore!", textStyle);
        text.x = app.renderer.width / 2 + 225;
        text.y = app.renderer.height / 2 + 35;
        text.anchor.set(0.5);
        shareContainer.addChild(text);

        //Share button text
        let shareText = "I just got a score of " + Highscore + " in Slime Slinger! Think you can beat my score? Try now at: \nhttps://meerian.vip/slimeslinger"


        //Create share button
        let box = new PIXI.Sprite(new PIXI.Texture.from('images/share_icon.png'));
        box.x = app.renderer.width / 2 + 150;
        box.y = app.renderer.height / 2;
        box.anchor.set(0.5);
        box.interactive = true;
        box.click = function () { text.text = "Copied!"; navigator.clipboard.writeText(shareText); }
        box.on("mouseover", function (event) {
            startscreenContainer.addChild(shareContainer);
        });

        box.on("mouseout", function (event) {
            text.text = "Share your\nhighscore!"
            startscreenContainer.removeChild(shareContainer);
        });
        this.container.addChild(box);
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
