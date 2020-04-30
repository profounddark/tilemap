import { baseMap } from './map.js';
import { Keyboard } from './controller.js';
import { mainTiles } from './tilemap.js';
import { Player } from './creatures.js';

let mainKeyboard = new Keyboard;


let mainPlayer = new Player(8, 8, baseMap, 900);
mainKeyboard.setCommand(mainKeyboard.LEFT, mainPlayer.moveWest, mainPlayer);
mainKeyboard.setCommand(mainKeyboard.UP, mainPlayer.moveNorth, mainPlayer);
mainKeyboard.setCommand(mainKeyboard.RIGHT, mainPlayer.moveEast, mainPlayer);
mainKeyboard.setCommand(mainKeyboard.DOWN, mainPlayer.moveSouth, mainPlayer);
mainKeyboard.setCommand(mainKeyboard.B, mainPlayer.toggleBoat, mainPlayer);


mainKeyboard.listenForEvents([mainKeyboard.UP, mainKeyboard.DOWN, mainKeyboard.LEFT, mainKeyboard.RIGHT, mainKeyboard.B]);


// const mainTiles = new TileMap(16);



function drawMap() {
    
    for (let screenX = 0; screenX < 19; screenX++) {
        for (let screenY = 0; screenY < 13; screenY++) {
            let mapY = (baseMap.width + mainPlayer.y - 6 + screenY) % baseMap.width;
            let mapX = (baseMap.width + mainPlayer.x - 9 + screenX) % baseMap.width;
            for (let layer = 0; layer < 2; layer++) {
                let tile = baseMap.map[layer][mapY * baseMap.width + mapX];
                if (tile) mainTiles.drawTile(myCTX, tile, screenX * mainTiles.tileSize, screenY * mainTiles.tileSize);
            }
            
        }
    }
    mainTiles.drawTile(myCTX, mainPlayer.tile, 9*mainTiles.tileSize, 6*mainTiles.tileSize);
}

function gameTick(elapsed) {
    mainTiles.setDelta(elapsed);
    drawMap();
    window.requestAnimationFrame(gameTick);

}

let myCTX;

window.addEventListener("load", function () {

    baseMap.setTileMap(mainTiles);
    myCTX = document.getElementById("maincanvas").getContext('2d');
    mainTiles._lastTick = performance.now();
    window.requestAnimationFrame(gameTick);


});
