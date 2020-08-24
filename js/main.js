const game = new Game();
const streetMap = new StreetMap();

let row;
let col;





let playerImage;


function preload(){
    streetMap.preload();
    playerImage = loadImage('/assets/playerTile.png');
}


function setup(){
    streetMap.setup();
   this.player = new Player(streetMap);
    frameRate(FRAME_RATE);
    createCanvas(WIDTH, HEIGHT);
    

}
function keyPressed() {
    console.log('this is a key', keyCode);
    if (keyCode === 13){
      player.move();
    }
  }

function draw(){
    clear();
    streetMap.draw();
    this.player.draw(playerImage);
    
}


