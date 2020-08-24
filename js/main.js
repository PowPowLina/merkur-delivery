const game = new Game();
const streetMap = new StreetMap();

let playerImage;
const player = new Player(1,5);

function preload(){
    streetMap.preload();
}

function setup(){
    streetMap.setup();
    frameRate(FRAME_RATE);
    createCanvas(WIDTH, HEIGHT);
    playerImage = loadImage('/assets/playerTile.png');

}


function draw(){
    streetMap.draw();
    player.draw(playerImage);
    
}


