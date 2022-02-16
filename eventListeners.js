class keyPressed {
    constructor() {}

    get rightPressed() { return this._rightPressed; }
    set rightPressed(boolean) { this._rightPressed = boolean; }
    get leftPressed() { return this._leftPressed; }
    set leftPressed(boolean) { this._leftPressed = boolean; }
    get upPressed() { return this._upPressed; }
    set upPressed(boolean) { this._upPressed = boolean; }
    get downPressed() { return this._downPressed; }
    set downPressed(boolean) { this._downPressed = boolean; }

}

export var currentDirection = new keyPressed();

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        currentDirection.rightPressed = true;
    }
    if (e.key == "Left" || e.key == "ArrowLeft") {
        currentDirection.leftPressed = true;
    }
    if (e.key == "up" || e.key == "ArrowUp") {
        currentDirection.upPressed = true;
    }
    if (e.key == "down" || e.key == "ArrowDown") {
        currentDirection.downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight") {
        currentDirection.rightPressed = false;
    }
    if (e.key == "Left" || e.key == "ArrowLeft") {
        currentDirection.leftPressed = false;
    }
    if (e.key == "up" || e.key == "ArrowUp") {
        currentDirection.upPressed = false;
    }
    if (e.key == "down" || e.key == "ArrowDown") {
        currentDirection.downPressed = false;
    }
}