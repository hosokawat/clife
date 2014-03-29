CANVAS = document.getElementById('lifegame').getContext('2d');
SIZE = 5;
CANVAS_WIDTH = parseInt(document.getElementById('lifegame').width / SIZE);

CANVAS_HEIGHT = parseInt(document.getElementById('lifegame').height / SIZE);

(function () {

    function Cell(r, g, b, enable) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.enable = enable; //int 0 or 1
        this.addColor = function (cell) {
            if (cell.enable === 0) return;
            this.r = parseInt((this.r + cell.r));
            this.g = parseInt((this.g + cell.g));
            this.b = parseInt((this.b + cell.b));
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
                nCell.r = parseInt(nCell.r / cnt);
                nCell.g = parseInt(nCell.g / cnt);
                nCell.b = parseInt(nCell.b / cnt);
            } else if ((cnt === 2 || cnt === 3) & this.enable == 1) {
                nCell.enable = 1;

                nCell.r = parseInt(nCell.r / cnt);
                nCell.g = parseInt(nCell.g / cnt);
                nCell.b = parseInt(nCell.b / cnt);

            } else {
                nCell.enable = 0;
                nCell.reset();
            }

            return nCell;
        };
    }

    function random(max) {
        return parseInt(Math.random() * max);
    }

    function randomBoolean(percent) {
        return (percent >= Math.random() ? 1 : 0);
    }


    function tpl_DH(cellMap, x, y) {
        tplCell = new Cell(random(50), random(50) + 200, random(50) + 200, 1);

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
        switch (random(3)) {
            case 0:
                return new Cell(100 + random(125), random(50), 100 + random(125), 1);
            case 1:
                return new Cell(random(50), 100 + random(125), 100 + random(125), 1);
            case 2:
                return new Cell(100 + random(125), 100 + random(125), random(50), 1);
        }
    }

    function tpl_create(cellMap, x, y) {
        switch (random(3)) {
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

        if (randomBoolean(0.1)) {
            tpl_create(cellMap, random(100), random(100));
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

        var x, y;
        CANVAS.beginPath();
        for (x = 0; x < cellMap[0].length; x++) {
            for (y = 0; y < cellMap.length; y++) {
                if (cellMap[x][y].enable == 1) {
                    CANVAS.fillStyle = 'rgb(' + cellMap[x][y].r + ', ' + cellMap[x][y].g + ', ' + cellMap[x][y].b + ')';
                    CANVAS.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
                } else {
                    CANVAS.fillStyle = 'rgb(0, 0, 0)';
                    CANVAS.fillRect(x * SIZE, y * SIZE, SIZE, SIZE);
                }
            }
        }
    }
    var cellMap = [];
    var x, y;
    for (x = 0; x <= CANVAS_HEIGHT; x++) {
        var cellLine = [];
        for (y = 0; y <= CANVAS_HEIGHT; y++) {
            cellLine.push(new Cell(random(255), random(255), random(255), 0));
        }
        cellMap.push(cellLine);
    }
    tpl_ST(cellMap, random(100), random(100));
    main(cellMap);
})();
