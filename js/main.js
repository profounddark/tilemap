import { baseMap } from './map.js';
import { Keyboard } from './controller.js';
import { TileMap } from './tilemap.js';
import { Actor } from './creatures.js';

let mainKeyboard = new Keyboard;


let mainPlayer = new Actor(8, 8, baseMap);
mainKeyboard.setCommand(mainKeyboard.LEFT, mainPlayer.moveWest, mainPlayer);
mainKeyboard.setCommand(mainKeyboard.UP, mainPlayer.moveNorth, mainPlayer);
mainKeyboard.setCommand(mainKeyboard.RIGHT, mainPlayer.moveEast, mainPlayer);
mainKeyboard.setCommand(mainKeyboard.DOWN, mainPlayer.moveSouth, mainPlayer);


mainKeyboard.listenForEvents([mainKeyboard.UP, mainKeyboard.DOWN, mainKeyboard.LEFT, mainKeyboard.RIGHT]);


const mainTiles = new TileMap(16);
baseMap.setTileMap(mainTiles);


function drawMap() {
    
    for (let screenX = 0; screenX < 13  ; screenX++) {
        for (let screenY = 0; screenY < 13; screenY++) {
            let mapY = (baseMap.width + mainPlayer.y - 6 + screenY) % baseMap.width;
            let mapX = (baseMap.width + mainPlayer.x - 6 + screenX) % baseMap.width;
            let tile = baseMap.map[mapY * baseMap.width + mapX];
            mainTiles.drawTile(myCTX, tile, screenX * mainTiles.tileSize, screenY * mainTiles.tileSize);
        }
    }
    mainTiles.drawTile(myCTX, 'hero', 6*mainTiles.tileSize, 6*mainTiles.tileSize);
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
    mainTiles.addStaticTile(201, 0, 2, false);
    mainTiles.addStaticTile(202, 1, 2, false);

    mainTiles.addAnimatedTile('hero', [{x:0, y:4}, {x:1, y:4}, {x:2, y:4}, {x:3, y:4}], false, 100);

    console.log(mainTiles);

    myCTX = document.getElementById("maincanvas").getContext('2d');
    mainTiles._lastTick = performance.now();
    window.requestAnimationFrame(gameTick);


});
