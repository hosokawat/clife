
(function () {
var CANVAS = document.getElementById('lifegame').getContext('2d');
var SIZE = 5;
var CANVAS_WIDTH = Math.floor(document.getElementById('lifegame').width / SIZE);
var CANVAS_HEIGHT = Math.floor(document.getElementById('lifegame').height / SIZE);

    function Cell(r, g, b, enable) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.enable = enable; //int 0 or 1
        this.addColor = function (cell) {
            if (cell.enable === 0) return;
            this.r = Math.floor(this.r + cell.r);
            this.g = Math.floor(this.g + cell.g);
            this.b = Math.floor(this.b + cell.b);
        };
        this.clone = function (cell) {
            this.enable = cell.enable;
            this.r = cell.r;
            this.g = cell.g;
            this.b = cell.b;
        };
        this.reset = function () {
            this.enable = 0;
            this.r = 0;
            this.g = 0;
            this.b = 0;
        };
        this.nextCell = function (map, x, y) {
            var cnt = 0;
            nCell = new Cell(0, 0, 0, 0);
            if (x > 0 & y > 0) {
                cnt += map[x - 1][y - 1].enable;
                nCell.addColor(map[x - 1][y - 1]);
            }
            if (x > 0) {
                cnt += map[x - 1][y].enable;
                nCell.addColor(map[x - 1][y]);
            }
            if (x > 0 & y < map.length - 1) {
                cnt += map[x - 1][y + 1].enable;
                nCell.addColor(map[x - 1][y + 1]);
            }
            if (y > 0) {
                cnt += map[x][y - 1].enable;
                nCell.addColor(map[x][y - 1]);
            }
            if (y < map.length - 1) {
                cnt += map[x][y + 1].enable;
                nCell.addColor(map[x][y + 1]);
            }
            if (x < map[0].length - 1 & y > 0) {
                cnt += map[x + 1][y - 1].enable;
                nCell.addColor(map[x + 1][y - 1]);
            }
            if (x < map[0].length - 1) {
                cnt += map[x + 1][y].enable;
                nCell.addColor(map[x + 1][y]);
            }
            if (x < map[0].length - 1 & y < map.length - 1) {
                cnt += map[x + 1][y + 1].enable;
                nCell.addColor(map[x + 1][y + 1]);
            }
            if (this.enable === 0 & cnt === 3) {
                nCell.enable = 1;
                nCell.r = Math.floor(nCell.r / cnt);
                nCell.g = Math.floor(nCell.g / cnt);
                nCell.b = Math.floor(nCell.b / cnt);
            } else if ((cnt === 2 || cnt === 3) & this.enable == 1) {
                nCell.enable = 1;

                nCell.r = Math.floor(nCell.r / cnt);
                nCell.g = Math.floor(nCell.g / cnt);
                nCell.b = Math.floor(nCell.b / cnt);

            } else {
                nCell.enable = 0;
                nCell.reset();
            }

            return nCell;
        };
    }

    Math.randomRange = function (max,min) {
        var _min = min === undefined ? 0 : min;
        return Math.floor(Math.random() * (max - _min)) + _min;
    };

    
    Boolean.random = function (percent) {
        return percent >= Math.random();
    };


    function tpl_DH(cellMap, x, y) {
        tplCell = new Cell(Math.randomRange(50), Math.randomRange(250,200), Math.randomRange(250,200), 1);

        if (cellMap[0].length < x + 10 || cellMap.length < y + 5) {
            return;
        }
        cellMap[x + 7][y + 1].clone(tplCell);
        cellMap[x + 1][y + 2].clone(tplCell);
        cellMap[x + 2][y + 2].clone(tplCell);
        cellMap[x + 2][y + 3].clone(tplCell);
        cellMap[x + 6][y + 3].clone(tplCell);
        cellMap[x + 7][y + 3].clone(tplCell);
        cellMap[x + 8][y + 3].clone(tplCell);
    }

    function tpl_Cell() {
        var color = Math.randomRange(3);
        return new Cell(
            Math.randomRange(color !== 0 ? 225 : 50  ,color !== 0 ? 100 : 0), 
            Math.randomRange(color !== 1 ? 225 : 50  ,color !== 1 ? 100 : 0), 
            Math.randomRange(color !== 2 ? 225 : 50  ,color !== 2 ? 100 : 0),
        1);
    }

    function tpl_create(cellMap, x, y) {
        switch (Math.randomRange(3)) {
            case 0:
                tpl_DN(cellMap, x, y);
                break;
            case 1:
                tpl_DN(cellMap, x, y);
                break;
            case 0:
                tpl_ST(cellMap, x, y);
                break;
        }
    }

    function tpl_DN(cellMap, x, y) {
        tplCell = tpl_Cell();

        if (cellMap[0].length < x + 7 || cellMap.length < y + 3) {
            return;
        }
        cellMap[x + 1][y].clone(tplCell);
        cellMap[x + 3][y + 1].clone(tplCell);
        cellMap[x][y + 2].clone(tplCell);
        cellMap[x + 1][y + 2].clone(tplCell);

        cellMap[x + 4][y + 2].clone(tplCell);
        cellMap[x + 5][y + 2].clone(tplCell);
        cellMap[x + 6][y + 2].clone(tplCell);
    }

    function tpl_RC(cellMap, x, y) {
        tplCell = tpl_Cell();

        if (cellMap[0].length < x + 7 || cellMap.length < y + 3) {
            return;
        }
        cellMap[x][y].clone(tplCell);
        cellMap[x][y + 1].clone(tplCell);
        cellMap[x + 1][y].clone(tplCell);
        cellMap[x + 1][y + 1].clone(tplCell);
    }

    function tpl_ST(cellMap, x, y) {
        tplCell = tpl_Cell();

        if (cellMap[0].length < x + 7 || cellMap.length < y + 3) {
            return;
        }
        cellMap[x + 1][y].clone(tplCell);
        cellMap[x + 3][y + 1].clone(tplCell);
        cellMap[x][y + 2].clone(tplCell);
        cellMap[x + 1][y + 2].clone(tplCell);
        cellMap[x + 4][y + 2].clone(tplCell);
        cellMap[x + 1][y + 1].clone(tplCell);
        cellMap[x + 5][y + 2].clone(tplCell);
        cellMap[x + 6][y + 2].clone(tplCell);

    }

    function main(cellMap) {
        draw(cellMap);
        cellMap = run(cellMap);

        if (Boolean.random(0.1)) {
            tpl_create(cellMap, Math.randomRange(100), Math.randomRange(100));
        }
        setTimeout(function () {
            main(cellMap);
        }, 50);
    }

    function run(cellMap) {
        nCellMap = [];
        var x, y;
        for (x = 0; x < cellMap[0].length; x++) {
            nCellLine = [];
            for (y = 0; y < cellMap.length; y++) {
                nCellLine.push(cellMap[x][y].nextCell(cellMap, x, y));
            }
            nCellMap.push(nCellLine);
        }
        return nCellMap;
    }

    function draw(cellMap) {
        function fillstyle_tpl(r,g,b) {
          return  'rgb(' + [r,g,b].join(',') + ')';
        }

        var x, y;
        CANVAS.beginPath();
        for (x = 0; x < cellMap[0].length; x++) {
            for (y = 0; y < cellMap.length; y++) {
                if (cellMap[x][y].enable == 1) {
                    CANVAS.fillStyle = fillstyle_tpl(cellMap[x][y].r,cellMap[x][y].g , cellMap[x][y].b);
                } else {
                    CANVAS.fillStyle = fillstyle_tpl(0, 0, 0);
                }
                CANVAS.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
            }
        }
    }
    var cellMap = [];
    var x, y;
    for (x = 0; x <= CANVAS_HEIGHT; x++) {
        var cellLine = [];
        for (y = 0; y <= CANVAS_HEIGHT; y++) {
            cellLine.push(new Cell(Math.randomRange(255), Math.randomRange(255), Math.randomRange(255), 0));
        }
        cellMap.push(cellLine);
    }
    tpl_ST(cellMap, Math.randomRange(100), Math.randomRange(100));
    main(cellMap);
})();
