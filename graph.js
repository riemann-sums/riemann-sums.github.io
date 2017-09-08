'use strict'
// #1b1d1c B (27, 29, 28)

// #b0d68b g (176, 214, 139)
// #d56061 r (213, 96, 97)
// #ae89d5 p (174, 137, 213)
// #fda657 o (253, 166, 87)
// #63b1f0 b (99, 177 240)

// This class should do drawing in terms of pixels rather
// than real number values, i.e values should all be scaled to
// graph size.

// MOVE CONTROLS TO ON TOP OF GRAPH

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
        // if there is a seperate UI class, this.slider should be created there
        this.slider = new Slider(this.sideBarSize/2, height * 0.8, this.sideBarSize * 0.7);
        // points should be converted to pixel values here
        // this.scalePoints();
        // this.sums = new Sums(this.n, this.unscaledPoints, this.xRange);
    }

    setN(n) {
        this.n = n;
        this.sums.setN(n);
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
        this.sums = new Sums(this.n, this.unscaledPoints, this.xRange);
    }

    drawAxes(ticks) {
    	stroke(255);
        noFill();
        // Graph border
        rect(this.sideBarSize, this.padding,
            this.graphWidth, height - 2 * this.padding);
        
        // X axis 
    	line(this.sideBarSize, height * (this.maxY/this.yRange),
            this.graphWidth + this.sideBarSize, height * (this.maxY/this.yRange));
        
        // Y axis 
        line(width - this.padding - (this.graphWidth * (this.maxX / this.xRange)),
            this.padding,
            width - this.padding - (this.graphWidth * (this.maxX / this.xRange)),
            height - this.padding);

        for(var i = 0; i < ticks; i++) {
            // option to show grid lines, default to ticks
            // if ticks == 0 or none is passed, no ticks
            // also need option to show incrs of PI
            textSize(8);
            noStroke();
            fill(255);

            // X axis 
            text(this.roundTo(-this.minX + (i * (this.xRange / ticks)), 3), 
                this.sideBarSize + (this.graphWidth / ticks) * i,
                height * (this.maxY/this.yRange) - 5);

            // Y axis 
            text(this.roundTo(-this.minY + (i * (this.yRange / ticks)), 3), 
                width - this.padding - this.graphWidth * (this.maxX / this.xRange) + 5,
                this.padding + this.graphHeight - i * (this.graphHeight / ticks));
        }
    }

    drawCurve() {
        fill(255);
        var pixelConversion = this.points.length / this.graphWidth;
        var index = 0;
        for (var i = 0; i < this.graphWidth - 1; i++) {
            stroke(255);
            index = Math.round(i * pixelConversion);
            line(i + this.sideBarSize,
                this.points[index],
                i + this.sideBarSize + 1,
                this.points[index +  Math.round(pixelConversion)]);
        }
    }

    roundTo(n, dec) {
        var factor = pow(10, dec);
        return Math.round(n * factor) / factor;
    }

    drawTrapezoid() {
        var pixelConversion = this.points.length / this.graphWidth;
        //fill(221, 34, 85, 127);
        fill(213, 96, 97, 127);
        //this.dx = Math.round(this.points.length / this.n);
        this.dx = this.graphWidth / this.n;
        // BAD! SHOULD BE ABLE TO SET IN CONSTRUCTOR (UNDEFEINED?)
        // optimize this shit, obv need to be a variable of this
        var yScale = (this.graphHeight)/ this.yRange;
        var scaledHeight = 0;
        var index = 0;
        var nextIndex = 0;
        for (var i = 0; i < this.n; i++) {
            index = Math.round(i * this.dx * pixelConversion);
            nextIndex = Math.round((i + 1) * this.dx * pixelConversion) - 1;

            quad(this.sideBarSize + (i + 1) * this.dx, this.points[nextIndex],
                this.sideBarSize + i * this.dx, this.points[index],
                this.sideBarSize + i * this.dx, height * (this.maxY/this.yRange),
                this.sideBarSize + (i + 1) * this.dx, height * (this.maxY/this.yRange)); // :c
        }
    }

    drawLH() {
        var pixelConversion = this.points.length / this.graphWidth;
        //fill(0, 150, 255, 127);
        fill(174, 137, 213, 127);
        //this.dx = Math.round(this.points.length / this.n);
        this.dx = this.graphWidth / this.n;
        // BAD! SHOULD BE ABLE TO SET IN CONSTRUCTOR (UNDEFEINED?)
        // optimize this shit, obv need to be a variable of this
        var yScale = (this.graphHeight)/ this.yRange;
        var scaledHeight = 0;
        var index = 0;
        for (var i = 0; i < this.n; i++) {
            index = Math.round(i * this.dx * pixelConversion);
            scaledHeight = this.unscaledPoints[index] * yScale;
            rect(this.sideBarSize + i * this.dx, this.points[index],
                 this.dx, scaledHeight);
        }
    }

    drawRH() {
        var pixelConversion = this.points.length / this.graphWidth;
        // fill(176, 113, 232, 127);
        fill(99, 177, 240, 127);
        //this.dx = Math.round(this.points.length / this.n);
        this.dx = this.graphWidth / this.n;
        // BAD! SHOULD BE ABLE TO SET IN CONSTRUCTOR (UNDEFEINED?)
        var yScale = (this.graphHeight)/ this.yRange;
        var scaledHeight = 0;
        var index = 0;
        for (var i = 1; i < this.n + 1; i++) {
            index = Math.round(i * this.dx * pixelConversion);
            scaledHeight = this.unscaledPoints[index - 1] * yScale;
            rect(this.sideBarSize + i * this.dx, this.points[index - 1],
                 -this.dx, scaledHeight);
        }
    }

    // likely deserves it's own class eventually, needs to be passed Sums obj?
    // need to be clever about when I calculate area / estimations, could use
    // getters / setters
    // should be able to pass sums obj a string, i.e "leftHand" and it will
    // return that sum
    drawSidebar() {
        textSize(width/50);
        fill(255);
        stroke(255);
        text("actual: " + this.roundTo(this.sums.actual(), 7), 20, 30);
        text("LH: " + this.roundTo(this.sums.leftHand(), 5), 20, 60);
        text("RH: " + this.roundTo(this.sums.rightHand(), 5), 20, 90);
        // Active sums should be highlighted green
        fill(176, 214, 139);
        stroke(176, 214, 139);
        text("T: " + this.roundTo(this.sums.trapezoid(), 5), 20, 120);
        fill(255);
        stroke(255);
        text("n: " + this.n, 20, 150);
        this.slider.draw();
    }

    noSubRect(x, y, w, h) {
        rect(Math.floor(x), Math.floor(y), Math.ceil(w), Math.ceil(h));
    }
}
