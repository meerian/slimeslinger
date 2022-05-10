import { updateScore } from "./main.js";
import { enemies } from "./enemy.js";
import { defaultUser } from "./user.js"
import { addExperience } from "./experience.js";

//Handles collision between bullet and enemy.
function bulletCollide(bullet) {
    function checkAround(x, y) {
        for (let i = 0; i < enemies.length; i++) {
            let cur = enemies[i];
            if (Math.abs(cur._x - x) < 5 && Math.abs(cur._y - y) < 5) {
                return cur;
            }
        }
        return 0;
    }
    let collided = checkAround(bullet.x, bullet.y);
    if (collided != 0) {
        collided.isAlive = false;
        //canvasLocation[bullet.x * 2][bullet.y * 2] = 0;
        bullet.isAlive = false;
        addExperience(bullet.x, bullet.y);
        updateScore(1);
    }
}

//Handles collision between enemy and user.
function enemyCollide(e) {
    if (Math.abs(defaultUser.x - e.x) < 3 && Math.abs(defaultUser.y - e.y) < 3) {
        defaultUser.takeDamage();
    }
}

//Handles collision between experience and user.
function experienceCollide(e) {
    if (Math.abs(defaultUser.x - e.x) < 3 && Math.abs(defaultUser.y - e.y) < 3) {
        e.isAlive = false;
        defaultUser.gainExperience();
    }
}

export { bulletCollide, enemyCollide, experienceCollide };