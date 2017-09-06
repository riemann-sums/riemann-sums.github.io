// TODO: 
// -[ ] autoscale on window resize
// -[ ] padding around graph
// -[ ] simple UI controls, scaling text
// -[ ] 'usable' on mobile
// -[ ] comments on parsing code, credit to knexcar
// -[ ] could use noloop(), only redraw on slider change?

var windowW = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
var windowH = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
var graph,
    sums,
    testPoints;

function setup() {
	
    createCanvas(windowW, windowH);
    background(0);
    testPoints = [];
    graph = new Graph(testPoints, 50, 3.14159, 3.14159, 1, 1); 
    for (var i = 0; i < graph.graphWidth; i++) {
        testPoints.push(sin((2 * Math.PI)*(i / graph.graphWidth)));
        //testPoints.push(0.5);
    }
    sums = new Sums(7, graph.unscaledPoints, graph.xRange);

    graph.scalePoints(); // should be in constructor (?)
    graph.drawCurve();
    graph.drawSidebar(sums);
    graph.drawLH();
    // draw axes on top
    graph.drawAxes(20);

    console.log(sums.actual());
}

function draw() {

}
