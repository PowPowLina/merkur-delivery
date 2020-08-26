class StreetMap {
    constructor() {
        this.stationsPos = [0,0];
        
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

        this.possiblePackages = [
            [new Package(7,2),new Package(1,13)],
            [new Package(3,9),new Package(6,5)]
        ];
    }


    getStationPos() {
        let posStationArr = [];
        for (let i = 0; i < this.map.length; i++) {
            if (this.map[i].indexOf(3) >= 0) {
                posStationArr.push(i, this.map[i].indexOf(3));
            }
            return posStationArr;
        }

    }

    preload() {
        this.streetImage = loadImage('./assets/genericstreet.png');
        this.wallImage = loadImage('./assets/genericbuilding.png');
        this.stationImage = loadImage('./assets/merkurStationTile.png');
        this.defaultImage = loadImage('./assets/nopic.png');
        this.packageImage = loadImage('./assets/package.png');
    }


    setup() {
        //const randomIndex = Math.floor(Math.random() * this.possibleMaps.length);
        const randomIndex = Math.floor(Math.random() * this.possibleMaps.length);
        this.map = this.possibleMaps[randomIndex];

        this.stationPos = this.getStationPos(); 

        this.possiblePackages[randomIndex].forEach(function (myPackage) {
            myPackage.reset();
        });

        this.packages = this.possiblePackages[randomIndex];
    }

    getPackageOnTile(row, col) {
        for(let i = 0; i < this.packages.length; i++) {
            if(this.packages[i].isHere(row, col)) {
                return this.packages[i];
            }
        }
        return null;
    }

    isAllPackagesGone() {
        for(let i = 0; i < this.packages.length; i++) {
            if(this.packages[i].isVisible) {
                return false;
            }
        }
        return true;
    }

    reset() {
        this.setup();
    }

    drawTile(tile, col, row) {
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
                break;
            case TILE_TYPE_PACKAGE:
                tileImage = this.packageImage;
                break;

        }
        image(tileImage, col * TILE_SIZE, row * TILE_SIZE, TILE_SIZE, TILE_SIZE);
    }

    draw() {
        for (let i = 0; i < this.map.length; i++) {
            const row = this.map[i];
            for (let j = 0; j < row.length; j++) {
                let tile = row[j];
                this.drawTile(tile, j, i);
            }
        }

        const packageImage = this.packageImage;
        // draw packages
        this.packages.forEach( function (myPackage) {
            myPackage.draw(packageImage);
        });
    }


}