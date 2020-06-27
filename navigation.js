var ticking = false;

function ctaf() {
    window.scroll({
        top: window.innerHeight,
        left: 0,
        behavior: 'smooth'
    });
}

function initNav() {
    var cta = document.getElementById("cta");
    cta.addEventListener("click", ctaf);
}

function checkPosition(scroll_pos) {
    var bar = document.getElementById("bar");
    if(scroll_pos >= window.innerHeight - 150) {
        bar.classList.add("active");
    }
    else {
        bar.classList.remove("active");
    }
    console.log("AH");
}

window.addEventListener("load", initNav);
window.addEventListener("scroll", (event) => {
    var scroll_pos = window.scrollY;
    if(!ticking) {
        window.requestAnimationFrame(function() {
            
            checkPosition(scroll_pos);
            ticking = false;
        });
        ticking = true;
    }
});