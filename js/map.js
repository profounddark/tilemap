class Map {
    constructor(width) {
        this.width = width;
        this.depth = 2;
        this._itemLayer = 1;
        this.map = [];
        this._tileMap = null;
    }

    setTileMap(tileMap) {
        this._tileMap = tileMap;
    }

    isCraft(x, y, type) {
        let code = this.map[this._itemLayer][y * this.width + x];
        return this._tileMap.isCraft(code, type);
    }

    addItem(x, y, tile) {
        this.map[this._itemLayer][y * this.width + x] = tile;
    }

    clearItem(x, y) {
        let code = this.map[this._itemLayer][y * this.width + x];
        this.map[this._itemLayer][y * this.width + x] = 0;
        return code;
    }

    isPassible(x, y, terrain) {
        /* note to self: need to figure out a better way to handle this whole thing */
        if (terrain == 'land') {
            for (let layer = this.depth - 1; layer >= 0; layer--){
                let code = this.map[layer][y * this.width + x];
                if (code) return this._tileMap.isPassible(code, terrain);
            }
        }
        else if (terrain == 'water') {
            let pass = this._tileMap.isPassible(this.map[0][y * this.width + x], terrain);
            for (let layer = 1; layer < this.depth; layer++){
                let code = this.map[layer][y * this.width + x];
                if (code) pass = pass && this._tileMap.isPassible(code, terrain);
            }
            return pass;
        }
 
        
    }

    
}
let baseMap = new Map(20);
baseMap.map = [
    [
      2,   2,   1,   1,   2,   1,   2,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   1,
      2,   1,   2,   2,   1,   2,   1,   1,   2,   2,   2,   1,   1,   2,   1,   2,   1,   2,   1,   2,
      1,   2,   1,   1,   1,   2,   2,   1,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,   2,   1,
      1,   2,   1,   1,   1,   2,   2,   1,   1,   2,   1,   2,   2,   2,   1,   2,   1,   2,   2,   1,
      1,   2,   1,   1,   1,   2,   2,   1,   2,   2,   2,   1,   1,   2,   1,   2,   1,   2,   2,   1,
      1,   2,   1,   1,   1,   2,   2,   1,   2,   2,   2,   1,   2,   2,   1,   2,   1,   2,   1,   2,
      1,   2,   1,   2,   1,   2,   2,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   1,
      1,   1,   2,   1,   1,   1,   2,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   2,   1,
      2,  52,  53,  53,  53,  53,  54,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,
      1,  55,  50,  51,  50,  51,  56,   1,   2,   1,   2,   2,   2,   2,   1,   2,   1,   2,   2,   1,
     52,  14,  51,  50,  11,  58,  59,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,
     55,  51,  50,  51,  56,   2,   1,   2,   2,   1,   1,   2,   2,   2,   1,   2,   1,   2,   1,   1,
     55,  50,  51,  50,  56,   1,   2,   1,   1,   1,   2,   2,   2,   2,   1,   2,   1,   2,   2,   1,
     55,  50,  50,  51,  56,   2,   1,   1,   1,   1,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,
     55,  51,  51,  50,  13,  53,  54,   2,   1,   1,   2,   2,   2,   2,   1,   2,   1,   2,   1,   1,
     55,  50,  50,  51,  50,  51,  56,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   2,   1,
     55,  51,  51,  50,  51,  50,  56,   1,   2,   2,   2,   2,   2,   1,   1,   2,   1,   2,   1,   2,
     55,  50,  50,  51,  50,  51,  56,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,
     55,  50,  50,  51,  50,  51,  56,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,
     57,  58,  58,  58,  58,  58,  59,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2
    ],
    [
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 312, 302, 302, 302, 302, 302, 302, 302, 314,
      0,   0, 201,   0,   0,   0,   0,   0,   0,   0,   0, 315, 202,   0, 202,   0, 202,   0, 202, 315,
      0,   0,   0,   0,   0,   0,   0,   0, 201,   0,   0, 315,   0,   0,   0,   0,   0,   0,   0, 315,
      0,   0,   0,   0, 202,   0,   0,   0,   0,   0,   0, 315, 202,   0, 202,   0, 202,   0, 202, 315,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 315,   0,   0,   0,   0,   0,   0,   0, 315,
      0,   0,   0, 101,   0,   0,   0,   0,   0,   0,   0, 315, 202,   0, 202,   0, 202,   0, 202, 315,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0, 311, 302, 302, 303,   0, 301, 302, 302, 313,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0, 201,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0, 121, 111, 112, 112,   0, 101,   0,   0,   0,   0,   0,   0,   0,   0, 101,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,
      0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0,   0
    ]
];

export { baseMap }