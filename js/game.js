class Game {
    constructor() {
        this.state = GAME_STATE_PRESTART;
        this.streetMap = new StreetMap();
        this.player = new Player();
    }

    preload() {
        this.gamePreStartImg = loadImage('/assets/gamePreStart.png');
        this.gameOverImg = loadImage('/assets/gameOver.png');
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
                break;
            }
        }
    }

    reset(){
        this.streetMap.reset();
        this.player.reset();
    }

    draw() {
        if (this.state == GAME_STATE_PRESTART) {
            image(this.gamePreStartImg, 0, 0, WIDTH, HEIGHT);
        }
        if (this.state == GAME_PLAY) {
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