const game = new Game();
const streetMap = new StreetMap();
const player = new Player();



function preload() {
    streetMap.preload();
    player.preload();
}


function setup() {
    angleMode(DEGREES);
    streetMap.setup();
    player.setup(streetMap);
    frameRate(FRAME_RATE);
    createCanvas(WIDTH, HEIGHT);
}

function keyPressed() {
    if (keyCode === 13) {
        if (player.velocity === 0) {
            player.startEngine();
        } else {
            player.stopEngine();
        }
    }
    if (keyCode === 32) {
        player.turnRight();
    }
}

function draw() {
    // change world states
    player.move();
    
    // draw the current state
    clear();
    streetMap.draw();
    player.draw();
   
}