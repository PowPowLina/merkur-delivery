class StreetMap {
    constructor() {
        this.possibleMaps = [
            [
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,1,1,2,1,2,1,1,1,2,1,2,1,1,1,2],
                [2,1,2,1,1,1,2,2,1,1,1,1,1,2,2,2],
                [2,1,1,2,2,1,1,1,2,1,2,1,2,1,1,2],
                [2,1,2,2,1,2,1,2,2,2,1,1,1,1,2,2],
                [2,1,2,1,1,1,1,1,2,1,1,2,1,2,1,2],
                [2,1,1,2,1,2,1,2,1,1,2,1,1,2,1,2],
                [2,2,1,1,1,1,1,1,1,2,2,2,1,1,1,2],
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
            ],
            [
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2],
                [2,1,1,1,1,1,1,2,1,2,1,2,2,1,2,2],
                [2,2,1,2,1,2,1,1,1,1,1,1,1,1,1,2],
                [2,1,1,1,1,1,2,1,2,1,2,1,2,1,2,2],
                [2,1,2,1,2,1,1,1,2,1,2,1,1,1,1,2],
                [2,1,2,1,2,1,2,1,1,1,1,1,2,2,1,2],
                [2,2,1,1,1,1,1,1,2,1,2,2,1,1,1,2],
                [2,2,2,1,2,1,2,1,1,1,1,1,1,2,1,2],
                [2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
            ]
        ];
    }
    preload() {
        this.streetImage = loadImage('/assets/genericstreet.png');
        this.wallImage = loadImage('/assets/genericbuilding.png');
        this.defaultImage = loadImage('/assets/nopic.png');
    }
   

    setup() {
        const randomIndex = Math.floor(Math.random()*this.possibleMaps.length);
        this.map = this.possibleMaps[randomIndex];
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