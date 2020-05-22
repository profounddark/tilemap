export class Map {
    constructor() {
        this.height = null;
        this.width = null;
        this._tileMap;
        this.map = [];
        
    }

    loadMap(fileName) {
        const loadPromise = fetch(fileName)
            .then(response => response.json())
            .then(data => {
                this.setupMap(data);
            });
        return loadPromise;
    }

    setupMap(data) {
        for (let layer of data.layers) {
            this.map.push(layer.data);
        }
        this.height = data.height;
        this.width = data.width;
    }

    setTileMap(tileMap) {
        this._tileMap = tileMap;
    }

    get ready() {
        if (this.height) { return true; }
        return false;
    }

    drawTile(ctx, layer, mapX, mapY, ctxX, ctxY) {
        let location = mapY * this.width + mapX;
        this._tileMap.drawTile(ctx, this.map[layer][location], ctxX, ctxY);
    }

    isPassible(x, y, terrain) {
        /* note to self: need to figure out a better way to handle this whole thing */
        if (terrain == 'land') {
            for (let layer = this.depth - 1; layer >= 0; layer--) {
                let code = this.map[layer][y * this.width + x];
                if (code) return this._tileMap.isPassible(code, terrain);
            }
        }
        else if (terrain == 'water') {
            let pass = this._tileMap.isPassible(this.map[0][y * this.width + x], terrain);
            for (let layer = 1; layer < this.depth; layer++) {
                let code = this.map[layer][y * this.width + x];
                if (code) pass = pass && this._tileMap.isPassible(code, terrain);
            }
            return pass;
        }


    }


}
