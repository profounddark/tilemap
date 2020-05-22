import { TileMap } from './tilemap.js';
import { Map } from './map.js';

let ctx = null;
let mainTiles = new TileMap;
let mainMap = new Map();

function drawCanvas() {
    for (let layer = 0; layer < mainMap.map.length; layer++) {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                mainMap.drawTile(ctx, layer, x + 13, y + 13, mainTiles.tileSize * x, mainTiles.tileSize * y);
            }
        }
    }
}

function gameTick(elapsed) {
    mainTiles.setDelta(elapsed);
    drawCanvas();
    window.requestAnimationFrame(gameTick);
    
}

function startGame() {
    console.log('game start!');
    mainTiles._lastTick = performance.now();
    window.requestAnimationFrame(gameTick);
}

mainTiles.loadData('../gamedata/tilemap.json')
    .then(() => {
        console.log(mainTiles);
        if (mainMap.ready && ctx) {
            startGame();
        } else {
            console.log('mainTiles loaded, waiting...');
        }
    });
mainMap.loadMap('../gamedata/testmap.json')
    .then(() => {
        mainMap.setTileMap(mainTiles);
        if (mainTiles.ready && ctx) {
            startGame();
        } else {
            console.log('mainMap loaded, waiting...');
        }

    });

document.addEventListener('DOMContentLoaded', () => {
    ctx = document.getElementById('maincanvas').getContext('2d');
    if (mainTiles.ready && mainMap.ready) {
        startGame();
    } else {
        console.log('DOM Ready, waiting...');
    }
});