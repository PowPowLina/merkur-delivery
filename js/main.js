const game = new Game();
const streetMap = new StreetMap();

function preload(){
    streetMap.preload();
}

function setup(){
    streetMap.setup();
    frameRate(FRAME_RATE);
    createCanvas(WIDTH, HEIGHT);
}


function draw(){
    streetMap.draw();
    
}


