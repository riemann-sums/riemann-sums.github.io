'use strict'

// This class should do math / drawing in terms of pixels rather
// than real number values, i.e values should all be scaled to
// graph size. When window size is changed or function is changed,
// a new Graph object should be instantiated (or not? could have
// rescale function and setPoints())

class Graph {
    constructor(points, n, minX, maxX, minY, maxY) {
        // does graph need minX maxX? yes, for drawing ONLY
        // could be good to set constants for reused expressions,
        // i.e. yAxis and xAxis and yScale / xScale (this.maxY/this.yRange)
        // would be good to include padding in these constants as well
        
        this.sum = "leftHand";
        this.points = [];
        this.unscaledPoints = points;
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
        var yScale = (this.graphHeight)/ this.yRange;
        //var yScale = height / this.yRange;
        for (var i = 0; i < this.unscaledPoints.length; i++) {
            this.points[i] = 
                height *
                (this.maxY / this.yRange) -
                (this.unscaledPoints[i] * yScale);
        }
    }

    drawAxes(ticks) {
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

        for(var i = 0; i < ticks; i++) {
            // option to show grid lines, default to ticks
            // if ticks == 0 or none is passed, no ticks
            // also need option to show incrs of PI
            textSize(8);
            noStroke();
            fill(255);

            text(this.roundTo(-this.minX + (i * (this.xRange / ticks)), 3), 
                this.sideBarSize + (this.graphWidth / ticks) * i,
                height * (this.maxY/this.yRange) - 5);
            text(this.roundTo(-this.minY + (i * (this.yRange / ticks)), 3), 
                this.sideBarSize + this.graphWidth * (this.maxX / this.xRange) + 5,
                this.padding + this.graphHeight - i * (this.graphHeight / ticks));
        }
    }

    drawCurve() {
        fill(255);
        this.drawLH();
        for (var i = 0; i < this.points.length - 1; i++) {
            stroke(255);
            line(i + this.sideBarSize, this.points[i],
                i + this.sideBarSize + 1, this.points[i + 1]);
        }
    }

    roundTo(n, dec) {
        var factor = pow(10, dec);
        return Math.round(n * factor) / factor;
    }

    drawLH() {
        fill(0, 150, 255, 127);
        //this.dx = Math.round(this.points.length / this.n);
        this.dx = this.graphWidth / this.n;
        // BAD! SHOULD BE ABLE TO SET IN CONSTRUCTOR (UNDEFEINED?)
        console.log("dx: " + this.dx);
        console.log("n: " + this.n);
        var yScale = (height - 2 * this.padding)/ this.yRange;
        var scaledHeight;
        for (var i = 0; i < this.n; i++) {
            //console.log(i * this.dx);
            scaledHeight = this.unscaledPoints[Math.round(i * this.dx)] * yScale;
            rect(this.sideBarSize + i * this.dx,
                 this.points[Math.round(i * this.dx)], this.dx,
                 scaledHeight);
        }
    }

    // likely deserves it's own class eventually, needs to be passed Sums obj?
    // need to be clever about when I calculate area / estimations, could use
    // getters / setters
    // should be able to pass sums obj a string, i.e "leftHand" and it will
    // return that sum
    drawSidebar(sums) {
        textSize(width/50);
        fill(255);
        stroke(255);
        text("actual: " + this.roundTo(sums.actual(), 5), 20, 30);
            //this.padding, this.padding);
        text("sum: " + this.roundTo(sums.leftHand(), 5), 20, 50);
            //this.padding, 2 * this.padding);

    }
}
