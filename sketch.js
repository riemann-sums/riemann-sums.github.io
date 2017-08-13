// Riemann's sum visual
// Use slider to change  n (intervals)
// 'f' to enter a custom function
// Click graph to cycle to next summation
// Left Hand Sum, Midpoint Sum, Trapezoidal sum



// add padding around the graph
// controls need to go in the padding area, under graph?
// optimize area/dydx calculation, only do on change of f(x) or n
// NaN bug on midpt sum
// deal with asymptotes / undefinded values
var PI = 3.14159265;
const sliderWidth = 150;

// Define graph window
var minX = 2*PI;
var maxX = 2*PI;
var minY = 1;
var maxY = 1;
var ticks = 20;
var derivMode = true;

var windowW = window.innerWidth || document.documentElement.clientWidth ||
  document.body.clientWidth;
var windowH = window.innerHeight || document.documentElement.clientHeight ||
  document.body.clientHeight;

var trueArea ;
var estimatedArea;
var derivative;
var currentX;
var xRange = minX + maxX;
var yRange = minY + maxY;
var yScale;
var positiveXAxis;
var negativeXAxis;
var positiveYAxis;
var negativeYAxis;
var tickLength;
var nSlider;
var controlsHeight;
var graphHeight;
var activeSumIndex;
var riemmans; 
var equation;
var points = [];
var dx;
var n;

function setup() {
  createCanvas(windowW, windowH);
  background(0);
  
  equation = parse_PEMDAS(".2*sin(x) + .1x", 0);
  controlsHeight = max(20, height/10);
  graphHeight = height - controlsHeight;
  tickLength = width/35;
  nSlider = createSlider(0, width, 0);
  nSlider.position(width - sliderWidth, height - (controlsHeight/1.5));
  positiveXAxis = maxX*(width/xRange);
  negativeXAxis = minX*(width/xRange);
  positiveYAxis = maxY*(graphHeight/yRange);
  negativeYAxis = minY*(graphHeight/yRange);
  yScale = graphHeight/(yRange); 
  activeSumIndex = 0;
  riemmans = [leftHandSum, midptSum, trapezoidalSum];
  for (var i = 0; i < width + 1; i++) {
    var x = (i - negativeXAxis)*((xRange)/width);
    points[i] = myFunc(x);
  }

  //trueArea = roundTo(calculateIntegral(points),5);
  alert("Click anywhere to toggle sum type. Use slider to set the number of rectangles. Press F to enter a new function and S to change the graph scale.");
  trueArea = riemmans[2](width, 1, points, yScale, positiveYAxis, xRange);
}
function rescale() {
    controlsHeight = max(20, height/10);
    graphHeight = height - controlsHeight;
    tickLength = width/35;
    nSlider.position(width - sliderWidth, height - (controlsHeight/1.5));
    xRange = minX + maxX;
    yRange = minY + maxY;
    positiveXAxis = maxX*(width/xRange);
    negativeXAxis = minX*(width/xRange);
    positiveYAxis = maxY*(graphHeight/yRange);
    negativeYAxis = minY*(graphHeight/yRange);
    yScale = graphHeight/(yRange); 
    
    for (var i = 0; i < width + 1; i++) {
        var x = (i - negativeXAxis)*((xRange)/width);
        points[i] = myFunc(x);
    }
    
    trueArea = riemmans[2](width, 1, points, yScale, positiveYAxis, xRange);
    //trueArea = calculateIntegral(points);

}

function draw() {
  background(0);
  n = nSlider.value();
  dx = width / n;
  currentX = (mouseX - negativeXAxis)*((xRange)/width);
  drawGrid();
  if (derivMode){
    calcDeriv(mouseX);
  }
  plotCurve();
  displayStats();
  if (n > 0) {
    estimatedArea = riemmans[activeSumIndex]
                    (n, dx, points, yScale, positiveYAxis, xRange);
  } else {
    estimatedArea = 0;
  }
}

