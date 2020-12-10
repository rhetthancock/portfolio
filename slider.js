let scrollIndex = 0;
let pWidth;
let reel, showCount, projectCount;

function checkArrows() {
    // Handle left arrow
    let left = document.getElementById('projects-left');
    if(scrollIndex > 0)  {
        left.classList.add('active');
    }
    else {
        left.classList.remove('active');
    }

    // Handle right arrow
    let right = document.getElementById('projects-right');
    if(scrollIndex + showCount >= projectCount) {
        right.classList.remove('active');
    }
    else {
        right.classList.add('active');
    }
}

function scrollLeft() {
    if(scrollIndex > 0) {
        scrollIndex--;
        setScrollPosition();
    }
    checkArrows();
}

function scrollRight() {
    if(scrollIndex + showCount < projectCount) {
        scrollIndex++;
        setScrollPosition();
    }
    checkArrows();
}

function sliderInit() {
    // Set projects count
    reel = document.getElementById('projects-reel');
    let projects = reel.children;
    projectCount = projects.length;

    // Set arrow listeners
    let arrow_left = document.getElementById('projects-left');
    let arrow_right = document.getElementById('projects-right');
    arrow_left.addEventListener('click', scrollLeft);
    arrow_right.addEventListener('click', scrollRight);

    // Set width of view
    setViewSize();
    
    // Show right arrow
    if(showCount < projects.length) {
        arrow_right.classList.add('active');
    }
}

function setScrollPosition() {
    if(scrollIndex == 0) {
        reel.style.marginLeft = 0;
    }
    else {
        reel.style.marginLeft = '-' + scrollIndex * pWidth + 'px';
    }
}

function setViewSize() {
    let slider = document.getElementById('projects-slider');
    let view = document.getElementById('projects-view');
    let aWidth = slider.getElementsByClassName('arrow')[0].offsetWidth;
    let project = reel.children[0];
    let maxSpace = slider.offsetWidth - (aWidth * 2);
    let pcss = window.getComputedStyle(project);
    pWidth = project.offsetWidth + parseInt(pcss.marginLeft) + parseInt(pcss.marginRight);
    showCount = Math.floor(maxSpace / pWidth);
    if(showCount < projectCount) {
        view.style.width = (showCount * pWidth) + 'px';
    }
    else {
        view.style.width = '';
    }
}

function sliderResize() {
    setViewSize();
    if(scrollIndex + showCount > projectCount) {
        let diff = projectCount - showCount;
        if(diff < 0) {
            scrollIndex = 0;
        }
        else {
            scrollIndex = diff;
        }
        setScrollPosition();
    }
    checkArrows();
}

window.addEventListener('load', sliderInit);
window.addEventListener('resize', sliderResize);