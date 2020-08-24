class Player {
    constructor(streetMap) {
        console.log(streetMap.positionArr);
        this.col = streetMap.positionArr[0]+1;
        this.row = streetMap.positionArr[1];
    }

    preload() {

    }

    setup() {

    }


    draw(img) {
        image(img, this.row * TILE_SIZE, this.col * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    move() {
    while (this.col < COLUMN_COUNT && this.row < ROW_COUNT) {
        this.col = this.col + 1;
    }
    }
}