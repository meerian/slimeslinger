import { addBullet, bulletLocationUpdate } from "./gameObjects/bullet.js";
import { addEnemy, enemyLocationUpate } from "./gameObjects/enemy.js";
import { experienceLocationUpate } from "./gameObjects/experience.js";
import { addUser, userLocationUpdate, defaultUser } from "./gameObjects/user.js";
import { resetKeyPressed } from "./eventListeners.js";
import { startHandler } from "./pages/startPage.js";
import { game } from "./pages/gamePage.js";

// -------------------------------------------------------------------------------

//Private methods

//Handles bullet firing
function bulletAutofire() {
    addBullet(defaultUser.x, defaultUser.y, defaultUser.direction);
    bulletTimeout = setTimeout(bulletAutofire, defaultUser.firerate);
}

//Handles enemy spawning
function enemySpawnLocation() {
    if (!pause) {
        let check = Math.floor(Math.random() * 4 + 1);
        let x = 0;
        let y = 0;
        //Randomises enemy spawn location
        switch (check) {
            case 1:
                x = Math.floor(Math.random() * (app.renderer.width));
                break;
            case 2:
                y = Math.floor(Math.random() * (app.renderer.width));
                break;
            case 3:
                x = Math.floor(Math.random() * (app.renderer.width));
                y = app.renderer.width;
                break;
            case 4:
                x = app.renderer.width;
                y = Math.floor(Math.random() * (app.renderer.width));
                break;
        }
        addEnemy(x, y);
    }
    let spawnTime = 10 + 2000 / Math.log(score + 2);
    enemyTimeout = setTimeout(enemySpawnLocation, spawnTime);
}

//Main gameplay loop
function gameLoop() {
    while (game.container.children[0]) {
        game.container.removeChild(game.container.children[0]);
    }
    game.createPage(); //draws everything onto the canvas
    userLocationUpdate(); //updates user location based on keystrokes
    enemyLocationUpate(); //updates enemy location to next frame
    bulletLocationUpdate(); //updates bullet location to next frame
    experienceLocationUpate();
}

// -------------------------------------------------------------------------------

//Public methods

//Called on level up
export function pauseGame() {
    pause = true;
    ticker.stop();
    game.container.filters = [blurFilter];
    pauseButton.disabled = true;
}

//Called after level up option chosen
export function resumeGame() {
    pause = false;
    ticker.start();
    game.container.filters = [];
    pauseButton.disabled = false;
}

//resets game
export function resetGame() {

    //ticker stuff
    ticker.stop();

    //resets values
    score = 0;
    pause = true;
    resetKeyPressed();

    //clears timeouts
    clearTimeout(scoreTimeout);
    clearTimeout(bulletTimeout);
    clearTimeout(enemyTimeout);

    game.container.filters = [blurFilter];
    pauseButton.disabled = true;
}

//Brings user back to start screen
export function restart() {
    game.cleanup();
    startHandler(Highscore);
}

//Starts the game
export function start() {
    app.stage.addChild(game.container);
    addUser();
    startScore();
    enemySpawnLocation();
    bulletAutofire();
    resetTicker();
    ticker.add(() => gameLoop());
    ticker.start();
    pause = false;
    pauseButton.disabled = false;
}