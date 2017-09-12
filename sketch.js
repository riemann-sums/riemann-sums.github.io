// TODO: 
// -[ ] autoscale on window resize
// -[x] padding around graph
// -[ ] midpoint sum
// -[ ] variable function
// -[x] simple UI controls, scaling text
// -[ ] 'usable' on mobile
// -[ ] comments on parsing code, credit to knexcar
// -[x] could use noloop(), only redraw on slider change?
// -[ ] add buttons for changing tick #, type, n, and function
// -[ ] implement own text entry / dialog for f(x) prompt
// -[ ] separate grid lines and labels (lines behind, labels in front)
// -[ ] rewrite hastily crafted button class (pls), dolan suggestions
// -[ ] readme.md


var graph,
    sums,
    testPoints = [],
    mouseHeld = false,
    activeFunction = math.eval("f(x) = " + "0.2 * sin(x) + 0.1 * x");
    // do even need this var? mhm

const ACCURACY = 10000;         // number of points computed
const MAX_N = 1000;               // max value of the n slider
const INIT_MAX_X = 2 * Math.PI; // initial graph domain (both min and max)

function setup() {	
    createCanvas(windowWidth, windowHeight);
    background(27, 29, 28);
    console.log("f(x): " + activeFunction(2));

    populatePoints();
    graph = new Graph(testPoints, 0, INIT_MAX_X, INIT_MAX_X, 1, 1); 
}

function draw() {
    //populatePoints();
    noLoop();
    noSmooth();
    background(27, 29, 28);
    graph.drawCurve();
    graph.drawAxes(20);
    graph.drawTopBar();
    graph.drawActiveSums();
}

function populatePoints() {
    var x;
    for (var i = 0; i < ACCURACY; i++) {
        x = -INIT_MAX_X + (2 * INIT_MAX_X) * (i / ACCURACY);
        testPoints.push(activeFunction(x));
    }
}

function windowResized() {
  // resizeCanvas(windowWidth, windowHeight);
  // redraw();
}

function mousePressed() {
    if (graph.slider.mouseOver()) {
        mouseHeld = true;
    }
    graph.getButtons().forEach(function (button) {
        if (button.mouseOver()) {
            button.toggle();
            redraw();
        }
    })
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

function keyPressed() {
    var input ="f(x) = " +  prompt("Enter new f(x): ");
    // need to validate here, regex?
    activeFunction = math.eval(input);
    populatePoints();

}