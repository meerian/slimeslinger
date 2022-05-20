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

//For Desktop
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//For Mobile
document.getElementById("up").addEventListener("touchstart", touchStartUpHandler, false);
document.getElementById("up").addEventListener("touchend", touchEndUpHandler, false);
document.getElementById("down").addEventListener("touchstart", touchStartDownHandler, false);
document.getElementById("down").addEventListener("touchend", touchEndDownHandler, false);
document.getElementById("left").addEventListener("touchstart", touchStartLeftHandler, false);
document.getElementById("left").addEventListener("touchend", touchEndLeftHandler, false);
document.getElementById("right").addEventListener("touchstart", touchStartRightHandler, false);
document.getElementById("right").addEventListener("touchend", touchEndRightHandler, false);

export function resetKeyPressed() {
    currentDirection.upPressed = false;
    currentDirection.leftPressed = false;
    currentDirection.rightPressed = false;
    currentDirection.downPressed = false;
}

function keyDownHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        e.preventDefault();
        currentDirection.rightPressed = true;
    }
    if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
        e.preventDefault();
        currentDirection.leftPressed = true;
    }
    if (e.key == "up" || e.key == "ArrowUp" || e.key == "w") {
        e.preventDefault();
        currentDirection.upPressed = true;
    }
    if (e.key == "down" || e.key == "ArrowDown" || e.key == "s") {
        e.preventDefault();
        currentDirection.downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key == "Right" || e.key == "ArrowRight" || e.key == "d") {
        currentDirection.rightPressed = false;
    }
    if (e.key == "Left" || e.key == "ArrowLeft" || e.key == "a") {
        currentDirection.leftPressed = false;
    }
    if (e.key == "up" || e.key == "ArrowUp" || e.key == "w") {
        currentDirection.upPressed = false;
    }
    if (e.key == "down" || e.key == "ArrowDown" || e.key == "s") {
        currentDirection.downPressed = false;
    }
}

function touchStartUpHandler(e) {
    currentDirection.upPressed = true;
}

function touchEndUpHandler(e) {
    currentDirection.upPressed = false;
}

function touchStartDownHandler(e) {
    currentDirection.downPressed = true;
}

function touchEndDownHandler(e) {
    currentDirection.downPressed = false;
}

function touchStartLeftHandler(e) {
    currentDirection.leftPressed = true;
}

function touchEndLeftHandler(e) {
    currentDirection.leftPressed = false;
}


function touchStartRightHandler(e) {
    currentDirection.rightPressed = true;
}

function touchEndRightHandler(e) {
    currentDirection.rightPressed = false;
}
