var graph,
    sums,
    testPoints,
    mouseHeld = false,
    functionString = ".2sin(x)+.1x",
    activeFunction = math.eval("f(x) = " + functionString);

const ACCURACY = 10000;         // number of points computed
const MAX_N = 100;               // max value of the n slider
const TICKS = 20;

function setup() {	
    createCanvas(windowWidth, windowHeight);
    background(27, 29, 28);
    console.log("f(x): " + activeFunction(2));
    populatePoints(Math.PI, 2*Math.PI);
    graph = new Graph(testPoints, 0, -2 * Math.PI, 2 * Math.PI, -0.5, 0.5, MAX_N);
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

function populatePoints(min, xRange) {
    var x;
    //var min = graph ? graph.minX : Math.PI;
    //var xRange = graph ? graph.xRange : 2 * Math.PI;

    testPoints = [];
    for (var i = 0; i <= ACCURACY; i++) {
        x = -min + (xRange) * (i / ACCURACY);
        testPoints.push(activeFunction(x));
    }
}

function setBounds() {
    var test = [10, 10, 1, 1];
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
    graph.setBounds(bounds);
    populatePoints(graph.minX, graph.xRange);
    graph.setPoints(testPoints);
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
            populatePoints(graph.minX, graph.xRange);
            graph.setPoints(testPoints);
            redraw();
        }
    }

    else if (key == ' ') {
        setBounds();
    }
}