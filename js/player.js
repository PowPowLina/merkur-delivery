class Player {
    constructor() {
        this.velocity = 0;
        this.direction = EAST_DIRECTION;
    }

    preload() {
        this.playerImage = loadImage('/assets/playerTile.png');
    }

    setup(streetMap) {
        this.streetMap = streetMap;
        const stationPosition = streetMap.getStationPos();
        this.row = stationPosition[0] + 1; //TODO make it flexible
        this.col = stationPosition[1];



    }


    draw() {
        image(this.playerImage, this.col * TILE_SIZE, this.row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    startEngine() {
        this.velocity = 0.1;
    }
    stopEngine() {
        this.velocity = 0;
    }
    isObstacleinPath() {
     //  let y = this.row;
     //   let x = this.col;


    }

    checkObstacles() {
        if (this.col >= 15 || this.isObstacleinPath()) {
            this.stopEngine();
        }
    }

    move() {
        this.checkObstacles();
        this.col += this.velocity;
    }
}