// Draw and labels axes
var drawGrid = function() {
  stroke(255);
  line(0, (graphHeight - 1) - negativeYAxis, 
        width, (graphHeight - 1) - negativeYAxis);
  line(width - positiveXAxis, 0, width - positiveXAxis, graphHeight);
  for(var i = 0; i < ticks; i++) {
    textSize(8);
    noStroke();
    fill(255);
    if (i % 2 == 0){
      text(roundTo((-minX + (i*xRange/ticks)),2), 
            i*(width/ticks) + 3, positiveYAxis-tickLength);
    }
    else {
      text(roundTo((-minX + (i*xRange/ticks)), 2), 
        i*(width/ticks) + 3, positiveYAxis+tickLength); 
    }
    text(roundTo((-minY + (i*(yRange/ticks))), 2), 
                      width - positiveXAxis+tickLength, 
                      graphHeight - i*(graphHeight/ticks));
    stroke(0,255,255);
    line(width - positiveXAxis-tickLength/2, i*(graphHeight/ticks), 
          width - positiveXAxis+tickLength/2, i*(graphHeight/ticks));
    line(i*(width/ticks), positiveYAxis-tickLength/2, 
          i*(width/ticks), positiveYAxis+tickLength/2);
  }
};

// The function to be plotted
var myFunc = function(x) {
  return equation.f(x);
};

// Plots the curve
var plotCurve = function() {
  for(var i = 0; i < points.length; i++) {
    stroke(255, 0 ,0);
    if (i <= points.length) {
        line(i, positiveYAxis - points[i]*yScale, i + 1, 
              positiveYAxis - points[i+1]*yScale);
    }
  }  
};

// Displays information about the curve at a given X position.
var displayStats = function() {
  stroke(255);
  textSize(max(height/40, 10));
  text("n = " + n, width * .9 - sliderWidth, height - (controlsHeight/2.5));
  text("x = " + roundTo(currentX,4), 10, height - 46);
  text("dy/dx = " + derivative, 10, height - 34);
  text("estimated = " + roundTo(estimatedArea, 5), 10, height - 22);
  text("true = " + roundTo(trueArea, 4), 10, height - 10);
  //text("" + str(riemmans[activeSumIndex]), 10, 10);
};

// Draws tangent line at a given x value.
var calcDeriv = function(x) {
  var slope = 0;
  if (x < points.length ) {
    slope = roundTo(points[x + 1] - points[x],5);
  }
  else {
    slope = 0;
  }
  derivative = roundTo((slope)/(xRange/width),3);
  if (mouseY < graphHeight) {
    stroke(0, 255, 200);
    line(x, positiveYAxis - points[x]*yScale, width, 
          positiveYAxis - yScale * (points[x] + (slope * (width - x))));
    line(x, positiveYAxis - points[x]*yScale,
          0, positiveYAxis - yScale * (points[x] - (slope * x)));
    stroke(255);
    line(x , 0, x, height);
  }
};

var roundTo = function(n, dec) {
  var factor = pow(10, dec);
  return Math.round(n*factor)/factor;
};

function mousePressed () {
  // Cycles to the next method
  if (mouseY <= graphHeight) {
    if (activeSumIndex === riemmans.length - 1){
      activeSumIndex = 0;
    }
    else {
      activeSumIndex++;
    }

  }
}

function keyPressed() {
    if (key === 'f' || key === 'F') {
      equation = parse_PEMDAS(prompt("Enter f(x)", "sin(x)"), 0);
      for (var i = 0; i < width + 1; i++) {
        var x = (i - negativeXAxis)*((xRange)/width);
        points[i] = myFunc(x);
      }
      trueArea = roundTo(calculateIntegral(points),5);
    }
    else if (key === 's' || key === 'S') {
        var currentScaleString = minX + " " + maxX + " " + minY + " " + maxY;
        var scaleString = prompt("Enter min X, max X, min Y, max Y separated" 
        + " by spaces", currentScaleString );
        var scales = scaleString.split(' ');
        // validate here
      
        minX = parseFloat(scales[0], 10);
        maxX = parseFloat(scales[1], 10);
        minY = parseFloat(scales[2], 10);
        maxY = parseFloat(scales[3], 10);
        console.log(minX + maxX + minY + maxY);
        rescale();
        //setup();
    }
}
