// TODO: 
// -[ ] autoscale on window resize
// -[ ] padding around graph
// -[ ] simple UI controls, scaling text
// -[ ] 'usable' on mobile
// -[ ] comments on parsing code, credit to knexcar

var windowW = window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;
var windowH = window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

function setup() {
	var testPoints = [];
	var graph = new Graph(testPoints, 10, 5, 5, 1, 1, windowW, windowH);
    createCanvas(windowW, windowH);
    for (var i = 0; i < graph.graphWidth; i++) {
        testPoints.push(sin(i / 100));
    }
    background(0);
    graph.scalePoints(); // should be in constructor (?)
    graph.drawAxes(10);
    graph.drawCurve();
}
