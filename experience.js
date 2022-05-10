import { experienceCollide } from "./collisionHandler.js";
import { defaultUser } from "./user.js";

var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var experiences = [];

class experience {
    constructor(x, y) {
        this.radius = 2;
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.isAlive = true;
        this.tracking = false;
        this.color = "#90EE90";
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
        ctx.closePath();
    }

    // Checks if user is close enough to the experience orb
    checkAround() {
        let userLocation = defaultUser.getLocation();
        this.tracking = (Math.abs(userLocation[0] - this.x) < 50 && Math.abs(userLocation[1] - this.y) < 50);
    }

    // If tracking flag is toggled on, exp orb will move towards the user
    updateLocation() {
        if (!this.tracking) {
            this.checkAround();
        } else {
            let userLocation = defaultUser.getLocation();
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
            if (this.isAlive){
                experienceCollide(this);
                //canvasLocation[this.x * 2][this.y * 2] = this;
            }
        }
    }
}

function addExperience(x, y) {
    experiences.push(new experience(x, y));
}

function experienceCheck(experience) {
    return experience.isAlive;
}

function experienceLocationUpate() {
    for (let i = 0; i < experiences.length; i++) {
        experiences[i].updateLocation();
    }
    experiences = experiences.filter(curExperience => experienceCheck(curExperience));
}

function drawExperiences() {
    for (let i = 0; i < experiences.length; i++) {
        experiences[i].draw();
    }
}

export{ addExperience, experienceLocationUpate, drawExperiences }