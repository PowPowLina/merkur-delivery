class StreetMap {
    constructor() {
        this.positionArr= [];
        this.stationCol = 0;
        this.possibleMaps = [
            [
                [2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 1, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 2],
                [2, 1, 2, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2],
                [2, 1, 1, 2, 2, 1, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2],
                [2, 1, 2, 2, 1, 2, 1, 2, 2, 2, 1, 1, 1, 1, 2, 2],
                [2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 2, 1, 2, 1, 2],
                [2, 1, 1, 2, 1, 2, 1, 2, 1, 1, 2, 1, 1, 2, 1, 2],
                [2, 2, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ],
            [
                [2, 3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 2, 1, 2, 2],
                [2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2],
                [2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 2],
                [2, 1, 2, 1, 2, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 2],
                [2, 1, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 2, 1, 2],
                [2, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 1, 1, 1, 2],
                [2, 2, 2, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 1, 2],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2]
            ]
        ];
    }


    getStationPos(map){
        let posStationArr = [];
        for (let i = 0; i < this.map.length; i++){
            console.log(i, map[i].indexOf(3));
          if(this.map[i].indexOf(3) >= 0){
            posStationArr.push(i, this.map[i].indexOf(3));
            row = posStationArr[0];
            col = posStationArr[1];
        }
        this.positionArr = posStationArr;
        console.log(this.positionArr);
            return posStationArr;
          }   
    
       }

    preload() {
        this.streetImage = loadImage('/assets/genericstreet.png');
        this.wallImage = loadImage('/assets/genericbuilding.png');
        this.stationImage = loadImage('/assets/merkurStationTile.png');
        this.defaultImage = loadImage('/assets/nopic.png');

    }


    setup() {
        const randomIndex = Math.floor(Math.random() * this.possibleMaps.length);
        this.map = this.possibleMaps[randomIndex];
        this.getStationPos(this.map);
    }

    drawTile(tile, row, col) {
        let tileImage = this.defaultImage;
        switch (tile) {
            case TILE_TYPE_STREET:
                tileImage = this.streetImage;
                break;
            case TILE_TYPE_WALL:
                tileImage = this.wallImage;
                break;
            case TILE_TYPE_STATION:
                tileImage = this.stationImage;

        }
        image(tileImage, row * TILE_SIZE, col * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    draw() {
        for (let i = 0; i < this.map.length; i++) {
            const row = this.map[i];
            for (let j = 0; j < row.length; j++) {
                let tile = row[j];
                this.drawTile(tile, j, i);
            }
        }
    }

   
}