class Game {
    constructor() {
        this.state = GAME_STATE_PRESTART;
        this.streetMap = new StreetMap();
        this.player = new Player();
    }

    preload() {
        this.gamePreStartImg = loadImage('./assets/introtruck.gif');
        this.gameOverImg = loadImage('./assets/gameOver.png');
        this.streetMap.preload();
        this.player.preload();
        this.truckEngineSound = loadSound("./assets/Engine_Bus2.mp3");
        this.gameSoundMusic = loadSound("./assets/Instant_Crush.mp3");
        this.gameOverMusic = loadSound("./assets/gameover.mp3");
        this.skidSound = loadSound("./assets/skid.mp3");
    }

    setup() {
        this.streetMap.setup();
        this.player.setup(this.streetMap);
    }

    keyPressed(){
        if(this.state == GAME_STATE_PRESTART) {
            switch(keyCode) {
                case 13: 
                this.state = GAME_PLAY; 
                this.gameSoundMusic.loop();
                this.gameSoundMusic.setVolume(0.1);
                document.querySelector('.introScreen').style.visibility = "hidden";              
                break;
            }
        } else if(this.state == GAME_PLAY) {
            switch(keyCode) {
                case 13: 
                if (this.player.velocity === 0) {
                    this.player.startEngine();
                    this.truckEngineSound.loop();
                } else {
                    this.player.stopEngine();
                    this.truckEngineSound.stop();
                }
                break;

                case 32: 
                this.player.turnRight();
                this.skidSound.setVolume(0.2);
                this.skidSound.play();
                break;

                case 78:
                this.state = GAME_STATE_PRESTART; 
                this.gameSoundMusic.stop();
                this.truckEngineSound.stop();
                this.reset();
                document.querySelector('.introScreen').style.visibility = "visible";
                break;
            }

        } else if(this.state == GAME_OVER) {
            switch(keyCode) {  
                case 13: 
                this.state = GAME_STATE_PRESTART; 
                this.reset();
                this.gameSoundMusic.stop();
                document.querySelector('.introScreen').style.visibility = "visible";
                break;
            }
        }
    }

    reset(){
        this.streetMap.reset();
        this.player.reset();
        document.getElementById('fuel-money').innerHTML = '';
        document.getElementById('packages-delivered').innerHTML = '';
        document.getElementById('total-packages-delivered').innerHTML = '';
    }


    continue(){
        this.streetMap.reset();
        this.player.continue();
        this.truckEngineSound.stop();
    }

    testForNextLevel(){
        if (this.streetMap.isAllPackagesGone() && 
        Math.floor(this.player.row) == this.streetMap.stationPos[0]+ 1 && 
        Math.floor(this.player.col) == this.streetMap.stationPos[1]
        ){
            this.continue();
        }
    }

    draw() {
        if (this.state == GAME_STATE_PRESTART) {
            push();
            clear();
            imageMode(CENTER);
            image(this.gamePreStartImg, WIDTH/2, HEIGHT/2, WIDTH/2, HEIGHT/2);
            pop();
        }
        if (this.state == GAME_PLAY) {
            this.testForNextLevel();
            // change world states
            if (this.player.fuelMoney < 1) {
                this.state = GAME_OVER;
                this.gameSoundMusic.stop();
                this.truckEngineSound.stop();
                this.gameOverMusic.play();
            }
            this.player.move();

            // draw the current state
            clear();
            this.streetMap.draw();
            this.player.draw();
        }
        if (this.state == GAME_OVER) {
            image(this.gameOverImg, 0, 0, WIDTH, HEIGHT);
        }
    }


}