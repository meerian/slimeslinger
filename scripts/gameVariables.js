//Main ticker for the game
var ticker = new PIXI.Ticker();

function resetTicker() {
    ticker.destroy();
    ticker = new PIXI.Ticker();
}

// -------------------------------------------------------------------------------

//Current score of game
var score = 0;
var scoreTimeout = 0;

function startScore() {
    if (!pause) {
        score = score + 1;
    }
    scoreTimeout = setTimeout(startScore, 1000);
}

function updateScore(x) {
    score += x;
}

// -------------------------------------------------------------------------------

//Current highscore of game
var Highscore = 0;

function setHighscore(hScore) {
    if (hScore > Highscore) {
        Highscore = hScore;
    }
}

// -------------------------------------------------------------------------------

//Pause button and functions
var pauseButton = document.getElementById("Pause");
var pause = false;

pauseButton.onclick = function () {
    if (pauseButton.innerHTML == "Pause") {
        pauseButton.innerHTML = "Start";
    } else {
        pauseButton.innerHTML = "Pause";
    }
    if (pause) {
        ticker.start();
    } else {
        ticker.stop();
    }

    pause = !pause;
};

// -------------------------------------------------------------------------------

//User reference and functions
var player = 0;

const relicTracker = [];

function iterator(relic) {
    for (let i = 0; i < relicTracker; i++) {
        if (relicTracker[i] instanceof relic) {
            return true;
        }
    }
    return false;
}

function resetHurt() {
    clearInterval(toggleInterval);
    if (player.sprite.texture == userVal.textureHurt) {
        player.sprite.texture = userVal.textureNormal;
    }
}

function toggleSprite() {
    if (player.sprite.texture == userVal.textureNormal) {
        player.sprite.texture = userVal.textureHurt;
    } else {
        player.sprite.texture = userVal.textureNormal;
    }

}

// -------------------------------------------------------------------------------

//Array to hold all timeout functions
var timeouts = [];

//timeout function reference for bulletTimeout

//timeout function reference for enemyTimeout

//Array to hold all interval functions
var toggleInvisidust = 0;

//interval function reference for toggleSprite
var toggleInterval = 0;
