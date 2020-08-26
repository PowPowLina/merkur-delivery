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
                document.querySelector('.introScreen').style.visibility = "hidden";
                break;
            }
        } else if(this.state == GAME_PLAY) {
            switch(keyCode) {
                case 13: 
                if (this.player.velocity === 0) {
                    this.player.startEngine();
                } else {
                    this.player.stopEngine();
                }
                break;

                case 32: 
                this.player.turnRight();
                break;
            }

        } else if(this.state == GAME_OVER) {
            switch(keyCode) {  
                case 13: 
                this.state = GAME_STATE_PRESTART; 
                this.reset();
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
    }


    continue(){
        this.streetMap.reset();
        this.player.continue();
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