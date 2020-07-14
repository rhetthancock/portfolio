const DEBUG = true;
const DEBUG_LEVEL = 1;
let DENSITY_INT = 15;
let DENSITY = 0.15;
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
    document.getElementById("new").addEventListener("click", (event) => {
        newGame();
    });

    document.getElementById("mtoggle").addEventListener("click", function(event) {
        document.getElementById("sidebar").classList.toggle("active");
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
            WIDTH = 13;
            HEIGHT = 8;
            DENSITY_INT = 14;
        }
        else if(target.classList.contains("l2")) {
            target.classList.remove("l2");
            target.classList.add("l3");
            WIDTH = 13;
            HEIGHT = 13;
            DENSITY_INT = 15;
        }
        else if(target.classList.contains("l3")) {
            target.classList.remove("l3");
            target.classList.add("l4");
            WIDTH = 21;
            HEIGHT = 13;
            DENSITY_INT = 18;
        }
        else if(target.classList.contains("l4")) {
            target.classList.remove("l4");
            target.classList.add("l5");
            WIDTH = 32;
            HEIGHT = 17;
            DENSITY_INT = 22;
        }
        else if(target.classList.contains("l5")) {
            target.classList.remove("l5");
            target.classList.add("l6");
            WIDTH = 32;
            HEIGHT = 24;
            DENSITY_INT = 27;
        }
        else if(target.classList.contains("l6")) {
            target.classList.remove("l6");
            target.classList.add("l7");
            WIDTH = 44;
            HEIGHT = 32;
            DENSITY_INT = 33;
        }
        else if(target.classList.contains("l7")) {
            target.classList.remove("l7");
            target.classList.add("l8");
            WIDTH = 50;
            HEIGHT = 50;
            DENSITY_INT = 41;
        }
        else if(target.classList.contains("l8")) {
            target.classList.remove("l8");
            target.classList.add("l1");
            WIDTH = 8;
            HEIGHT = 8;
            DENSITY_INT = 13;
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

    if(window.mobileCheck()) {
        this.wrapper.classList.add("mobile");
    }

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

window.mobileCheck = function() {
    let check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
};

window.addEventListener("load", init);
window.addEventListener("mousedown", handleMouseDown);
window.addEventListener("mouseup", handleMouseUp);
window.addEventListener("keydown", handleKeyboard);