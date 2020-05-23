export class Map {
    constructor() {
        this.height = null;
        this.width = null;
        this._tileMap;
        this._map = [];

        this._wrap = true;
        
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
            this._map.push(layer.data);
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

    get layers() {
        return this._map.length;
    }

    getTile(x, y, layer) {
        if (this._wrap) {
            // if the map wraps, wrap the map
            x = (x + this.width) % this.width;
            y = (y + this.height) % this.height;
        } else {
            // otherwise, it just repeats the last row/col
            x = Math.min(this.width - 1, Math.max(0, x));
            y = Math.min(this.height - 1, Math.max(0, y));
        }
        return this._map[layer][y * this.width + x];
    }

    isPassible(x, y, terrain) {
        /* note to self: need to figure out a better way to handle this whole thing */
        if (terrain == 'land') {
            for (let layer = this.depth - 1; layer >= 0; layer--) {
                let code = this._map[layer][y * this.width + x];
                if (code) return this._tileMap.isPassible(code, terrain);
            }
        }
        else if (terrain == 'water') {
            let pass = this._tileMap.isPassible(this.map[0][y * this.width + x], terrain);
            for (let layer = 1; layer < this.depth; layer++) {
                let code = this._map[layer][y * this.width + x];
                if (code) pass = pass && this._tileMap.isPassible(code, terrain);
            }
            return pass;
        }


    }


}
