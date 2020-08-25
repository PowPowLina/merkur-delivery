class Player {
    constructor() {
        this.velocity = 0;
        this.direction = EAST_DIRECTION;

    }

    preload() {
        this.playerImage = loadImage('/assets/truck.png');
    }

    setup(streetMap) {
        this.streetMap = streetMap;
        const stationPosition = streetMap.getStationPos();
        this.row = stationPosition[0] + 1; //TODO make it flexible
        this.col = stationPosition[1];
    }


    draw() {
        push();
        translate(this.col * TILE_SIZE + (TILE_SIZE / 2), this.row * TILE_SIZE + (TILE_SIZE / 2));
        rotate(this.direction);
        imageMode(CENTER);
        image(this.playerImage, 0, 0, TILE_SIZE, TILE_SIZE);
        pop();
    }

    startEngine() {
        this.velocity = TRUCK_SPEED;
    }
    stopEngine() {
        this.velocity = 0;
    }

    isObstacleinPath() {
         // TODO check for obstacles in path depending on direction

        if (this.direction == EAST_DIRECTION) {
            if (streetMap.map[Math.floor(this.row)][Math.floor(this.col) + 1] === TILE_TYPE_WALL) {
                return true;
            }
            return false;
        }
        if (this.direction == WEST_DIRECTION) {
            if (streetMap.map[Math.floor(this.row)][Math.ceil(this.col) - 1] === TILE_TYPE_WALL) {
                return true;
            }
            return false;
        }
        if (this.direction == NORTH_DIRECTION) {
            if (streetMap.map[Math.ceil(this.row) - 1 ][Math.floor(this.col)] === TILE_TYPE_WALL) {
                return true;
            }
            return false;
        }
        if (this.direction == SOUTH_DIRECTION) {
            if (streetMap.map[Math.floor(this.row) + 1][Math.floor(this.col)] === TILE_TYPE_WALL) {
                return true;
            }
            return false;
        }
    }


    checkObstacles() {
        // TODO check for screen boundaries and stop if found depending on direction

       


        if (this.col >= 15) {
            this.stopEngine();
        }
        if (this.isObstacleinPath()) {
            this.turnRight();
        }
    }

    turnRight() {
        switch (this.direction) {
            case EAST_DIRECTION:
                this.direction = SOUTH_DIRECTION;
                break;
            case SOUTH_DIRECTION:
                this.direction = WEST_DIRECTION;
                break;
            case WEST_DIRECTION:
                this.direction = NORTH_DIRECTION;
                break;
            case NORTH_DIRECTION:
                this.direction = EAST_DIRECTION;
                break;
        }

        this.row = Math.round(this.row);
        this.col = Math.round(this.col);
    }



    move() {
        this.checkObstacles();
        
        //console.log(this.row, this.col);
        switch (this.direction) {
            case EAST_DIRECTION:
                this.col += this.velocity;
                break;
            case SOUTH_DIRECTION:
                this.row += this.velocity;
                break;
            case WEST_DIRECTION:
                this.col -= this.velocity;
                break;
            case NORTH_DIRECTION:
                this.row -= this.velocity;
                break;
        }

        // TODO drive in the direction the car is facing
    }
}