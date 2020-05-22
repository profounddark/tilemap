export class TileView {
    constructor(canvasID) {
        let tempCanvas = null;
        if (canvasID) {
            tempCanvas = document.getElementById(canvasID);
        }
        if (tempCanvas) {
            this._canvas = tempCanvas;
            this._ctx = tempCanvas.getContext('2d');
        }
        else {
            let body = document.querySelector('body');
            let newCanvas = document.createElement('canvas');
            if (canvasID) newCanvas.id = canvasID;
            body.appendChild(newCanvas);
            this._canvas = newCanvas;
            this._ctx = newCanvas.getContext('2d');
        }

    }

    setTileParams(tilesWide, tilesTall, tileSize) {
        this._tileSize = tileSize;
        this._tileHeight = tilesTall;
        this._tileWidth = tilesWide;

        this._canvas.width = this._tileSize * this._tileWidth;
        this._canvas.height = this._tileSize * this._tileHeight;

    }

    set tilemap(newTiles) {
        this._tilemap = newTiles;
    }

    // method for drawing around a center square
    drawAround(map, ctrX, ctrY) {
        
        let xStart = ctrX - Math.floor(this._tileWidth / 2);
        let yStart = ctrY - Math.floor(this._tileHeight / 2);

        for (let y = 0; y < this._tileHeight; y++) {
            for (let x = 0; x < this._tileWidth; x++) {
                for (let layer = 0; layer < map.layers; layer++) {
                    let symb = map.getTile(xStart + x, yStart + y, layer);
                    this._tilemap.drawTile(this._ctx, map.getTile(xStart + x, yStart + y, layer), x * this._tileSize, y * this._tileSize);
                }
            }
        }
    }

}