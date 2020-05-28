import { TileMap } from './tilemap.js';
import { Map } from './map.js';
import { TileView } from './viewport.js';

let viewport = new TileView('maincanvas');
viewport.setTileParams(11, 11, 16);

let mainTiles = new TileMap;
let mainMap = new Map();

let x = 15, y = 15;

function testMove() {
    x = x + Math.floor(Math.random() * 2);
    y = y + Math.floor(Math.random() * 2);
    window.setTimeout(testMove, 1000);
}


function gameTick(elapsed) {
    mainTiles.setDelta(elapsed);
    viewport.drawAround(mainMap, x, y);
    window.requestAnimationFrame(gameTick);
    
}

function startGame() {
    console.log('game start!');
    mainTiles._lastTick = performance.now();
    window.requestAnimationFrame(gameTick);
    testMove();
}

mainTiles.loadData('./gamedata/tilemap.json')
    .then(() => {
        if (mainMap.ready && viewport) {
            startGame();
        } else {
            console.log('mainTiles loaded, waiting...');
        }
    });
mainMap.loadMap('./gamedata/testmap.json')
    .then(() => {
        viewport.tilemap = mainTiles;
        mainMap.setTileMap(mainTiles);
        if (mainTiles.ready && viewport) {
            startGame();
        } else {
            console.log('mainMap loaded, waiting...');
        }

    });
