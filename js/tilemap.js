class Tile {
    constructor(passable) {
        this._passable = passable;
    }

    tick() {

    }

    get tileID() {

    }

    passable(terrain) {
        return this._passable == terrain;
    }

}

class StaticTile extends Tile {
    constructor(index, passable) {
        super(passable);
        this._tileIndex = index;
    }

    get tileID() {
        return this._tileIndex;
    }
}

class AnimatedTile extends Tile {
    constructor(animArr, passible) {
        super(passible);
        this._animArr = animArr;
        this._currentFrame = 0;
        this._ticks = 0;
    }

    get tileID() {
        return this._animArr[this._currentFrame].tileIndex;
    }

    tick(delta) {
        this._ticks += delta;
        if (this._ticks > this._animArr[this._currentFrame].frameRate) {
            this._ticks -= this._animArr[this._currentFrame].frameRate;
            this._currentFrame = (this._currentFrame + 1) % this._animArr.length;
        }
    }

}

export class TileMap {
    constructor() {
        this.tiles = {};
        this._spritesheet = null;

    }

    loadData(dataFile) {
        const loadPromise = fetch(dataFile)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setupTilemap(data);
                return (this.loadSpriteSheet(data.image));
            });

        return loadPromise;

    }

    setupTilemap(data) {
        if (data.tileheight == data.tilewidth) {
            this.tileSize = data.tileheight;
        } else {
            console.error("TileMap data failure.");
        }
        this.sheetWidth = data.imagewidth;
        this.sheetHeight = data.imageheight;
        for (let tile of data.tiles) {
            let tileProps = {};
            if (tile.properties) {
                for (let i = 0; i < tile.properties.length; i++) {
                    tileProps[tile.properties[i].name] = tile.properties[i].value;
                }
            } else {
                tileProps.passable = false;
            }
            if (tile.animation) {
                let animArr = [];
                for (let count = 0; count < tile.animation.length; count++) {
                    let temp = { tileIndex: tile.animation[count].tileid, frameRate: tile.animation[count].duration };
                    animArr.push(temp);
                }
                let newTile = new AnimatedTile(animArr, tileProps.passable);
                // the +1 is to account for the way Tiled makes map JSON files
                this.tiles[tile.id + 1] = newTile;
            } else {
                let newTile = new StaticTile(tile.id, tileProps.passable);
                // the +1 is to account for the way Tiled makes map JSON files
                this.tiles[tile.id + 1] = newTile;
            }
        }

    }

    loadSpriteSheet(fileName) {
        return new Promise((resolve, reject) => {
            let newImage = new Image(this.sheetWidth, this.sheetHeight);
            newImage.addEventListener('load', evt => {
                this._spritesheet = newImage;
                resolve(fileName);
            });
            newImage.addEventListener('error', evt => {
                reject(new Error(`Failed to load spritesheet: ${fileName}`));
            });
            newImage.src = fileName;
        });
    }

    drawTile(ctx, code, x, y) {
        if (code > 0) {
            let tileID = this.tiles[code].tileID;
            let sourceX = (tileID * this.tileSize) % this.sheetWidth;
            let sourceY = Math.floor((tileID * this.tileSize) / this.sheetWidth) * this.tileSize;
            ctx.drawImage(
                //source tile sheet
                this._spritesheet,
                //source x, y
                sourceX,
                sourceY,
                // source width, height
                this.tileSize,
                this.tileSize,
                // destination x,y
                x,
                y,
                // destination width, height
                this.tileSize,
                this.tileSize
            );
        }
    }

    setDelta(newTime) {
        let delta = newTime - this._lastTick;
        this._lastTick = newTime;
        for (let tile in this.tiles) {
            this.tiles[tile].tick(delta);
        }
    }

    get ready() {
        if (this._spritesheet) { return true; }
        return false;
    }

    isPassible(index, terrain) {
        return this.tiles[index].passable(terrain);
    }
}