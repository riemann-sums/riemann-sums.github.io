// TODO: 
// -[ ] autoscale on window resize
// -[x] padding around graph
// -[ ] midpoint sum
// -[ ] variable function
// -[ ] simple UI controls, scaling text
// -[ ] 'usable' on mobile
// -[ ] comments on parsing code, credit to knexcar
// -[x] could use noloop(), only redraw on slider change?
var graph,
    sums,
    testPoints = [],
    mouseHeld = false;

const ACCURACY = 10000;         // number of points computed
const MAX_N = 75;              // max value of the n slider
const INIT_MAX_X = 2 * Math.PI; // initial graph domain (both min and max)

function setup() {	
    createCanvas(windowWidth, windowHeight);
    background(27, 29, 28);

    var x;
    for (var i = 0; i < ACCURACY; i++) {
        x = -INIT_MAX_X + (2 * INIT_MAX_X) * (i / ACCURACY);
        testPoints.push(0.2 * sin(x) + 0.1 * x);
    }
    graph = new Graph(testPoints, 0, INIT_MAX_X, INIT_MAX_X, 1, 1); 
}

function draw() {
    noLoop();
    noSmooth();
    background(27, 29, 28);
    graph.drawCurve();
    graph.drawSidebar();    // this will be changed to a top...(?) bar
    graph.drawLH();         // thess functions will only actually draw the sums
    graph.drawRH();         // if graph.displayLH === true etc...
    graph.drawTrapezoid();  // these will also be called in Graph (maybe)
    graph.drawAxes(10);
    // impossible to see graph labels when n is too high
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
  // redraw();
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
