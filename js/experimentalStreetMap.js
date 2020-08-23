class StreetMap {
    constructor() {

    }
    preload() {
        this.streetImage = loadImage('/assets/genericstreet.png');
        this.wallImage = loadImage('/assets/genericbuilding.png');
        this.defaultImage = loadImage('/assets/nopic.png');
    }

    randomTile(){
        return Math.floor(Math.random()*2); 
    }

    mapTileToMatrixTile(tile) {
        switch(tile) {
            case TILE_TYPE_STREET:
                return 0;
            case TILE_TYPE_WALL:
                return 1;
            default:
                console.warn('Unknown tile in tile mapper.');
                return 1;
        }
    }

    makeAllWalls() {
        const resultMap = [];
        for (let i = 0; i < ROW_COUNT; i++) {
            let resultRow = [];
            for (let j = 0; j < COLUMN_COUNT; j++){
                resultRow.push(TILE_TYPE_WALL);
            }
            resultMap.push(resultRow);
        }
        return resultMap; 
    }

    isCoordinateOnMapAndWall(tileCoordinates, map) {
        const row = tileCoordinates[0];
        const col = tileCoordinates[1];
        const isOnMap = (row >= 0 && row < ROW_COUNT) && (col >= 0 && col < COLUMN_COUNT);
        return isOnMap && this.mapTileToMatrixTile(map[row][col]) === 1;
    }

    getNeighborWalls(tileCoordinates, map) {
        let resultTiles = [];
        let col = tileCoordinates[0];
        let row = tileCoordinates[1];
        
        let left = [col, row-1];
        let right = [col, row+1];

        let top = [col-1, row];
        let bottom = [col+1, row];

        if(this.isCoordinateOnMapAndWall(left, map)) {
            resultTiles.push(left);
        }

        if(this.isCoordinateOnMapAndWall(top, map)) {
            resultTiles.push(top);
        }

        if(this.isCoordinateOnMapAndWall(right, map)) {
            resultTiles.push(right);
        }

        if(this.isCoordinateOnMapAndWall(bottom, map)) {
            resultTiles.push(bottom);
        }

        return resultTiles;
    }

    getNeighborStreets(tileCoordinates, map) {
        let resultTiles = [];
        let col = tileCoordinates[0];
        let row = tileCoordinates[1];
        
        let left = [col, row-1];
        let right = [col, row+1];

        let top = [col-1, row];
        let bottom = [col+1, row];

        if(this.isCoordinateOnMapAndStreet(left, map)) {
            resultTiles.push(left);
        }

        if(this.isCoordinateOnMapAndStreet(top, map)) {
            resultTiles.push(top);
        }

        if(this.isCoordinateOnMapAndStreet(right, map)) {
            resultTiles.push(right);
        }

        if(this.isCoordinateOnMapAndStreet(bottom, map)) {
            resultTiles.push(bottom);
        }

        return resultTiles;
    }

    isCoordinateOnMapAndStreet(tileCoordinates, map) {
        const row = tileCoordinates[0];
        const col = tileCoordinates[1];
        const isOnMap = (row >= 0 && row < ROW_COUNT) && (col >= 0 && col < COLUMN_COUNT);
        return isOnMap && this.mapTileToMatrixTile(map[row][col]) === 0;
    }

    isObsoleteTile(possiblyObsoleteTile, map) {
        let row = possiblyObsoleteTile[0];
        let col = possiblyObsoleteTile[1];

        // only obsolete if has no edge
        const edges = [];

        // 1 1 0 
        // 1 0 0 
        // 0 0 0 
        edges.push([[row-1, col], [row-1, col-1], [row, col-1]]);

        // 0 1 1 
        // 0 0 1 
        // 0 0 0 
        edges.push([[row, col+1], [row-1, col+1], [row-1, col]]);

        // 0 0 0 
        // 0 0 1 
        // 0 1 1 
        edges.push([[row+1, col], [row+1, col+1], [row, col+1] ]);

        // 0 0 0    
        // 1 0 0 
        // 1 1 0 
        edges.push([[row, col-1], [row+1, col-1], [row+1, col]]);
        
        const hasAnStreetEdge = edges.reduce((result, thisEdgeCoordinates) => {
            const thisEdgeResult = thisEdgeCoordinates.reduce((innerResult, curCoordinates) => {
                return innerResult && this.isCoordinateOnMapAndStreet(curCoordinates, map);
            }, true);
            return result || thisEdgeResult;
        }, false);

        // only obsolete if it has a connection to a street already

        const streetsAround = this.getNeighborStreets(possiblyObsoleteTile, map);

        return !hasAnStreetEdge && streetsAround.length>1 && Math.floor(Math.random()*2) === 1;
    }

    removeObsoleteTiles(map) {
        for (let i = 0; i < map.length; i++){
            const row = map[i];
            for (let j = 0; j < row.length; j++){
                if(this.isObsoleteTile([i,j], map)) {
                    map[i][j] = TILE_TYPE_STREET;
                }
            }
        }
    }

    generateMap() {
        const resultMap = this.makeAllWalls();

        const randomRow = Math.floor(Math.random() * ROW_COUNT);
        const randomCol = Math.floor(Math.random() * COLUMN_COUNT);
        const initialTile = [randomRow, randomCol];
        let possiblePaths = [];

        resultMap[randomRow][randomCol] = TILE_TYPE_STREET;

        possiblePaths = possiblePaths.concat(this.getNeighborWalls(initialTile, resultMap));

        let count = 0;
        while(possiblePaths.length > 0 && count < 180) {
            const randomPossiblePath = Math.floor(Math.random()*possiblePaths.length);
            const possiblePath = possiblePaths[randomPossiblePath];

            const neighbors = this.getNeighborWalls(possiblePath, resultMap);

            if(neighbors.length > 2) {
                resultMap[possiblePath[0]][possiblePath[1]] = TILE_TYPE_STREET;
                // add all new possible neighbors
                possiblePaths = possiblePaths.concat(neighbors);
            }

            // remove this path
            const index = possiblePaths.indexOf(possiblePath);
            possiblePaths.splice(index, 1);
            count++;
        }

        // remove more tiles that are obsolete
        this.removeObsoleteTiles(resultMap);

        return resultMap;
    }

    setup() {
        this.map = this.generateMap();
        // console.log(JSON.stringify(this.map));
    }

    drawTile(tile, row, col){
        let tileImage = this.defaultImage;
        switch(tile){
            case TILE_TYPE_STREET:
                tileImage = this.streetImage;
                break;
            case TILE_TYPE_WALL:
                tileImage = this.wallImage;
        }
        image(tileImage, row*TILE_SIZE, col*TILE_SIZE, TILE_SIZE, TILE_SIZE); 
    }



    draw() {
        for (let i = 0; i < this.map.length; i++){
            const row = this.map[i];
            for (let j = 0; j < row.length; j++){
                let tile = row[j];
                this.drawTile(tile,j,i); 
            }
        }
    }

}