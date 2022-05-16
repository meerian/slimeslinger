import { addBullet, bulletLocationUpdate, drawBullets, emptyBullets } from "./classes/bullet.js";
import { addEnemy, drawEnemies, emptyEnemies, enemyLocationUpate } from "./classes/enemy.js";
import { drawExperiences, emptyExperiences, experienceLocationUpate } from "./classes/experience.js";
import { createUser, defaultUser, deleteUser, drawUser, userLocationUpdate } from "./classes/user.js";
import { resetKeyPressed } from "./eventListeners.js";

export const app = new PIXI.Application({
    view: document.getElementById("myCanvas"),
    backgroundColor: 0xFFFFFF
});
app.renderer.resize(0.8 * window.innerHeight, 0.8 * window.innerHeight);

export const textStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 16,
    fill: "0x235823",
    dropShadow: true,
    dropShadowAlpha: 0.1
})

export const gameContainer = new PIXI.Container();
const blurFilter = new PIXI.filters.BlurFilter();
var pauseButton = document.getElementById("Pause");
var score = 0;
var Highscore = 0;
var pause = true;
var scoreTimeout = 0;
var bulletTimeout = 0;
var enemyTimeout = 0;

pauseButton.onclick = function () {
    if (pauseButton.innerHTML == "Pause") {
        pauseButton.innerHTML = "Start";
    } else {
        pauseButton.innerHTML = "Pause";
    }
    if (pause) {
        app.ticker.start();
    } else {
        app.ticker.stop();
    }

    pause = !pause;
};

function drawAll() {
    drawEnemies();
    drawBullets();
    drawUser();
    drawExperiences();
    drawScore(); //display score
    drawLives(); //display lives
    drawHighscore();
}

function startScore() {
    if (!pause) {
        score = score + 1;
    }
    scoreTimeout = setTimeout(startScore, 1000);
}

export function updateScore(x) {
    score += x;
}

export function getScore() {
    return score;
}

export function setHighscore(hScore) {
    if (hScore > Highscore) {
        Highscore = hScore;
    }
}

function bulletAutofire() {
    addBullet(defaultUser.x, defaultUser.y, defaultUser.direction);
    bulletTimeout = setTimeout(bulletAutofire, defaultUser.firerate);
}

function enemySpawnLocation() {
    if (!pause) {
        let check = Math.floor(Math.random() * 4 + 1);
        let x = 0;
        let y = 0;
        //Randomises enemy spawn location
        switch (check) {
            case 1:
                x = Math.floor(Math.random() * (app.renderer.width - 1));
                break;
            case 2:
                y = Math.floor(Math.random() * (app.renderer.width - 1));
                break;
            case 3:
                x = Math.floor(Math.random() * (app.renderer.width - 1));
                y = app.renderer.width - 1;
                break;
            case 4:
                x = app.renderer.width - 1;
                y = Math.floor(Math.random() * (app.renderer.width - 1));
                break;
        }
        addEnemy(x, y);
    }
    let spawnTime = 10 + 1000 / Math.log(score + 2);
    enemyTimeout = setTimeout(enemySpawnLocation, spawnTime);
}

export function pauseGame() {
    pause = true;
    app.ticker.stop();
    gameContainer.filters = [blurFilter];
    pauseButton.disabled = true; 
}

export function resumeGame() {
    pause = false;
    app.ticker.start();
    gameContainer.filters = [];
    pauseButton.disabled = false; 
}

//resets game
export function resetGame() {

    //ticker stuff
    app.ticker.stop();

    //resets values
    score = 0;
    pause = true;
    resetKeyPressed();

    //clears timeouts
    clearTimeout(scoreTimeout);
    clearTimeout(bulletTimeout);
    clearTimeout(enemyTimeout);

    gameContainer.filters = [blurFilter];
    pauseButton.disabled = true; 
}

function emptyContainer() {
    //removes everything
    emptyBullets();
    emptyEnemies();
    emptyExperiences();
    deleteUser();

    //empty container
    while (gameContainer.children[0]) {
        gameContainer.removeChild(gameContainer.children[0]);
    }
    gameContainer.filters = [];
}

function drawScore() {
    let text = new PIXI.Text("Score:" + score, textStyle);
    text.x = 8;
    text.y = 35;
    gameContainer.addChild(text);
}

function drawHighscore() {
    let text = new PIXI.Text("High Score: " + Highscore, textStyle);
    text.x = 8;
    text.y = 10;
    gameContainer.addChild(text);
}

function drawLives() {
    let text = new PIXI.Text("Lives: " + defaultUser.lives, textStyle);
    text.x = app.renderer.width - 65;
    text.y = 10;
    gameContainer.addChild(text);
}

function draw() {
    while (gameContainer.children[0]) {
        gameContainer.removeChild(gameContainer.children[0]);
    }
    drawAll(); //draws everything onto the canvas
    userLocationUpdate(); //updates user location based on keystrokes
    enemyLocationUpate(); //updates enemy location to next frame
    bulletLocationUpdate(); //updates bullet location to next frame
    experienceLocationUpate();
}

export function restart() {
    emptyContainer();
    createUser();
    startScore();
    enemySpawnLocation();
    bulletAutofire();
    app.ticker.start();
    pause = false;
    pauseButton.disabled = false;
}

function start() {
    app.stage.addChild(gameContainer);
    createUser();
    startScore();
    enemySpawnLocation();
    bulletAutofire();
    app.ticker.stop();
}

//Adds the draw function and starts the game
app.ticker.add(() => draw());
start();