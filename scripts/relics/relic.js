export class relic {
    constructor(ctx) {
        this.description = "I am relic 1"
        this.ctx = ctx;
        this.graphic = 0;

        this.sprite = new PIXI.Sprite(PIXI.Texture.from('images/relic.png'))
        this.sprite.anchor.set(0.5);

        //Setting up the text
        this.text = new PIXI.Text("I am relic 1", textStyle);
        this.text.x = app.renderer.height / 2;
        this.text.y = 5 * app.renderer.width / 6;
        this.text.anchor.set(0.5);
    }

    drawRelic(x, y) {
        this.sprite.x = x - 76;
        this.sprite.y = y;
        this.ctx.addChild(this.sprite);
    }

    showDescription() {
        this.ctx.addChild(this.text);
    }

    hideDescription() {
        this.ctx.removeChild(this.text);
    }
}
