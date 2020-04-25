class Tile {
    constructor(size, passible) {
        this.tileSize = size;
        this._passible = passible;
    }

    draw() {

    }
    animate() {
    }

    passible() {
        return this._passible;
    }
}

class StaticTile extends Tile {
    constructor(x, y, size, passible) {
        super(size, passible);
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

class AnimatedTile extends Tile {
    constructor(xyArr, size, passible, frameRate) {
        super(size, passible);
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
    addStaticTile(code, x, y, passible = true) {
        let newTile = new StaticTile(x, y, this.tileSize, passible);
        this.tiles[code] = newTile;
    }
    addAnimatedTile(code, xyArr, passible = true, frameRate = 500) {
        let newTile = new AnimatedTile(xyArr, this.tileSize, passible, frameRate);
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
    isPassible(code) {
        return this.tiles[code].passible();
    }
}

export { TileMap }