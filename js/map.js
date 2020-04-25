class Map {
    constructor(width) {
        this.width = width;
        this.map = [];
        this._tileMap = null;
    }

    setTileMap(tileMap) {
        this._tileMap = tileMap;
    }

    isPassible(x, y) {
        let code = this.map[y * this.width + x];
        return this._tileMap.isPassible(code);
    }

    
}
let baseMap = new Map(20);
baseMap.map = [
     55,  50,  51,  50,  51,  50,  56,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2, 202,   1,
     57,  58,  58,  58,  58,  58,  59,   1,   2,   2,   2, 201,   1,   2,   1,   2,   1,   2,   1,   2,
      1,   2, 201,   1,   1,   2,   2,   1,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,   2,   1,
      1,   2,   1,   1,   1,   2,   2,   1, 201,   2, 101,   2,   2,   2,   1,   2,   1,   2,   2,   1,
      1,   2,   1,   1, 202,   2,   2,   1,   2,   2,   2,   1, 202,   2,   1,   2,   1,   2,   2,   1,
      1,   2,   1,   1,   1,   2,   2,   1,   2,   2,   2,   1,   2,   2,   1,   2,   1,   2,   1,   2,
      1,   2,   1, 101,   1,   2,   2,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2, 201,   1,
     52,  53,  53,  53,  53,  53,  54,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   2,   1,
     55,  50,  51,  50,  51,  50,  56,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,
     55,  51,  50,  51,  50,  51,  56,   1,   2, 201,   2,   2,   2,   2,   1,   2,   1,   2,   2, 202,
     55,  50,  51,  50,  51,  50,  56,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,
     55,  51,  50,  51,  50,  51,  13,  53,  53,  54, 202,   2,   2,   2,   1,   2,   1,   2,   1,   1,
     55,  50,  51,  50,  51,  50,  51,  50,  51,  56,   2,   2,   2,   2,   1,   2,   1,   2,   2,   1,
     55,  50,  50,  51,  50,  51,  50,  51,  50,  56,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,
     55,  51,  51,  50,  51,  50,  11,  58,  58,  59,   2,   2,   2,   2,   1,   2,   1,   2, 201,   1,
     55,  50,  50,  51,  50,  51,  56,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   2,   1,
     55,  51,  51,  50,  51,  50,  56,   1,   2,   2,   2,   2,   2, 202,   1,   2,   1,   2,   1,   2,
     55,  50,  50,  51,  50,  51,  56,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,
     55,  50,  50,  51,  50,  51,  56,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2,
     55,  50,  50,  51,  50,  51,  56,   1,   2,   2,   2,   2,   2,   2,   1,   2,   1,   2,   1,   2
];

export { baseMap }