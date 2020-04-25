import { baseMap } from './map.js';

class Tile {
    constructor(sheet, x, y, size) {
        // x and y are spots on the spritesheet (not pixels)
        this.tileSheet = sheet;
        this.sX = x*size;
        this.sY = y*size;
        this.tileSize = size;
    }
    drawTile(ctx, x, y) {
        ctx.drawImage(
            // source tile sheet
            this.tileSheet,
            // source x, y
            this.sX,
            this.sY,
            // source width, height
            this.tileSize,
            this.tileSize,
            // destination x, y
            x,
            y,
            // destination width, height
            this.tileSize,
            this.tileSize
        );
    }
}

class TileMap {
    constructor(size) {
        this.tiles = {};
        this.tileSize = size;
    }
    addTile(code, sheet, x, y) {
        let newTile = new Tile(sheet, x, y, this.tileSize);
        this.tiles[code] = newTile;
    }
}


/*
let baseMap = [
    'grass1',   'grass2',   'grass1',   'grass1',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grass2',   'grass2',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grass1',   'grass2',   'grass1',   'grass1',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grass1',   'grass2',   'grass1',   'grass1',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grass1',   'grass2',   'grass1',   'grass1',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grass1',   'grass2',   'grass1',   'grass1',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grass1',   'grass2',   'grass1',   'grass2',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grwa01',   'grwa02',   'grwa03',   'grass1',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grwa04',   'water1',   'grwa06',   'grass2',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grwa04',   'water2',   'grwa06',   'grass1',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grwa04',   'water2',   'grwa06',   'grass1',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grwa04',   'water2',   'grwa06',   'grass1',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grwa04',   'water2',   'grwa06',   'grass1',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
    'grwa04',   'water2',   'grwa06',   'grass1',   'grass1',   'grass2',   'grass2',   'grass1',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',   'grass2',
]
*/

const myTiles = new TileMap(16);
const mapWidth = 14;
const mapHeight = 14;
let xOffset = 1;
let yOffset = 1;

function drawMap(ctx) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {

            let tile = baseMap[(yOffset + j)*mapWidth + xOffset + i];
            myTiles.tiles[tile].drawTile(ctx, i * 16, j*16);
        }
    }
}

let myCTX;

window.addEventListener("load", function () {
    let spriteSheet = document.getElementById("sprites");
    myTiles.addTile('grass1', spriteSheet, 0, 0);
    myTiles.addTile('grass2', spriteSheet, 1, 0);
    myTiles.addTile('water1', spriteSheet, 2, 0);
    myTiles.addTile('water2', spriteSheet, 3, 0);

    myTiles.addTile('grwa01', spriteSheet, 0, 1);
    myTiles.addTile('grwa02', spriteSheet, 1, 1);
    myTiles.addTile('grwa03', spriteSheet, 2, 1);
    myTiles.addTile('grwa04', spriteSheet, 3, 1);
    myTiles.addTile('grwa06', spriteSheet, 5, 1);

    myTiles.addTile(5, spriteSheet, 3, 2);
    myCTX = document.getElementById("maincanvas").getContext('2d');

    drawMap(myCTX);

});
