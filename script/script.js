let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let box = 32;

let counterOfAliveSheeps = 3;

const maxAmountOfSheeps = 7;

let arrayOfSheeps = [];

let timeOfGame;


class sheep {
    _isAlive = true;
    _destinationOfSheep;


    constructor() {
        this._look = new Image();
        this._look.src = "images/sheep.png";
        this._x = Math.floor(Math.random() * 16) * box;
        this._y = Math.floor(Math.random() * 22) * box;
        this.RandomiseDestination();
        arrayOfSheeps.push(this);
    }


    get getLook() {
        return this._look;
    }
    get getX() {
        return this._x;
    }
    get getY() {
        return this._y;
    }
    get isSheepAlive() {
        return this._isAlive;
    }
    set isSheepAlive(value) {
        this._isAlive = value;
    }
    set setX(value) {
        this._x = value;
    }
    set setY(value) {
        this._y = value;
    }
    get getDestination() {
        return this._destinationOfSheep;
    }
    set setDestination(value) {
        this._destinationOfSheep = value;
    }

    RandomiseDestination() {
        switch (Math.floor(Math.random() * 3 + 1)) {
            case 1:
                this._destinationOfSheep = "up-left";
                break;
            case 2:
                this._destinationOfSheep = "up-right";
                break;
            case 3:
                this._destinationOfSheep = "down-left";
                break;
            case 4:
                this._destinationOfSheep = "down-right";
                break;
        }
    }

    changeCoordinates() {
        this._x = Math.floor(Math.random() * 16) * box;
        this._y = Math.floor(Math.random() * 22) * box;
    }


    changeSheepDestination() {
        if (this._destinationOfSheep == "up-left") {
            this.setY = (this.getY - box);
            this.setX = (this.getX - box);
        }
        if (this._destinationOfSheep == "up-right") {
            this.setY = (this.getY - box);
            this.setX = (this.getX + box);
        }
        if (this._destinationOfSheep == "down-left") {
            this.setY = (this.getY + box);
            this.setX = (this.getX - box);
        }
        if (this._destinationOfSheep == "down-right") {
            this.setY = (this.getY + box);
            this.setX = (this.getX + box);
        }
    }


    checkCollisionsWithEdges() {
        if (this.getX < 0) {
            if (this._destinationOfSheep == "up-left") {
                this._destinationOfSheep = "up-right";
                this.setX = (this.getX + box);
                this.setY = (this.getY - box);
            }
            if (this._destinationOfSheep == "down-left") {
                this._destinationOfSheep = "down-right";
                this.setX = (this.getX + box);
                this.setY = (this.getY + box);
            }
        }
        if (this.getX > 31 * box) {
            if (this._destinationOfSheep == "down-right") {
                this._destinationOfSheep = "down-left";
                this.setX = (this.getX - box);
                this.setY = (this.getY + box);
            }
            if (this._destinationOfSheep == "up-right") {
                this._destinationOfSheep = "up-left";
                this.setX = (this.getX - box);
                this.setY = (this.getY - box);
            }
        }
        if (this.getY < 0) {
            if (this._destinationOfSheep == "up-left") {
                this._destinationOfSheep = "down-left";
                this.setX = (this.getX - box);
                this.setY = (this.getY + box);
            }
            if (this._destinationOfSheep == "up-right") {
                this._destinationOfSheep = "down-right";
                this.setX = (this.getX + box);
                this.setY = (this.getY + box);
            }
        }
        if (this.getY > 20 * box) {
            if (this._destinationOfSheep == "down-left") {
                this._destinationOfSheep = "up-left";
                this.setX = (this.getX - box);
                this.setY = (this.getY - box);
            }
            if (this._destinationOfSheep == "down-right") {
                this._destinationOfSheep = "up-right";
                this.setX = (this.getX + box);
                this.setY = (this.getY - box);
            }
        }
    }


    checkCollisionsBetweenObjects(obj1) {
        let XCollision = false;
        let YCollision = false;

        if ((obj1.getX + box >= this.getX) && (this.getX + box >= obj1.getX)) XCollision = true;
        if ((obj1.getY + box >= this.getY) && (this.getY + box >= obj1.getY)) YCollision = true;

        if (XCollision && YCollision) return true;
        return false;
    }


    collisionOfSheeps(obj1) {
        let newSheep = new sheep();
        let tempDestination;
        newSheep.RandomiseDestination();
        while (arrayOfSheeps[arrayOfSheeps.length - 1].getDestination == this.getDestination ||
            arrayOfSheeps[arrayOfSheeps.length - 1].getDestination == obj1.getDestination)
            arrayOfSheeps[arrayOfSheeps.length - 1].RandomiseDestination();
        tempDestination = this.getDestination;
        this.setDestination = obj1.getDestination;
        obj1.setDestination = tempDestination;
        counterOfAliveSheeps++;
    }

}

class hunter {
    constructor() {
        this._look = new Image();
        this._look.src = "images/wolf.png";
        this._x = Math.floor(Math.random() * 16 + 16) * 3 * box;
        this._y = Math.floor(Math.random() * 22) * 3 * box;
    }
    get getLook() {
        return this._look;
    }
    get getX() {
        return this._x;
    }
    get getY() {
        return this._y;
    }
    set setX(newX) {
        this._x = newX;
    }
    set setY(newY) {
        this._y = newY;
    }
}


document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if (event.keyCode == 37) dir = "left";
    else if (event.keyCode == 38) dir = "up";
    else if (event.keyCode == 39) dir = "right";
    else if (event.keyCode == 40) dir = "down";
    else if (event.keyCode == 65) dir = "left";
    else if (event.keyCode == 87) dir = "up";
    else if (event.keyCode == 68) dir = "right";
    else if (event.keyCode == 83) dir = "down";
}

