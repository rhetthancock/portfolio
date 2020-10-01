var ELEMENT_ID = 'job-title';
var STATE = 1;
var titles = [
    'computer scientist',
    'full-stack developer',
    'software engineer',
    'front-end developer',
    'web developer',
    'computer programmer',
    'web designer',
    'ux engineer',
    'graphic designer'
];
var index = 0;
function backspace() {
    var element = document.getElementById(ELEMENT_ID);
    var text = element.innerHTML;
    if(text != '') {
        var delay = getRandom(10, 50);
        element.innerHTML = text.substr(0, text.length - 1);
        setTimeout(backspace, delay);
    }
    else {
        nextState();
    }
}
function blinkCursor() {
    var element = document.getElementById(ELEMENT_ID);
    element.classList.toggle('cursor');
    setTimeout(blinkCursor, 400);
}
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
function initTypeTitle() {
    blinkCursor();
    nextState();
}
function nextState() {
    if(STATE == 0) {
        STATE = 1;
        backspace();
    }
    else if(STATE == 1) {
        var nextTitle = titles[index++];
        if(index >= titles.length) {
            index = 0;
        }
        STATE = 2;
        type(nextTitle);
    }
    else {
        STATE = 0;
        setTimeout(nextState, 3000);
    }
}
function type(word) {
    var element = document.getElementById(ELEMENT_ID);
    var text = element.innerHTML;

    if(text.length < word.length) {
        var delay = getRandom(20, 100);
        text += word.charAt(text.length);
        element.innerHTML = text;
        setTimeout(function() {
            type(word);
        }, delay);
    }
    else {
        nextState();
    }
}
window.addEventListener('load', initTypeTitle);