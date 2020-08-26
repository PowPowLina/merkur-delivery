class Player {
    constructor() {
        this.velocity = 0;
        this.direction = EAST_DIRECTION;
        this.fuelMoney = 250;
        this.packagesDelivered = 0;

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

        document.getElementById('fuel-money').innerHTML = Math.floor(this.fuelMoney);
        document.getElementById('packages-delivered').innerHTML = this.packagesDelivered;
    }

    startEngine() {
        this.velocity = TRUCK_SPEED;
    }
    stopEngine() {
        this.velocity = 0;
    }

    mapTileToSimpleTileType(tile) {
        switch (tile) {
            case TILE_TYPE_STREET:
            case TILE_TYPE_PACKAGE:
                return SIMPLE_TILE_SPACE;
            case TILE_TYPE_WALL:
            case TILE_TYPE_STATION:
                return SIMPLE_TILE_BARRIER;
            default:
                console.warn('Unknown tile in tile mapper.');
                return SIMPLE_TILE_SPACE;
        }
    }

    // --------------------------------Check Obstacles -----------------------------------------

    isTileBarrier(row, col) {
        return this.mapTileToSimpleTileType(streetMap.map[row][col]) === SIMPLE_TILE_BARRIER;
    }

    isObstacleinPath() {
        // check for obstacles in path depending on direction

        if (this.direction == EAST_DIRECTION) {
            return this.isTileBarrier(Math.floor(this.row), Math.floor(this.col) + 1);
        }
        if (this.direction == WEST_DIRECTION) {
            return this.isTileBarrier(Math.floor(this.row), Math.ceil(this.col) - 1);
        }
        if (this.direction == NORTH_DIRECTION) {
            return this.isTileBarrier(Math.ceil(this.row) - 1, Math.floor(this.col));

        }
        if (this.direction == SOUTH_DIRECTION) {
            return this.isTileBarrier(Math.floor(this.row) + 1, Math.floor(this.col));
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


    // --------------------------------Check Packages -----------------------------------------

    isTilePackage(row, col) {
        return streetMap.map[row][col] === TILE_TYPE_PACKAGE;
    }

    isPackageinPath() {
        if (this.direction == EAST_DIRECTION) {

            return this.isTilePackage(Math.floor(this.row), Math.floor(this.col));
        }
        if (this.direction == WEST_DIRECTION) {

            return this.isTilePackage(Math.floor(this.row), Math.floor(this.col));
        }
        if (this.direction == NORTH_DIRECTION) {

            return this.isTilePackage(Math.floor(this.row), Math.floor(this.col));

        }
        if (this.direction == SOUTH_DIRECTION) {

            return this.isTilePackage(Math.floor(this.row), Math.floor(this.col));
        }
    }

    checkPackages() {
        if (this.isPackageinPath()) {
            console.log(streetMap.map, this.row,this.col);
            streetMap.map[Math.floor(this.row)][Math.floor(this.col)] = TILE_TYPE_STREET;
            this.packagesDelivered += 1;
            this.fuelMoney += 10;
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
        this.checkPackages();

        this.fuelMoney -= this.velocity;

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