const dialog = document.querySelector(".dialogWindow");
const easy = document.querySelector("#easy");
const medium = document.querySelector("#medium");
const hard = document.querySelector("#hard");
const buttonClose = document.querySelector(".buttonClose");

let eatAudio = new Audio();
eatAudio.src = "audio/Amm.mp3";

let fightAudio = new Audio();
fightAudio.src = "audio/fight.mp3";

let finishHer = new Audio();
finishHer.src = "audio/finishHer.mp3";

let gameOver = new Audio();
gameOver.src = "audio/over.mp3";

dialog.showModal();

buttonClose.addEventListener("click", function() {
    event.preventDefault();
    if (medium.checked) timeOfGame = 60000;
    else if (hard.checked) timeOfGame = 30000;
    else timeOfGame = 90000;
    dialog.close();
})


let destinationOfSheep;
let counterOfSpawnCheck = 1;
let timeOfStart;
let counterOfFightSound = 1;
let counterOfGameOverSound = 1;
let game;





let firstSheep = new sheep();
let secondSheep = new sheep();
let thirdSheep = new sheep();
let wolf = new hunter();


function drawGame() {
    /*   clearTimeout(timeForChoose); */
    if (counterOfSpawnCheck == 1) {
        while (firstSheep.checkCollisionsBetweenObjects(secondSheep) || secondSheep.checkCollisionsBetweenObjects(thirdSheep) ||
            firstSheep.checkCollisionsBetweenObjects(thirdSheep)) {
            firstSheep.changeCoordinates();
            secondSheep.changeCoordinates();
            thirdSheep.changeCoordinates();
        }
        counterOfSpawnCheck--;
    }
    if (counterOfFightSound == 1) {
        fightAudio.play();
        counterOfFightSound--;
    }
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, 1024, 704);
    ctx.drawImage(wolf.getLook, wolf.getX, wolf.getY);

    ctx.fillStyle = "#2AC2D3";
    ctx.font = "27px 'VT323', monospace";
    ctx.fillText("Sheeps Alive:", box * 25.2, box * 2);
    ctx.font = "34px 'VT323', monospace";
    ctx.fillText(counterOfAliveSheeps, box * 30, box * 2);
    ctx.font = "27px 'VT323', monospace";
    ctx.fillText("Time Remaining:", box * 1, box * 2);
    ctx.font = "34px 'VT323', monospace";
    ctx.fillText(Math.floor(((timeOfStart - Date.now()) / 1000)), box * 6.5, box * 2);


    if ((timeOfStart - Date.now()) <= 0) {
        if (counterOfGameOverSound == 1) {
            gameOver.play();
            counterOfGameOverSound--;
        }
        clearInterval(game);
        ctx.fillStyle = "#000000";
        ctx.font = "100px 'VT323', monospace";
        ctx.fillText("GAME OVER", box * 10.5, box * 11)
        ctx.font = "50px 'VT323', monospace";
        ctx.fillText("You lose!", box * 13.5, box * 12.5)
    }


    if (counterOfAliveSheeps == 0) {
        if (counterOfGameOverSound == 1) {
            gameOver.play();
            counterOfGameOverSound--;
        }
        clearInterval(game);
        ctx.fillStyle = "#000000";
        ctx.font = "100px 'VT323', monospace";
        ctx.fillText("GAME OVER", box * 10.5, box * 11)
        ctx.font = "50px 'VT323', monospace";
        ctx.fillText("You win!", box * 13.5, box * 12.5)
    }

    for (let i = 0; i < arrayOfSheeps.length; i++) {
        if (arrayOfSheeps[i].checkCollisionsBetweenObjects(wolf)) {
            arrayOfSheeps[i].isSheepAlive = false;
            eatAudio.play();
            counterOfAliveSheeps--;
            arrayOfSheeps.splice(i, 1);
            if (counterOfAliveSheeps == 1) finishHer.play();
        } else {
            if (arrayOfSheeps[i].isSheepAlive !== false) {
                arrayOfSheeps[i].changeSheepDestination();
                arrayOfSheeps[i].checkCollisionsWithEdges();
                ctx.drawImage(arrayOfSheeps[i].getLook, arrayOfSheeps[i].getX, arrayOfSheeps[i].getY);
            }
        }
    }

    for (let i = 0; i < arrayOfSheeps.length - 1; i++) {
        for (let j = i + 1; j < arrayOfSheeps.length; j++) {
            if (arrayOfSheeps.length < maxAmountOfSheeps) {
                if (arrayOfSheeps[i].checkCollisionsBetweenObjects(arrayOfSheeps[j])) {
                    arrayOfSheeps[i].collisionOfSheeps(arrayOfSheeps[j]);
                }
            }
        }
    }


    let wolfX = wolf.getX;
    let wolfY = wolf.getY;

    if (dir == "left") {
        wolfX -= box;
        wolf.setX = wolfX;
    }
    if (dir == "right") {
        wolfX += box;
        wolf.setX = wolfX;
    }
    if (dir == "up") {
        wolfY -= box;
        wolf.setY = wolfY;
    }
    if (dir == "down") {
        wolfY += box;
        wolf.setY = wolfY;
    }
    if (wolf.getX < 0) wolf.setX = 31 * box;
    if (wolf.getX > (31 * box)) wolf.setX = 0;
    if (wolf.getY < 0) wolf.setY = 20 * box;
    if (wolf.getY > (20 * box)) wolf.setY = 0;



}




let start = setTimeout(() => {
    dialog.close();
    if (medium.checked) timeOfGame = 60000;
    else if (hard.checked) timeOfGame = 30000;
    else timeOfGame = 90000;
    timeOfStart = Date.now() + timeOfGame;
    game = setInterval(drawGame, 110);
}, 5000);