class Actor {
    constructor(startX, startY, map) {
        this._X = startX;
        this._Y = startY;
        this._currentMap = map;
        
    }

    get x() {
        return this._X;
    }

    get y() {
        return this._Y;
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

export { Actor }