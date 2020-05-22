class Tile {
    constructor(size, passible, craft) {
        this.tileSize = size;
        this._passible = passible;
        this._craft = craft;

    }

    draw() {

    }
    animate() {
    }

    passible(terrain) {
        return this._passible==terrain;
    }

    isCraft(type) {
        return (this._craft == type);
    }
}

class StaticTile extends Tile {
    constructor(x, y, size, passible, craft = null) {
        super(size, passible, craft);
        // x and y are spots on the spritesheet (not pixels)
        this.sX = x * size;
        this.sY = y * size;
    }
    draw(ctx, sheet, x, y) {
        ctx.drawImage(
            // source tile sheet
            sheet,
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

class TextureTile extends Tile {
    constructor(xyArr, size, passible, craft=null) {
        super(size, passible, craft);
        // x and y are spots on the spritesheet (not pixels)
        this._frameArr = [];
        for (let i = 0; i < xyArr.length; i++) {
            this._frameArr[i] = { sX: xyArr[i].x * size, sY: xyArr[i].y * size };
        }
    }
    draw(ctx, sheet, x, y) {
        // this doesn't work quite right
        // it should be based on the actual X, Y on the map, not the X, Y in the window
        let whichTile = (x / this.tileSize + y / this.tileSize) % this._frameArr.length;
        ctx.drawImage(
            // source tile sheet
            sheet,
            // source x, y
            this._frameArr[whichTile].sX,
            this._frameArr[whichTile].sY,
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

class AnimatedTile extends Tile {
    constructor(xyArr, size, passible, frameRate, craft=null) {
        super(size, passible, craft);
        this._frameArr = [];
        for (let i = 0; i < xyArr.length; i++) {
            this._frameArr[i] = { sX: xyArr[i].x * size, sY: xyArr[i].y * size };
        }
        this._frameRate = frameRate;
        this._currentFrame = 0;
        this._ticks = 0;
    }
    animate(delta) {
        this._ticks += delta;
        if (this._ticks > this._frameRate) {
            this._currentFrame = (this._currentFrame + 1) % this._frameArr.length;
            this._ticks =- this._frameRate;
        }
    }
    draw(ctx, sheet, x, y) {
        ctx.drawImage(
            // source tile sheet
            sheet,
            // source x, y
            this._frameArr[this._currentFrame].sX,
            this._frameArr[this._currentFrame].sY,
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
    constructor(size, sheet = null) {
        this.tiles = {};
        this.spriteSheet = sheet;
        this.tileSize = size;
        this._lastTick = null;
    }
    addStaticTile(code, x, y, passible, craft) {
        let newTile = new StaticTile(x, y, this.tileSize, passible, craft);
        this.tiles[code] = newTile;
    }
    addTextureTile(code, xyArr, passible, craft) {
        let newTile = new TextureTile(xyArr, this.tileSize, passible, craft);
        this.tiles[code] = newTile;
    }
    addAnimatedTile(code, xyArr, passible, frameRate = 500, craft) {
        let newTile = new AnimatedTile(xyArr, this.tileSize, passible, frameRate, craft);
        this.tiles[code] = newTile;
    }
    drawTile(ctx, code, x, y) {
        this.tiles[code].draw(ctx, this.spriteSheet, x, y);
    }
    setDelta(newTime) {
        let delta = newTime - this._lastTick;
        this._lastTick = newTime;
        for (let tile in this.tiles) {
            this.tiles[tile].animate(delta);
        }
    }
    isPassible(code, terrain) {
        return this.tiles[code].passible(terrain);
    }

    isCraft(code, type) {
        
        if (code) return this.tiles[code].isCraft(type);
        return false;
    }
}

const mainTiles = new TileMap(16);

window.addEventListener("load", function () {
    let spriteSheet = document.getElementById("sprites");
    mainTiles.spriteSheet = spriteSheet;

    
    mainTiles.addTextureTile(1, [{x:0, y:0}, {x:1, y:0}], 'land');

    mainTiles.addStaticTile(11, 5, 0, 'water');
    mainTiles.addStaticTile(12, 6, 0, 'water');
    mainTiles.addStaticTile(13, 7, 0, 'water');
    mainTiles.addStaticTile(14, 8, 0, 'water');

    mainTiles.addAnimatedTile(50, [{x:2, y:0}, {x:3, y:0}], 'water', 500);
    mainTiles.addAnimatedTile(51, [{x:3, y:0}, {x:2, y:0}], 'water', 500);

    mainTiles.addStaticTile(52, 0, 1, 'water');
    mainTiles.addStaticTile(53, 1, 1, 'water');
    mainTiles.addStaticTile(54, 2, 1, 'water');
    mainTiles.addStaticTile(55, 3, 1, 'water');
    mainTiles.addStaticTile(56, 4, 1, 'water');
    mainTiles.addStaticTile(57, 5, 1, 'water');
    mainTiles.addStaticTile(58, 6, 1, 'water');
    mainTiles.addStaticTile(59, 7, 1, 'water');
 
    mainTiles.addAnimatedTile(101, [{x:6, y: 2}, {x:7, y:2}, {x:8, y:2}, {x:9, y:2}], false, 100);

    mainTiles.addStaticTile(111, 4, 2, 'land');
    mainTiles.addStaticTile(112, 4, 3, 'land');
    mainTiles.addStaticTile(113, 4, 4, 'land');
    mainTiles.addStaticTile(121, 3, 3, 'land', 'boat');
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

});

export { mainTiles }