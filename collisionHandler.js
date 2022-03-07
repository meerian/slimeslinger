import { canvasLocation } from "./main.js";
import { enemy } from "./enemy.js";
import { defaultUser } from "./user.js"

function bulletCollide(bullet) {
    var current = canvasLocation[bullet.x * 2][bullet.y * 2];
    if (current instanceof enemy) {
        current.isAlive = false;
        canvasLocation[bullet.x * 2][bullet.y * 2] = 0;
        bullet.isAlive = false;
    }
}

function enemyCollide() {
    defaultUser.takeDamage();
}

export { bulletCollide, enemyCollide };