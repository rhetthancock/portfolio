let ticking = false;

// Element pointers
let arrow;
let logo;
let nav;
let toggle;

// Check the position of the scroll
function checkPosition(scroll_pos) {
    // Assign states
    if(scroll_pos >= window.innerHeight - 150) {
        logo.classList.add('active');
        arrow.classList.add('active');
    }
    else {
        logo.classList.remove('active');
        arrow.classList.remove('active');
    }
}

// When page loads
window.addEventListener('load', function() {
    // Assign element pointers
    arrow = document.getElementById('top-arrow');
    logo = document.getElementById('logo');
    nav = document.getElementById('nav');
    toggle = document.getElementById('nav-toggle');

    // Make hamburger menu togglable
    toggle.addEventListener('click', function() {
        nav.classList.toggle('active');
    });

    // Fire at least once for anchor links
    checkPosition(window.scrollY);

    // Add user scroll listener
    window.addEventListener('scroll', (event) => {
        let scroll_pos = window.scrollY;
        if(!ticking) {
            // Smooth out browser request for scroll position
            window.requestAnimationFrame(function() {
                checkPosition(scroll_pos);
                ticking = false;
            });
            ticking = true;
        }
    });
});