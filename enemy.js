import { defaultUserCreator } from "./user.js";

var canvas = document.getElementById("myCanvas");
var defaultUser = defaultUserCreator();
var enemies = [];
var enemiesLocations = [];
var spawnLocation = [];

var spawnRadius = 10;

for (var i = 0; i < canvas.height * 2; i++) {
    enemiesLocations[i] = new Array(1000).fill(0);
}

class enemy {
    constructor(x, y) {
        this.width = 10
        this.height = 10
        this.x = x;
        this.y = y;
        this.speed = 0.5;
    }

    get x() { return this._x; }
    set x(newX) { this._x = newX; }
    get y() { return this._y; }
    set y(newY) { this._y = newY; }

    updateLocation() {
        var userLocation = defaultUser.getLocation();
        enemiesLocations[this.x * 2][this.y * 2] = 0;
        if (this.x < userLocation[0] && enemiesLocations[(this.x + this.speed) * 2][this.y * 2] == 0) {
            this.x += this.speed;
        } else if (enemiesLocations[(this.x - this.speed) * 2][this.y * 2] == 0){
            this.x -= this.speed;
        }

        if (this.y < userLocation[1] && enemiesLocations[this.x * 2][(this.y + this.speed) * 2] == 0) {
            this.y += this.speed;
        } else if (enemiesLocations[this.x * 2][(this.y - this.speed) * 2] == 0) {
            this.y -= this.speed;
        }
        enemiesLocations[this.x * 2][this.y * 2] = 1;
    }
}

function getEnemy(i) {
    return enemies[i];
}

function addEnemy() {
    var ptAngle = Math.random() * 2 * Math.PI;
    var ptRadiusSq = Math.sqrt(Math.random()) * spawnRadius;
    var enemyX = Math.sqrt(ptRadiusSq) * Math.cos(ptAngle);
    var enemyY = Math.sqrt(ptRadiusSq) * Math.sin(ptAngle);
    console.log(Math.floor(enemyX + spawnLocation[0]) + " and " + Math.floor(enemyY + spawnLocation[1]));
    enemies.push(new enemy(Math.floor(enemyX + spawnLocation[0]), Math.floor(enemyY + spawnLocation[1])));
}

function enemiesLength() {
    return enemies.length;
}

function enemyLocationUpate() {
    for (var i = 0; i < enemies.length; i++) {
        enemies[i].updateLocation();
    }
}

export { spawnLocation, getEnemy, enemiesLength, addEnemy, enemyLocationUpate };