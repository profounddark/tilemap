class Actor {
    constructor(startX, startY, map, tile) {
        this._X = startX;
        this._Y = startY;
        this._currentMap = map;

        this._primaryTile = tile;
        
    }

    get x() {
        return this._X;
    }

    get y() {
        return this._Y;
    }

    get tile() {
        return this._primaryTile;
    }

    _move(transX, transY) {
        let newX = (this._currentMap.width + this._X + transX) % this._currentMap.width;
        let newY = (this._currentMap.width + this._Y + transY) % this._currentMap.width;
        if (this._currentMap.isPassible(newX, newY)) {
            this._X = newX;
            this._Y = newY;
        }
    }

    moveWest() {
        this._move(-1, 0);
    }

    moveNorth() {
        this._move(0, -1);
    }
    moveEast() {
        this._move(1, 0);
    }
    moveSouth() {
        this._move(0, 1);    
    }
}

class Player extends Actor {
    constructor(startX, startY, map, tile) {
        super(startX, startY, map, tile);
        this._tempTile = null;
    }

    get tile() {
        if (this._tempTile) {
            return this._tempTile;
        }
        else {
            return this._primaryTile;
        }
    }

    toggleBoat() {
        if (!this._tempTile) {
            this._tempTile = 121;
        }
        else {
            this._tempTile = null;
        }
    }
}

export { Actor, Player }