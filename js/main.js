const game = new Game();




function preload() {
   
    game.preload();
}


function setup() {
    angleMode(DEGREES);
    frameRate(FRAME_RATE);
    createCanvas(WIDTH, HEIGHT);
    game.setup();
}

function keyPressed() {
    game.keyPressed();
}

function draw() {

    game.draw();


    // change world states
    //if (player.fuelMoney < 1){
    //    frameRate(0);}
    //player.move();
    
    // draw the current state
    //clear();
    //streetMap.draw();
    //player.draw();
   
}