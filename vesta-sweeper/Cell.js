class Cell {
    constructor(x, y, isMine) {
        this.id = genId();
        this.x = x;
        this.y = y;
        this.isMine = isMine;
    }
    flag() {
        this.flagged = true;
        activeBoard.flagged++;
        this.element.classList.add("flagged");
    }
    handleClick(event) {
        if(!event.target.classList.contains("active") && !event.target.classList.contains("flagged")) {
            let targetId = parseInt(event.target.id.substring(1));
            console.log(targetId);
            let cell = activeBoard.getCell(targetId);
            cell.show();
        }
    }
    handleRightClick(event) {
        event.preventDefault();
        if(!event.target.classList.contains("active")) {
            let targetId = parseInt(event.target.id.substring(1));
            let cell = activeBoard.getCell(targetId);
            if(event.target.classList.contains("flagged")) {
                cell.unflag();
            }
            else {
                cell.flag();
            }
        }
    }
    glimmer() {
        this.element.classList.add("glimmer");
        setTimeout(function(that) {
            that.element.classList.remove("glimmer");
        }, 200, this);
    }
    generateHTML() {
        let cellMargin = 5;
        let cellSize = 50;
        this.element = document.createElement("div");
        this.element.classList.add("cell");
        this.element.id = "c" + this.id;
        this.element.style.height = cellSize + "px";
        this.element.style.margin = cellMargin + "px";
        this.element.style.width = cellSize + "px";
        this.element.addEventListener("click", this.handleClick);
        this.element.addEventListener("contextmenu", this.handleRightClick);

        if(this.isMine) {
            this.element.innerHTML = "⚶";
            this.element.classList.add("bomb");
        }
        else {
            this.element.innerHTML = this.count;
            if(this.count == 0) {
                this.element.classList.add("zero");
            }
            else if(this.count == 1) {
                this.element.classList.add("one");
            }
            else if(this.count == 2) {
                this.element.classList.add("two");
            }
            else if(this.count == 3) {
                this.element.classList.add("three");
            }
            else if(this.count == 4) {
                this.element.classList.add("four");
            }
            else if(this.count == 5) {
                this.element.classList.add("five");
            }
            else if(this.count == 6) {
                this.element.classList.add("six");
            }
            else if(this.count == 7) {
                this.element.classList.add("seven");
            }
            else if(this.count == 8) {
                this.element.classList.add("eight");
            }
        }
        return this.element;
    }
    reveal() {
        if(this.active) {
            let topLeft = activeBoard.getCell(activeBoard.getIndex(this.x - 1, this.y - 1));
            let top = activeBoard.getCell(activeBoard.getIndex(this.x, this.y - 1));
            let topRight = activeBoard.getCell(activeBoard.getIndex(this.x + 1, this.y - 1));
            let right = activeBoard.getCell(activeBoard.getIndex(this.x + 1, this.y));
            let bottomRight = activeBoard.getCell(activeBoard.getIndex(this.x + 1, this.y + 1));
            let bottom = activeBoard.getCell(activeBoard.getIndex(this.x, this.y + 1));
            let bottomLeft = activeBoard.getCell(activeBoard.getIndex(this.x - 1, this.y + 1));
            let left = activeBoard.getCell(activeBoard.getIndex(this.x - 1, this.y));
            let flagCount = 0;

            if(topLeft && topLeft.flagged) {
                flagCount++;
            }
            if(top && top.flagged) {
                flagCount++;
            }
            if(topRight && topRight.flagged) {
                flagCount++;
            }
            if(right && right.flagged) {
                flagCount++;
            }
            if(bottomRight && bottomRight.flagged) {
                flagCount++;
            }
            if(bottom && bottom.flagged) {
                flagCount++;
            }
            if(bottomLeft && bottomLeft.flagged) {
                flagCount++;
            }
            if(left && left.flagged) {
                flagCount++;
            }

            if(flagCount == this.count) {
                if(topLeft && !topLeft.flagged) {
                    topLeft.show();
                }
                if(top && !top.flagged) {
                    top.show();
                }
                if(topRight && !topRight.flagged) {
                    topRight.show();
                }
                if(right && !right.flagged) {
                    right.show();
                }
                if(bottomRight && !bottomRight.flagged) {
                    bottomRight.show();
                }
                if(bottom && !bottom.flagged) {
                    bottom.show();
                }
                if(bottomLeft && !bottomLeft.flagged) {
                    bottomLeft.show();
                }
                if(left && !left.flagged) {
                    left.show();
                }
            }
            else {
                this.element.classList.add("no");
                setTimeout(function(that) {
                    that.element.classList.remove("no");
                }, 200, this);
                if(topLeft && !topLeft.active && !topLeft.flagged) {
                    topLeft.glimmer();
                }
                if(top && !top.active && !top.flagged) {
                    top.glimmer();
                }
                if(topRight && !topRight.active && !topRight.flagged) {
                    topRight.glimmer();
                }
                if(right && !right.active && !right.flagged) {
                    right.glimmer();
                }
                if(bottomRight && !bottomRight.active && !bottomRight.flagged) {
                    bottomRight.glimmer();
                }
                if(bottom && !bottom.active && !bottom.flagged) {
                    bottom.glimmer();
                }
                if(bottomLeft && !bottomLeft.active && !bottomLeft.flagged) {
                    bottomLeft.glimmer();
                }
                if(left && !left.active && !left.flagged) {
                    left.glimmer();
                }
            }
        }
    }
    show() {
        if(!this.active) {
            this.active = true;
            this.element.classList.add("active");
            activeBoard.revealed++;
            this.glimmer();
            if(this.flagged) {
                this.unflag();
            }

            if(firstClick) {
                if(this.isMine || this.count != 0) {
                    console.log("NEW GAME");
                    replacementGame(this.x, this.y);
                }
                else {
                    firstClick = false;
                    paused = false;
                    activeBoard.startTime = new Date();
                    updateTimer();
                }
            }
            else {
                if(this.isMine) {
                    endGame();
                }
            }

            // If count = 0, reveal all around
            if(this.count == 0 && !this.isMine) {
                let topLeft = activeBoard.getCell(activeBoard.getIndex(this.x - 1, this.y - 1));
                let top = activeBoard.getCell(activeBoard.getIndex(this.x, this.y - 1));
                let topRight = activeBoard.getCell(activeBoard.getIndex(this.x + 1, this.y - 1));
                let right = activeBoard.getCell(activeBoard.getIndex(this.x + 1, this.y));
                let bottomRight = activeBoard.getCell(activeBoard.getIndex(this.x + 1, this.y + 1));
                let bottom = activeBoard.getCell(activeBoard.getIndex(this.x, this.y + 1));
                let bottomLeft = activeBoard.getCell(activeBoard.getIndex(this.x - 1, this.y + 1));
                let left = activeBoard.getCell(activeBoard.getIndex(this.x - 1, this.y));
    
                if(topLeft) {
                    topLeft.show();
                }
                if(top) {
                    top.show();
                }
                if(topRight) {
                    topRight.show();
                }
                if(right) {
                    right.show();
                }
                if(bottomRight) {
                    bottomRight.show();
                }
                if(bottom) {
                    bottom.show();
                }
                if(bottomLeft) {
                    bottomLeft.show();
                }
                if(left) {
                    left.show();
                }
            }

            // Check if player just won
            if(activeBoard.revealed == activeBoard.cells.length - activeBoard.bombCount) {
                victory();
            }
        }
    }
    unflag() {
        this.flagged = false;
        activeBoard.flagged--;
        this.element.classList.remove("flagged");
    }
}