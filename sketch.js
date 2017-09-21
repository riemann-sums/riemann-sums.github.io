var graph,
    sums,
    testPoints,
    mouseHeld = false,
    functionString = "sin(x)",
    activeFunction = math.eval("f(x) = " + functionString);

const ACCURACY = 10000;         // number of points computed
const MAX_N = 100;              // max value of the n slider
const TICKS = 20;
const INIT_DOMAIN = 2 * Math.PI;

function setup() {	
    createCanvas(windowWidth, windowHeight);
    background(27, 29, 28);
    populatePoints(0, INIT_DOMAIN);
    graph = new Graph(testPoints, 0, 0, INIT_DOMAIN, -1, 1, MAX_N);
}

function draw() {
    noLoop();
    noSmooth();
    background(27, 29, 28);
    graph.drawGrid(TICKS);
    graph.drawCurve();
    graph.drawActiveSums();
    graph.drawTopBar();
    graph.drawAxes(TICKS);
}

function populatePoints(min, domain) {
    var x;
    testPoints = [];

    for (var i = 0; i <= ACCURACY; i++) {
        x = min + (domain) * (i / ACCURACY);
        testPoints.push(activeFunction(x));
    }
}

function setBounds() {
    var input = prompt("Enter -x, +x, -y, and +y bounds separated by spaces: ",
        graph.getBounds());
    var bounds = input.split(' ');
    for (var i = 0; i < 4; i++) {
        if (isNaN(bounds[i])) {
            bounds[i] = bounds[i].toLowerCase();
            if (bounds[i].includes('e')) {
                bounds[i] = bounds[i].replace('e', Math.E);
                // if Xe, replace with "*Math.E"
            }
            if(bounds[i].includes('pi')) {
                bounds[i] = bounds[i].replace('pi', Math.PI);
                // if Xpi, replace with "*Math.PI"
            }
            bounds[i] = math.eval(bounds[i]);
            if (isNaN(bounds[i])) {
                return;
            }

        }
    }
    populatePoints(parseFloat(bounds[0]), parseFloat(bounds[1] - bounds[0]));
    graph.setPoints(testPoints);
    graph.setBounds(bounds);
    redraw();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  graph.resize();
  redraw();
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
    if(key == 'x' || key == 'X') {
        var userInput = prompt("Enter new f(x): ", functionString);
        if (userInput !== null) {
            functionString = userInput;
            activeFunction = math.eval("f(x) = " + functionString);
            populatePoints(graph.minX, graph.domain);
            graph.setPoints(testPoints);
            redraw();
        }
    }

    else if (key == ' ') {
        setBounds();
    }
}