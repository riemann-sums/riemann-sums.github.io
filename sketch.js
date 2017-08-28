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

function setup() {
	
    createCanvas(windowW, windowH);
    background(0);

    var testPoints = [];
    var graph = new Graph(testPoints, 10, 3.14159, 3.14159, 1, 1);
    for (var i = 0; i < graph.graphWidth; i++) {
        testPoints.push(sin((2 * Math.PI)*(i / graph.graphWidth)));
    }
    
    graph.scalePoints(); // should be in constructor (?)
    graph.drawAxes(10);
    graph.drawCurve();
}
