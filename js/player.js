class Player {
    constructor(row, col) {
        this.row = row;
        this.col = col;
    }

    preload() {

    }

    setup() {

    }


    draw(img) {
        image(img, this.row * TILE_SIZE, this.col * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    move() {}
}