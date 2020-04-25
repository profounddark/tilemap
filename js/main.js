import { baseMap } from './map.js';
import { Keyboard } from './controller.js';
import { TileMap } from './tilemap.js';
import { Player } from './creatures.js';

let mainKeyboard = new Keyboard;


let mainPlayer = new Player(8, 8, baseMap, 900);
mainKeyboard.setCommand(mainKeyboard.LEFT, mainPlayer.moveWest, mainPlayer);
mainKeyboard.setCommand(mainKeyboard.UP, mainPlayer.moveNorth, mainPlayer);
mainKeyboard.setCommand(mainKeyboard.RIGHT, mainPlayer.moveEast, mainPlayer);
mainKeyboard.setCommand(mainKeyboard.DOWN, mainPlayer.moveSouth, mainPlayer);
mainKeyboard.setCommand(mainKeyboard.B, mainPlayer.toggleBoat, mainPlayer);


mainKeyboard.listenForEvents([mainKeyboard.UP, mainKeyboard.DOWN, mainKeyboard.LEFT, mainKeyboard.RIGHT, mainKeyboard.B]);


const mainTiles = new TileMap(16);
baseMap.setTileMap(mainTiles);


function drawMap() {
    
    for (let screenX = 0; screenX < 13  ; screenX++) {
        for (let screenY = 0; screenY < 13; screenY++) {
            let mapY = (baseMap.width + mainPlayer.y - 6 + screenY) % baseMap.width;
            let mapX = (baseMap.width + mainPlayer.x - 6 + screenX) % baseMap.width;
            for (let layer = 0; layer < 2; layer++) {
                let tile = baseMap.map[layer][mapY * baseMap.width + mapX];
                if (tile) mainTiles.drawTile(myCTX, tile, screenX * mainTiles.tileSize, screenY * mainTiles.tileSize);
            }
            
        }
    }
    mainTiles.drawTile(myCTX, mainPlayer.tile, 6*mainTiles.tileSize, 6*mainTiles.tileSize);
}

function gameTick(elapsed) {
    mainTiles.setDelta(elapsed);
    drawMap();
    window.requestAnimationFrame(gameTick);

}

let myCTX;

window.addEventListener("load", function () {
    let spriteSheet = document.getElementById("sprites");
    mainTiles.spriteSheet = spriteSheet;

    mainTiles.addStaticTile(1, 0, 0);
    mainTiles.addStaticTile(2, 1, 0);

    mainTiles.addStaticTile(11, 5, 0, false);
    mainTiles.addStaticTile(12, 6, 0, false);
    mainTiles.addStaticTile(13, 7, 0, false);
    mainTiles.addStaticTile(14, 8, 0, false);

    mainTiles.addAnimatedTile(50, [{x:2, y:0}, {x:3, y:0}], false, 500);
    mainTiles.addAnimatedTile(51, [{x:3, y:0}, {x:2, y:0}], false, 500);

    mainTiles.addStaticTile(52, 0, 1, false);
    mainTiles.addStaticTile(53, 1, 1, false);
    mainTiles.addStaticTile(54, 2, 1, false);
    mainTiles.addStaticTile(55, 3, 1, false);
    mainTiles.addStaticTile(56, 4, 1, false);
    mainTiles.addStaticTile(57, 5, 1, false);
    mainTiles.addStaticTile(58, 6, 1, false);
    mainTiles.addStaticTile(59, 7, 1, false);
 
    mainTiles.addAnimatedTile(101, [{x:6, y: 2}, {x:7, y:2}, {x:8, y:2}, {x:9, y:2}], false, 100);

    mainTiles.addStaticTile(111, 4, 2, true);
    mainTiles.addStaticTile(112, 4, 3, true);
    mainTiles.addStaticTile(113, 4, 4, true);
    mainTiles.addStaticTile(121, 3, 3, true);
    mainTiles.addStaticTile(201, 0, 2, false);
    mainTiles.addStaticTile(202, 1, 2, false);

    mainTiles.addStaticTile(301, 7, 3, false);
    mainTiles.addStaticTile(302, 8, 3, false);
    mainTiles.addStaticTile(303, 9, 3, false);
    mainTiles.addStaticTile(311, 5, 3, false);
    mainTiles.addStaticTile(312, 5, 4, false);
    mainTiles.addStaticTile(313, 6, 3, false);
    mainTiles.addStaticTile(314, 6, 4, false);
    mainTiles.addStaticTile(315, 9, 4, false);

    mainTiles.addAnimatedTile(900, [{x:0, y:4}, {x:1, y:4}, {x:2, y:4}, {x:3, y:4}], false, 100);

    myCTX = document.getElementById("maincanvas").getContext('2d');
    mainTiles._lastTick = performance.now();
    window.requestAnimationFrame(gameTick);


});
