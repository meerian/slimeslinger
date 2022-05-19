import { experienceCollide } from "../handlers/collisionHandler.js";
import { game } from "../pages/gamePage.js";

// -------------------------------------------------------------------------------

class experience  extends gameObject {
    constructor(x, y) {
        super(x, y, expVal.speed, new PIXI.Sprite.from(expVal.texture));
        this.width = expVal.width;
        this.height = expVal.height;
        this.tracking = false;
    }

    draw() {
        this.sprite.x = this.x;
        this.sprite.y = this.y;
        game.container.addChild(this.sprite);
    }

    // Checks if user is close enough to the experience orb
    checkAround() {
        let userLocation = player.getLocation();
        this.tracking = (Math.abs(userLocation[0] - this.x) < expVal.range && Math.abs(userLocation[1] - this.y) < expVal.range);
    }

    // If tracking flag is toggled on, exp orb will move towards the user
    updateLocation() {
        if (!this.tracking) {
            this.checkAround();
        } else {
            let userLocation = player.getLocation();
            let newX = this.x;
            let newY = this.y;
            if (this.x < userLocation[0]) {
                newX = this.x + this.speed;
            } else if (this.x > userLocation[0]) {
                newX = this.x - this.speed;
            }
            if (this.y < userLocation[1]) {
                newY = this.y + this.speed;
            } else if (this.y > userLocation[1]) {
                newY = this.y - this.speed;
            }

            this.x = newX;
            this.y = newY;
            if (this.experienceCheck()) {
                experienceCollide(this);
            }
        }
    }

    experienceCheck() {
        return this.lives;
    }
}

// -------------------------------------------------------------------------------

//Variables

var experiences = [];

// -------------------------------------------------------------------------------

//Public methods
export function addExperience(x, y) {
    experiences.push(new experience(x, y));
}


export function experienceLocationUpate() {
    for (let i = 0; i < experiences.length; i++) {
        experiences[i].updateLocation();
    }
    experiences = experiences.filter(curExperience => curExperience.experienceCheck());
}

export function drawExperiences(container) {
    for (let i = 0; i < experiences.length; i++) {
        experiences[i].draw(container);
    }
}

export function emptyExperiences() {
    experiences = [];
}
