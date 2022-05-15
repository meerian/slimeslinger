import { addBullet, bulletLocationUpdate, drawBullets } from "./classes/bullet.js";
import { addEnemy, drawEnemies, enemyLocationUpate } from "./classes/enemy.js";
import { drawExperiences, experienceLocationUpate } from "./classes/experience.js";
import { createUser, defaultUser, drawUser, userLocationUpdate } from "./classes/user.js";

export const app = new PIXI.Application({
    view: document.getElementById("myCanvas"),
    backgroundColor: 0xFFFFFF
});
app.renderer.resize(0.8 * window.innerHeight, 0.8 * window.innerHeight);

const textStyle = new PIXI.TextStyle({
    fontFamily: "Arial",
    fontSize: 16,
    fill: "0x235823"
})

export const gameContainer = new PIXI.Container();
var canvas = document.getElementById("myCanvas");
var pauseButton = document.getElementById("Pause");
var score = 0;
var pause = true;

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
}

function startScore() {
    if (!pause) {
        score = score + 1;
    }
    setTimeout(startScore, 1000);
}

export function updateScore(x) {
    score += x;
}

function bulletAutofire() {
    addBullet(defaultUser.x, defaultUser.y, defaultUser.direction);
    setTimeout(bulletAutofire, defaultUser.firerate);
}

function enemySpawnLocation() {
    if (!pause) {
        let check = Math.floor(Math.random() * 4 + 1);
        let x = 0;
        let y = 0;
        //Randomises enemy spawn location
        switch (check) {
            case 1:
                x = Math.floor(Math.random() * (canvas.width - 1));
                break;
            case 2:
                y = Math.floor(Math.random() * (canvas.width - 1));
                break;
            case 3:
                x = Math.floor(Math.random() * (canvas.width - 1));
                y = canvas.width - 1;
                break;
            case 4:
                x = canvas.width - 1;
                y = Math.floor(Math.random() * (canvas.width - 1));
                break;
        }
        addEnemy(x, y);
    }
    let spawnTime = 10 + 1000 / Math.log(score + 2);
    setTimeout(enemySpawnLocation, spawnTime);
}

export function endGame() {
    alert("YOU LOSE! Your score is: " + score);
    document.location.reload();
}

function drawValue() {
    let text = new PIXI.Text("Score:" + score, textStyle);
    text.x = 8;
    text.y = 10;
    gameContainer.addChild(text);
}

function drawLives() {
    let text = new PIXI.Text("Lives: " + defaultUser.lives, textStyle);
    text.x = canvas.width - 65;
    text.y = 10;
    gameContainer.addChild(text);
}

function draw() {
    while (gameContainer.children[0]) {
        gameContainer.removeChild(gameContainer.children[0]);
    }
    drawAll(); //draws all enemies, bullets and user
    drawValue(); //display score
    drawLives(); //display lives
    userLocationUpdate(); //updates user location based on keystrokes
    enemyLocationUpate(); //updates enemy location to next frame
    bulletLocationUpdate(); //updates bullet location to next frame
    experienceLocationUpate();
}

function start() {
    app.stage.addChild(gameContainer);
    createUser();
    startScore();
    enemySpawnLocation();
    bulletAutofire();
    app.ticker.stop();
    app.ticker.add(() => draw());
}

start();