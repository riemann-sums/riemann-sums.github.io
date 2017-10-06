var graph,
    sums,
    testPoints,
    promptActive = false,
    menuActive = false,
    mouseHeld = false,
    promptCb, // this will be elinated by activePromp object
    activePrompt = {},
    menuButtonX,
    menuButtonY,
    functionString = "sin(x)",
    activeFunction = math.eval("f(x) = " + functionString);

const ACCURACY = 10000;         // number of points computed
const MAX_N = 100;              // max value of the n slider
const TICKS = 20;
const INIT_DOMAIN = 2 * Math.PI;

var menuEntries = [];

// can check for mouse movement, highlight menu entry and redraw without
// redrawing on each mouse mouse
// mouseMoved () { if (menuActive) {}}...

function setup() {	
    createCanvas(windowWidth, windowHeight);
    background(27, 29, 28);
    populatePoints(0, INIT_DOMAIN);
    graph = new Graph(testPoints, 0, 0, INIT_DOMAIN, -1, 1, MAX_N);
    // callbacks here should return a value
    // true if valid input, false if not
    // if false, dont close menu, error animation
    // transparent red circle, inflates under menu 
    // as opacity decreases
    menuButtonX = width - graph.padding / 2;
    menuButtonY = 5 + graph.padding / 2;
    menuEntries = [
        {
            name: 'f(x)',
            cb : setFunction
        },
        {
            name: 'bounds',
            cb: setBounds
        },
        {
            name: 'ticks',
            cb: setTicks
        },
        {
            name: 'tick size',
            cb: setTickSize
        },
           {
            name: 'max n',
            cb: setMaxN
        }
    ];
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
    drawMenuIcon(menuButtonX, menuButtonY);
    if (menuActive) {
        drawMenu();
    }
    //drawPrompt(function() {console.log('hey')});
}

function populatePoints(min, domain) {
    var x;
    testPoints = [];

    for (var i = 0; i <= ACCURACY; i++) {
        x = min + (domain) * (i / ACCURACY);
        testPoints.push(activeFunction(x));
    }
}

// pass a callback function, fires on enter...
// also pass a validation function? mayb not, will see later
function drawPrompt(cb) {
    var value = 'dingusdingusgidnisdfoisfslkdfjkjsdlfjslkfksdjf';
    var display = value;
    var pWidth = width / 4;
    var pHeight = pWidth / 5;
    var chop = 0;
    promptCb = cb;
    if (promptActive) {
        textSize(pHeight / 2);
        while (textWidth(display) > pWidth) {
            chop++;
            display = value.substr(chop);
        }

        rectMode(CENTER);
        fill (255);
        rect(width / 2, height / 2, pWidth, pHeight);
        rectMode(CORNER);
        fill(0);
        text(display, (width / 2) - pWidth / 2, (height / 2) + pHeight * 0.25);
    }
}

function newPrompt(cb, init) {
    // return {'cb': cb, 'init': init}
}

function drawMenu() {
    // no need for other var here...
    // OR font size var
    entries = menuEntries;
    var entryHeight = height / 20;  
    var w = width / 4;
    var h = entryHeight * entries.length;
    var entryId = 0;
    var entryFontSize = entryHeight / 2;
    fill(27, 29, 28, 200);
    rectMode(CENTER);
    noStroke();
    rect(width / 2, height / 2, w , h);
    textSize(entryFontSize);
    entries.forEach(function (entry) {
        noFill();
        stroke(255);
        strokeWeight(1);
        rect(width / 2, height / 2  - (h / 2) + (entryHeight / 2) + entryHeight * entryId, w, entryHeight);
        fill(255);
        noStroke();
        text(entry.name, width / 2 - (w / 2), height / 2  - (h / 2) + (entryHeight / 2)+ entryHeight * entryId);
        entryId++;

    });

    stroke(255);
    rectMode(CORNER);
}


function validBounds(bounds) {
    return bounds[0] < bounds[1] && bounds[2] < bounds[3];
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
    // bad or good? the world may never know...
    // need to do this after checking NaN and replacing constants
    bounds = bounds.map(function (bound) {
        return parseFloat(bound);
    });
    if (validBounds(bounds)) {
        populatePoints(bounds[0], bounds[1] - bounds[0]);
        graph.setPoints(testPoints);
        graph.setBounds(bounds);
        redraw();
    } else {
        console.log("Invalid bounds ya dingus!");
    }
}

function setFunction() {
    var userInput = prompt("Enter new f(x): ", functionString);
    if (userInput !== null) {
        functionString = userInput;
        activeFunction = math.eval("f(x) = " + functionString);
        populatePoints(graph.minX, graph.domain);
        graph.setPoints(testPoints);
        redraw();
    }
    console.log("new f(x)");
}

function setTicks() {

}

function setTickSize() {

}

function setMaxN() {

}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    graph.resize();
    menuButtonX = width - graph.padding / 2;
    menuButtonY = 5 + graph.padding / 2;
    redraw();
}

function drawMenuIcon (x, y) {
    var dotSize = graph.padding / 5;
    var iconSize = graph.padding - 5;
    fill (255, 100);
    ellipse(x, (y - iconSize / 3), dotSize, dotSize);
    ellipse(x, y, dotSize, dotSize);
    ellipse(x, (y + iconSize / 3), dotSize, dotSize);
}

function mousePressed() {
    if (graph.slider.mouseOver()) {
        mouseHeld = true;
    }
    if (menuActive) {
        var entryHeight = height / 20;  
        var w = width / 4;
        var h = entryHeight * Object.keys(entries).length;
        menuEntries.forEach(function (entry, index) {
            if (mouseX > width / 2 - (w / 2) &&
                mouseX < width / 2 + (w /2) &&
                mouseY < height / 2 - (h / 2) + (entryHeight * (index + 1)) && 
                mouseY > height / 2 - (h / 2) + (entryHeight * index)) {

            entry.cb();
            menuActive = false;
            redraw();

            }
        });
    }
    if (dist(mouseX, mouseY, menuButtonX, menuButtonY) < graph.padding) {
        menuActive = !menuActive;
        redraw();
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
    console.log(keyCode)
    if (key === ' ') {
        menuActive = !menuActive;
        redraw();
    }
    else if (keyCode === 27 && menuActive) {
        menuActive = false;
        redraw();
    }
    // else if (keyCode === 13 && promptActive) {
    //     if (promptCb) {
    //         promptCb();
    //     }
    // }
}

// activePrompt, {cb, initialValue, [valid f(x)]}
// newPrompt(cb, init) returns an object
// to check if prompt is active, if (activePromt)
// set undefined in cb
// on Enter, activePrompt.cb()