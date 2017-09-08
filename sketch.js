// TODO: 
// -[ ] autoscale on window resize
// -[x] padding around graph
// -[ ] simple UI controls, scaling text
// -[ ] 'usable' on mobile
// -[ ] comments on parsing code, credit to knexcar
// -[x] could use noloop(), only redraw on slider change?
var graph,
    sums,
    testPoints,
    mouseHeld,
    n;

// actual number of points stored
// also represents max n
const ACCURACY = 10000;
const MAX_N = 50;

function setup() {	
    createCanvas(windowWidth, windowHeight);
    background(27, 29, 28);
    testPoints = [];
    mouseHeld = false;

    graph = new Graph(testPoints, 0, 2 * Math.PI, 2 * Math.PI, 1, 1); 
    var x;
    for (var i = 0; i < ACCURACY; i++) {
        x = -graph.minX + (graph.xRange) * (i / ACCURACY);
        //testPoints.push(x ** 2);
        testPoints.push(0.2 * sin(x) + 0.1 * x);

    }
    graph.scalePoints(); // should be in constructor (?)
}

function draw() {
    noLoop();
    noSmooth();
    background(27, 29, 28);
    graph.drawCurve();
    graph.drawSidebar();    // this will be changed to a top...(?) bar
    graph.drawLH();         // thess functions will only actually draw the sums
    //graph.drawRH();         // if graph.displayLH === true etc...
    graph.drawTrapezoid();  // these will also be called in Graph (maybe)
    graph.drawAxes(10);
    // impossible to see graph labels when n is too high
}

function windowResized() {
  //resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
    if (graph.slider.mouseOver()) {
        mouseHeld = true;
    }
}

function mouseReleased() {
    if (mouseHeld) {
        mouseHeld = false;
    }
}

function mouseDragged() {
    if (mouseHeld){
        graph.slider.setPosition(mouseX);
        graph.setN(Math.round(graph.slider.getPortion() * MAX_N));
        redraw();
    }
}
