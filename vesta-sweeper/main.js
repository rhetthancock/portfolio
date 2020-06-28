const DEBUG = true;
const DEBUG_LEVEL = 1;
let DENSITY_INT = 12;
let DENSITY = 0.12;
let HEIGHT = 13;
let WIDTH = 13;

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
    document.getElementById("view").appendChild(html);
    if(DEBUG) {
        console.log(activeBoard);
    }

    document.getElementById("newgame").addEventListener("click", (event) => {
        newGame();
    });

    document.getElementById("b-plus").addEventListener("click", function() {
        if(DENSITY_INT < 50) {
            DENSITY_INT++;
            let bTens = document.getElementById("b-tens");
            let bSingles = document.getElementById("b-singles");
            bTens.innerHTML = Math.floor(DENSITY_INT / 10);
            bSingles.innerHTML = DENSITY_INT % 10;
            DENSITY = DENSITY_INT / 100;
            newGame();
        }
    });
    document.getElementById("b-minus").addEventListener("click", function() {
        if(DENSITY_INT > 1) {
            DENSITY_INT--;
            let bTens = document.getElementById("b-tens");
            let bSingles = document.getElementById("b-singles");
            bTens.innerHTML = Math.floor(DENSITY_INT / 10);
            bSingles.innerHTML = DENSITY_INT % 10;
            DENSITY = DENSITY_INT / 100;
            newGame();
        }
    });
    document.getElementById("x-plus").addEventListener("click", function() {
        if(WIDTH < 50) {
            WIDTH++;
            let xTens = document.getElementById("x-tens");
            let xSingles = document.getElementById("x-singles");
            xTens.innerHTML = Math.floor(WIDTH / 10);
            xSingles.innerHTML = WIDTH % 10;
            newGame();
        }
    });
    document.getElementById("x-minus").addEventListener("click", function() {
        if(WIDTH > 1) {
            WIDTH--;
            let xTens = document.getElementById("x-tens");
            let xSingles = document.getElementById("x-singles");
            xTens.innerHTML = Math.floor(WIDTH / 10);
            xSingles.innerHTML = WIDTH % 10;
            newGame();
        }
    });
    document.getElementById("y-plus").addEventListener("click", function() {
        if(HEIGHT < 50) {
            HEIGHT++;
            let yTens = document.getElementById("y-tens");
            let ySingles = document.getElementById("y-singles");
            yTens.innerHTML = Math.floor(HEIGHT / 10);
            ySingles.innerHTML = HEIGHT % 10;
            newGame();
        }
    });
    document.getElementById("y-minus").addEventListener("click", function() {
        if(HEIGHT > 1) {
            HEIGHT--;
            let yTens = document.getElementById("y-tens");
            let ySingles = document.getElementById("y-singles");
            yTens.innerHTML = Math.floor(HEIGHT / 10);
            ySingles.innerHTML = HEIGHT % 10;
            newGame();
        }
    });

    document.getElementById("hardness").addEventListener("click", function(event) {
        let target = event.target;
        if(target.classList.contains("bubble")) {
            target = target.parentNode;
        }
        if(target.classList.contains("l1")) {
            target.classList.remove("l1");
            target.classList.add("l2");
            WIDTH = 8;
            HEIGHT = 8;
            DENSITY_INT = 10;
        }
        else if(target.classList.contains("l2")) {
            target.classList.remove("l2");
            target.classList.add("l3");
            WIDTH = 13;
            HEIGHT = 13;
            DENSITY_INT = 12;
        }
        else if(target.classList.contains("l3")) {
            target.classList.remove("l3");
            target.classList.add("l4");
            WIDTH = 21;
            HEIGHT = 13;
            DENSITY_INT = 15;
        }
        else if(target.classList.contains("l4")) {
            target.classList.remove("l4");
            target.classList.add("l5");
            WIDTH = 32;
            HEIGHT = 17;
            DENSITY_INT = 19;
        }
        else if(target.classList.contains("l5")) {
            target.classList.remove("l5");
            target.classList.add("l6");
            WIDTH = 32;
            HEIGHT = 24;
            DENSITY_INT = 24;
        }
        else if(target.classList.contains("l6")) {
            target.classList.remove("l6");
            target.classList.add("l7");
            WIDTH = 44;
            HEIGHT = 32;
            DENSITY_INT = 30;
        }
        else if(target.classList.contains("l7")) {
            target.classList.remove("l7");
            target.classList.add("l8");
            WIDTH = 50;
            HEIGHT = 50;
            DENSITY_INT = 37;
        }
        else if(target.classList.contains("l8")) {
            target.classList.remove("l8");
            target.classList.add("l1");
            WIDTH = 8;
            HEIGHT = 5;
            DENSITY_INT = 8;
        }
        DENSITY = DENSITY_INT / 100;
        document.getElementById("x-tens").innerHTML = Math.floor(WIDTH / 10);
        document.getElementById("x-singles").innerHTML = WIDTH % 10;
        document.getElementById("y-tens").innerHTML = Math.floor(HEIGHT / 10);
        document.getElementById("y-singles").innerHTML = HEIGHT % 10;
        document.getElementById("b-tens").innerHTML = Math.floor(DENSITY_INT / 10);
        document.getElementById("b-singles").innerHTML = DENSITY_INT % 10;
        newGame();
    });

    window.addEventListener("resize", fixView);

    fixView();
    // document.getElementById("view").addEventListener("scroll", function(event) {
    //     let view = event.target;
    //     if(view.scrollLeft > 0 && view.scrollTop > 0) {
    //         view.classList.add("offtopleft");
    //         return;
    //     }
    //     else {
    //         view.classList.remove("offtopleft");
    //     }
    //     if(view.scrollLeft > 0) {
    //         view.classList.add("offleft");
    //     }
    //     else {
    //         view.classList.remove("offleft");
    //     }
    //     if(view.scrollTop > 0) {
    //         view.classList.add("offtop");
    //     }
    //     else {
    //         view.classList.remove("offtop");
    //     }
    //     console.log(view.scrollLeft);
    //     console.log(view.scrollWidth);
    //     console.log(view.scrollTop);
    // });
}
function newGame() {
    ids = 0;
    document.getElementById("view").removeChild(activeBoard.element);
    activeBoard = new Board(WIDTH, HEIGHT, DENSITY);
    document.getElementById("view").appendChild(activeBoard.generateHTML());
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
    document.getElementById("view").removeChild(activeBoard.element);
    let targetCell;
    do {
        ids = 0;
        activeBoard = new Board(WIDTH, HEIGHT, DENSITY);
        targetCell = activeBoard.getCell(activeBoard.getIndex(x, y));
        console.log(targetCell);
    }
    while(targetCell.count != 0 && !targetCell.isMine);
    document.getElementById("view").appendChild(activeBoard.generateHTML());
    targetCell.show();
    console.log(activeBoard);
}

function fixView() {
    let main = document.getElementById("main");
    let hud = main.getElementsByClassName("hud")[0];
    let view = document.getElementById("view");
    let maxHeight = main.offsetHeight - hud.offsetHeight;
    view.style.maxHeight = maxHeight + "px";
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
    // if(paused) {
    //     document.getElementById("f-h").innerHTML = 0;
    //     document.getElementById("f-t").innerHTML = 0;
    //     document.getElementById("f-s").innerHTML = 0;
    // }
    // else {
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
    //}
}

window.addEventListener("load", init);
window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mouseup", handleMouseUp);
window.addEventListener("keydown", handleKeyboard);