const DEBUG = true;
const DEBUG_LEVEL = 1;
let DENSITY = 0.15;
let HEIGHT = 15;
let WIDTH = 15;

let activeBoard = {};
let firstClick = true;
let last = new Date();
let leftMouseDown = false;
let rightMouseDown = false;
let ids = 0;
let paused = true;

function endGame() {
    document.body.classList.add("gameover");
    paused = true;
}

function victory() {
    console.log("YOU WIN!");
    document.body.classList.add("victory");
    paused = true;
}

function genId() {
    return ids++;
}
function handleKeyboard(event) {
    if(event.key == "n") {
        newGame();
        document.getElementById("newgame").classList.add("glimmer");
        setTimeout(function(that) {
            document.getElementById("newgame").classList.remove("glimmer");
        }, 200, this);
    }
}
function handleMouseDown(event) {
    if(event.button == 0) {
        leftMouseDown = true;
    }
    else if(event.button == 2) {
        rightMouseDown = true;
    }
}
function handleMouseUp(event) {
    if(leftMouseDown && rightMouseDown) {
        let targetId = parseInt(event.target.id.substring(1));
        let cell = activeBoard.getCell(targetId);
        if(cell) {
            cell.reveal();
        }
    }
    if(event.button == 0) {
        leftMouseDown = false;
    }
    else if(event.button == 2) {
        rightMouseDown = false;
    }
}
function init() {
    activeBoard = new Board(WIDTH, HEIGHT, DENSITY);
    let html = activeBoard.generateHTML();
    document.getElementById("main").appendChild(html);
    if(DEBUG) {
        console.log(activeBoard);
    }

    document.getElementById("newgame").addEventListener("click", (event) => {
        newGame();
    });

    document.getElementById("x-plus").addEventListener("click", function() {
        if(WIDTH < 99) {
            WIDTH++;
            let xTens = document.getElementById("x-tens");
            let xSingles = document.getElementById("x-singles");
            xTens.innerHTML = Math.floor(WIDTH / 10);
            xSingles.innerHTML = WIDTH % 10;
        }
    });
    document.getElementById("x-minus").addEventListener("click", function() {
        if(WIDTH > 1) {
            WIDTH--;
            let xTens = document.getElementById("x-tens");
            let xSingles = document.getElementById("x-singles");
            xTens.innerHTML = Math.floor(WIDTH / 10);
            xSingles.innerHTML = WIDTH % 10;
        }
    });
    document.getElementById("y-plus").addEventListener("click", function() {
        if(HEIGHT < 99) {
            HEIGHT++;
            let yTens = document.getElementById("y-tens");
            let ySingles = document.getElementById("y-singles");
            yTens.innerHTML = Math.floor(HEIGHT / 10);
            ySingles.innerHTML = HEIGHT % 10;
        }
    });
    document.getElementById("y-minus").addEventListener("click", function() {
        if(HEIGHT > 1) {
            HEIGHT--;
            let yTens = document.getElementById("y-tens");
            let ySingles = document.getElementById("y-singles");
            yTens.innerHTML = Math.floor(HEIGHT / 10);
            ySingles.innerHTML = HEIGHT % 10;
        }
    });
}
function newGame() {
    ids = 0;
    document.getElementById("main").removeChild(activeBoard.element);
    activeBoard = new Board(WIDTH, HEIGHT, DENSITY);
    document.getElementById("main").appendChild(activeBoard.generateHTML());
    if(document.body.classList.contains("gameover")) {
        document.body.classList.remove("gameover");
    }
    if(document.body.classList.contains("victory")) {
        document.body.classList.remove("victory");
    }
    firstClick = true;
    paused = true;
    last = new Date();
}
function replacementGame(x, y) {
    document.getElementById("main").removeChild(activeBoard.element);
    let targetCell;
    do {
        ids = 0;
        activeBoard = new Board(WIDTH, HEIGHT, DENSITY);
        targetCell = activeBoard.getCell(activeBoard.getIndex(x, y));
        console.log(targetCell);
    }
    while(targetCell.count != 0 && !targetCell.isMine);
    document.getElementById("main").appendChild(activeBoard.generateHTML());
    targetCell.show();
    console.log(activeBoard);
}


function updateTimer() {
    let elapsed = new Date() - last;
    let secondsElapsed = Math.round(elapsed / 1000);
    let secH = Math.floor(secondsElapsed / 100) % 100;
    let secT = Math.floor(secondsElapsed / 10) % 10;
    let secS = secondsElapsed % 10;
    if(secondsElapsed < 999) {
        document.getElementById("sec-h").innerHTML = secH;
        document.getElementById("sec-t").innerHTML = secT;
        document.getElementById("sec-s").innerHTML = secS;
    }
    else {
        document.getElementById("sec-h").innerHTML = "9";
        document.getElementById("sec-t").innerHTML = "9";
        document.getElementById("sec-s").innerHTML = "9";
    }
    
    
    updateBombCount();
    if(!paused) {
        window.requestAnimationFrame(updateTimer);
    }
}

function updateBombCount() {
    if(paused) {
        document.getElementById("f-h").innerHTML = 0;
        document.getElementById("f-t").innerHTML = 0;
        document.getElementById("f-s").innerHTML = 0;
    }
    else {
        let count = activeBoard.bombCount - activeBoard.flagged;
        if(count < 0) {
            let dif = Math.abs(count);
            let flagT = Math.floor(dif / 10) % 10;
            let flagS = dif % 10;
            document.getElementById("f-h").innerHTML = "-";
            document.getElementById("f-t").innerHTML = flagT;
            document.getElementById("f-s").innerHTML = flagS;
        }
        else {
            let flagH = Math.floor(count / 100) % 100;
            let flagT = Math.floor(count / 10) % 10;
            let flagS = count % 10;
            document.getElementById("f-h").innerHTML = flagH;
            document.getElementById("f-t").innerHTML = flagT;
            document.getElementById("f-s").innerHTML = flagS;
        }
    }
}

window.addEventListener("load", init);
window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mouseup", handleMouseUp);
window.addEventListener("keydown", handleKeyboard);