class Package {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.isVisible = true;
    }

    pickUp() {
        this.isVisible = false;
    }

    reset() {
        this.isVisible = true;
    }

    isHere(row, col) {
        return this.row == row && this.col == col && this.isVisible;
    }

    draw(packageImage) {
        push();
        if(this.isVisible) {
            image(packageImage, this.col * TILE_SIZE, this.row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
        pop();
    }
}