var canvas;
var context;
var height;
var width;
var stars;

var diagonal;

function init() {
    height = window.innerHeight;
    width = window.innerWidth;

    canvas = document.getElementById("background");
    canvas.width = width;
    canvas.height = height;
    
    diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    
    context = canvas.getContext("2d");
    stars = generateStarfield(10000);
    console.log(stars);
    window.requestAnimationFrame(animate);
}

function animate() {
    var rotationSpeed = 0.0005;
    var animationQueue = [];

    // Draw Background
    context.fillStyle = "rgba(0, 0, 0, 1)";
    context.fillRect(0, 0, width, height);

    // For each star
    for(var i = 0; i < stars.length; i++) {
        var star = stars[i];
        var x = star.x;
        var y = star.y;

        // Translate to new origin
        x -= diagonal;
        y -= diagonal;

        // Rotate Star
        x = (x * Math.cos(rotationSpeed)) - (y * Math.sin(rotationSpeed));
        y = (y * Math.cos(rotationSpeed)) + (x * Math.sin(rotationSpeed));

        // Reverse translation
        x += diagonal;
        y += diagonal;

        // Reassign star positions
        star.x = x;
        star.y = y;

        // Fill with star color
        context.fillStyle = 
            "rgba(" +
            star.color.r + "," +
            star.color.g + ", " +
            star.color.b + ", " +
            star.brightness + ")";
        
        // Draw star to canvas
        context.beginPath();
        context.arc(
            star.x - diagonal,
            star.y - diagonal + height,
            star.radius,
            0,
            2 * Math.PI
        );
        context.fill();
    }

    // Call function again
    window.requestAnimationFrame(animate);
}

function generateStarfield(size) {
    var stars = [];
    for(var i = 0; i < size; i++) {
        var x = generateRandom(0, diagonal * 2);
        var y = generateRandom(0, diagonal * 2);
        var radius = generateRandom(0.1, 1.5);
        var color = generateColor(200, 255, 200, 255, 200, 255);
        var brightness = generateRandom(0, 1);
        var star = new Star(x, y, radius, color, brightness);
        stars.push(star);
    }
    return stars;
}

function generateColor(minr, maxr, ming, maxg, minb, maxb) {
    var color = new Color(
        Math.round(generateRandom(minr, maxr)),
        Math.round(generateRandom(ming, maxg)),
        Math.round(generateRandom(minb, maxb))
    );
    return color;
}

function generateRandom(min, max) {
    return (Math.random() * (max - min)) + min;
}

function resize() {
    height = window.innerHeight;
    width = window.innerWidth;
    canvas.width = width;
    canvas.height = height;
    diagonal = Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
}

// Simple Objects

function Color(r, g, b) {
    this.r = r;
    this.g = g;
    this.b = b;
}

function Star(x, y, r, c, b) {
    this.x = x;
    this.y = y;
    this.radius = r;
    this.color = c;
    this.brightness = b;
}

function Animation(tl, r) {
    this.timeLeft = tl;
    this.rate = r;
}

window.addEventListener("load", init);
window.addEventListener("resize", resize);