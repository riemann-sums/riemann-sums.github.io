'use strict'

// This class should do math / drawing in terms of pixels rather
// than real number values, i.e values should all be scaled to
// graph size. When window size is changed or function is changed,
// a new Graph object should be instantiated (or not? could have
// rescale function and setPoints())

// Need to draw padding around graph
class Graph {
    constructor(points, n, minX, maxX, minY, maxY) {
        // does graph need minX maxX? yes, for drawing ONLY
        // DONT NEED W AND H ANYMORE, SHOULD BE ABLE TO SUB FOR
        // WIDTH / HEIGHT
        // could be good to set constants for reused expressions,
        // i.e. yAxis and xAxis and yScale / xScale (this.maxY/this.yRange)
        // would be good to include padding in these constants as well
        
        this.sum = "leftHand";
        this.points = points;
        this.n = n;                     // could be 0, updates when setN?
        this.dx = points.length / n;    // could be 0, updates when setN?
        this.minX = minX;
        this.maxX = maxX;
        this.minY = minY;
        this.maxY = maxY;

    	this.xRange = (minX + maxX);
    	this.yRange = (minY + maxY);

        this.padding = 15;

        this.sideBarSize = width * 0.20;
        this.graphWidth = width - this.sideBarSize - this.padding;
        this.graphHeight = height - this.padding * 2;
        // points should be converted to pixel values here
        // this.scalePoints(); ???
    }

    scalePoints() {
        // can use map here?
        // map would likely be more appropraite, no need to
        // mutate original []
        var yScale = (height - 2 * this.padding)/ this.yRange;
        //var yScale = height / this.yRange;
        for (var i = 0; i < this.points.length; i++) {
            this.points[i] = 
                height *
                (this.maxY / this.yRange) -
                (this.points[i] * yScale);
        }
    }

    drawAxes(ticks) {
        var roundTo = function (n, dec) {
            var factor = pow(10, dec);
            return Math.round(n * factor) / factor;
        }

    	stroke(255);
        noFill();
        //line(this.sideBarSize, 0, this.sideBarSize, height);
        rect(this.sideBarSize, this.padding, this.graphWidth, height - 2*this.padding)
        
        // X axis 
    	line(this.sideBarSize, height * (this.maxY/this.yRange),
            this.graphWidth + this.sideBarSize, height * (this.maxY/this.yRange));
        
        // Y axis 
        line(this.sideBarSize + this.graphWidth * (this.maxX/this.xRange), this.padding,
            this.sideBarSize + this.graphWidth * (this.maxX/this.xRange),
            height - this.padding);

        for(var i = 0; i <= ticks; i++) {
            // option to show grid lines, default to ticks
            // if ticks == 0 or none is passed, no ticks
            textSize(8);
            noStroke();
            fill(255);

            text(roundTo(-this.minX + (i * (this.xRange / ticks)), 3), 
                this.sideBarSize + (this.graphWidth / ticks) * i,
                height * (this.maxY/this.yRange) - 5);
            text(roundTo(-this.minY + (i * (this.yRange / ticks)), 3), 
                this.sideBarSize + this.graphWidth * (this.maxX / this.xRange) + 5,
                this.graphHeight - i * (this.graphHeight / ticks));
        }
    }

    drawCurve() {
        fill(255);
        for (var i = 0; i < this.points.length - 1; i++) {
            stroke(255);
            line(i + this.sideBarSize, this.points[i],
                i + this.sideBarSize + 1, this.points[i + 1]);
        }
    }
}
