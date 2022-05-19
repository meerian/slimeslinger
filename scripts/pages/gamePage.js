import { drawBullets, emptyBullets } from "../gameObjects/bullet.js";
import { drawEnemies, emptyEnemies} from "../gameObjects/enemy.js";
import { drawExperiences, emptyExperiences } from "../gameObjects/experience.js";
import { drawUser, emptyUser } from "../gameObjects/user.js";

// -------------------------------------------------------------------------------

class gamePage extends page {
    constructor() {
        super(gameContainer);
    }

    createPage() {
        drawEnemies(gameContainer);
        drawBullets(gameContainer);
        drawUser(gameContainer);
        drawExperiences(gameContainer);

        //display score
        drawText(new PIXI.Text("Score:" + score, textStyle), 10, 35, gameContainer);

        //display highscore
        drawText(new PIXI.Text("High Score: " + Highscore, textStyle), 10, 10, gameContainer);

        //display lives
        drawText(new PIXI.Text("Lives: " + player.lives, textStyle), app.renderer.width - 75, 10, gameContainer);
    }

    cleanup() {
        //removes everything
        emptyBullets();
        emptyEnemies();
        emptyExperiences();
        emptyUser();
    
        //empty container
        while (gameContainer.children[0]) {
            gameContainer.removeChild(gameContainer.children[0]);
        }
        gameContainer.filters = [];
    }
};

// -------------------------------------------------------------------------------

//Variables
const gameContainer = new PIXI.Container();
export const game = new gamePage();
