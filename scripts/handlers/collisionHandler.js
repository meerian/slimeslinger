import { enemies } from "../gameObjects/enemy.js";
import { addExperience } from "../gameObjects/experience.js";

// -------------------------------------------------------------------------------

//Handles collision between bullet and enemy.
export function bulletCollide(bullet) {
    function checkAround(x, y) {
        let checkX = enemyVal.width - bulletVal.width;
        let checkY = enemyVal.height - bulletVal.height;
        for (let i = 0; i < enemies.length; i++) {
            let cur = enemies[i];
            if (Math.abs(cur._x - x) < checkX  && Math.abs(cur._y - y) < checkY) {
                return cur;
            }
        }
        return 0;
    }
    
    let collided = checkAround(bullet.x, bullet.y);
    if (collided != 0) {
        collided.lives--;
        bullet.lives--;
        addExperience(bullet.x, bullet.y);
        updateScore(1);
    }
}

// -------------------------------------------------------------------------------

//Handles collision between enemy and user.
export function enemyCollide(e) {
    if (Math.abs(player.x - e.x) < userVal.width - 1 && Math.abs(player.y - e.y) < userVal.height - 1) {
        player.takeDamage();
    }
}

// -------------------------------------------------------------------------------

//Handles collision between experience and user.
export function experienceCollide(e) {
    if (Math.abs(player.x - e.x) < userVal.width && Math.abs(player.y - e.y) < userVal.height) {
        e.lives--;
        player.gainExperience();
    }
}
