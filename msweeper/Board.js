class Board {
    constructor(width, height, density) {
        this.width = width;
        this.height = height;
        this.density = density;
        this.flagged = 0;
        this.bombCount = 0;
        this.revealed = 0;
        this.cells = this.generateBoard(width, height);
        this.assignCounts();
    }
    assignCounts() {
        for(let i = 0; i < this.cells.length; i++) {
            let currentCell = this.cells[i];
            let x = currentCell.x;
            let y = currentCell.y;
            let count = 0;

            let topLeft = this.cells[this.getIndex(x - 1, y - 1)];
            let top = this.cells[this.getIndex(x, y - 1)];
            let topRight = this.cells[this.getIndex(x + 1, y - 1)];
            let right = this.cells[this.getIndex(x + 1, y)];
            let bottomRight = this.cells[this.getIndex(x + 1, y + 1)];
            let bottom = this.cells[this.getIndex(x, y + 1)];
            let bottomLeft = this.cells[this.getIndex(x - 1, y + 1)];
            let left = this.cells[this.getIndex(x - 1, y)];

            if(topLeft && topLeft.isMine) {
                count++;
            }
            if(top && top.isMine) {
                count++;
            }
            if(topRight && topRight.isMine) {
                count++;
            }
            if(right && right.isMine) {
                count++;
            }
            if(bottomRight && bottomRight.isMine) {
                count++;
            }
            if(bottom && bottom.isMine) {
                count++;
            }
            if(bottomLeft && bottomLeft.isMine) {
                count++;
            }
            if(left && left.isMine) {
                count++;
            }

            if(DEBUG && DEBUG_LEVEL >= 2) {
                console.group();
                console.log("Current Cell: ");
                console.log(currentCell);
                console.log("Top Left Cell: ");
                console.log(topLeft);
                console.log("Top Cell: ");
                console.log(top);
                console.log("Top Right Cell: ");
                console.log(topRight);
                console.log("Right Cell: ");
                console.log(right);
                console.log("Bottom Right Cell: ");
                console.log(bottomRight);
                console.log("Bottom Cell: ");
                console.log(bottom);
                console.log("Bottom Left Cell: ");
                console.log(bottomLeft);
                console.log("Left Cell: ");
                console.log(left);
                console.log("Count: " + count);
                console.groupEnd();
            }

            this.cells[i].count = count;
        }
    }
    generateBoard(width, height) {
        let board = [];
        for(let y = 0; y < height; y++) {
            for(let x = 0; x < width; x++) {
                let isMine = this.roll(this.density);
                let cell = new Cell(x, y, isMine);
                board.push(cell);
                if(isMine) {
                    this.bombCount++;
                }
            }
        }
        if(board.bombCount == 0) {
            return this.generateBoard(width, height);
        }
        return board;
    }
    generateHTML() {
        let cellMargin = 5;
        let cellSize = 50;
        this.element = document.createElement("div");
        this.element.classList.add("board");
        this.element.style.width = (cellSize * this.width) + (cellMargin * 2 * this.width) + "px";
        this.element.addEventListener("contextmenu", this.handleRightClick);

        for(let i = 0; i < this.cells.length; i++) {
            let cell = this.cells[i];
            let cellElement = this.cells[i].generateHTML();
            this.element.appendChild(cellElement);
        }
        return this.element;
    }
    getCell(id) {
        return this.cells[id];
    }
    getIndex(x, y) {
        if(x < 0 || y < 0 || x > this.width - 1 || y > this.height - 1) {
            return -1;
        }
        return x + (y * this.width);
    }
    handleRightClick(event) {
        event.preventDefault();
    }
    roll(chance) {
        return (Math.random() <= chance);
    }
}