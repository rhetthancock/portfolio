let ticking = false;

function checkPosition(scroll_pos) {
    let logo = document.getElementById("logo");
    if(scroll_pos >= window.innerHeight - 150) {
        logo.classList.add("active");
    }
    else {
        logo.classList.remove("active");
    }
}

window.addEventListener("scroll", (event) => {
    let scroll_pos = window.scrollY;
    if(!ticking) {
        window.requestAnimationFrame(function() {
            checkPosition(scroll_pos);
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener('load', function() {
    let nav = document.getElementById('nav');
    let toggle = document.getElementById('nav-toggle');
    toggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });
});