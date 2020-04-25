
class Tile {
    constructor(sheetX, sheetY, size) {
        this.sheetX = sheetX;
        this.sheetY = sheetY;
        this.size = size;
    }

}

class Viewport {
    constructor(canvas, xwide, ytall, tilesize) {
        this.canvasElement = canvas;

        // x tiles from 0 to xSize
        this.xSize = xwide;
        // y tiles from 0 to ySize
        this.ySize = ytall;
        this.tileSize = tilesize;

        this.canvasElement.height = ytall * tilesize;
        this.canvasElement.width = xtall * tilesize;

        this.context = this.canvasElement.getContext('2d');

    }

    

}

document.addEventListener('DOMContentLoaded', function(event) {
    let view = document.getElementById('maincanvas');
    let test = new Viewport(view, 400, 400);
});