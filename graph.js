'use strict'

// This class should do math / drawing in terms of pixels rather
// than real number values, i.e values should all be scaled to
// graph size. When window size is changed or function is changed,
// a new Graph object should be instantiated (or not? could have
// rescale function and setPoints())

// Need to draw padding around graph
class Graph {
    constructor(points, n, minX, maxX, minY, maxY, w, h) {
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

        this.windowW = w;
        this.windowH = h;
        this.padding = 10;

        this.sideBarSize = windowW * 0.20;
        this.graphWidth = windowW - this.sideBarSize - this.padding;
        // points should be converted to pixel values here
        // this.scalePoints(); ???
    }

    scalePoints() {
        // can use map here?
        // map would likely be more appropraite, no need to
        // mutate original []
        var yScale = (this.windowH - 2 * this.padding)/ this.yRange;
        var yScale = this.windowH / this.yRange;
        for (var i = 0; i < this.points.length; i++) {
            this.points[i] = 
                this.windowH *
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
        line(this.sideBarSize, 0, this.sideBarSize, height);
        
        // X axis 
    	line(this.sideBarSize, this.windowH * (this.maxY/this.yRange),
            this.graphWidth + this.sideBarSize, this.windowH * (this.maxY/this.yRange));
        
        // Y axis 
        line(this.sideBarSize + this.graphWidth * (this.maxX/this.xRange), this.padding,
            this.sideBarSize + this.graphWidth * (this.maxX/this.xRange),
            windowH - this.padding);

        for(var i = 0; i <= ticks; i++) {
            // option to show grid lines, default to ticks
            // if ticks == 0 or none is passed, no ticks
            textSize(8);
            noStroke();
            fill(255);

            text(roundTo(-this.minX + (i * (this.xRange / ticks)), 5), 
                this.sideBarSize + (this.graphWidth / ticks) * i,
                this.windowH * (this.maxY/this.yRange) - 5);
            text(roundTo(-this.minY + (i * (this.yRange / ticks)), 5), 
                this.sideBarSize + this.graphWidth * (this.maxX / this.xRange) + 5,
                this.windowH - i * (this.windowH / ticks));
        }
    }

    drawCurve() {
        fill(255);
        for (var i = 0; i < this.points.length - 1; i++) {
            //ellipse(i + this.sideBarSize, this.points[i], 1, 1);
            stroke(255);
            line(i + this.sideBarSize, this.points[i],
                i + this.sideBarSize + 1, this.points[i + 1]);
        }
    }
}
