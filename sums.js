// Currently, max n === length of points array
// should points array be standard length regardless of
// width? seems trivial, 1px per points offer enoguh accuacy
'use strict'

class Sums {
    constructor(n, points, xRange) {
        this.n = n;
        this.points = points;
        this.dx = xRange / n;
        // DX IS NOT RELATED TO THE NUMBER OF TOTAL POINTS, THIS
        // IS DETERMINED BY WINDOW WIDTH. DX IS RELATED TO
        // THE RANGE OF X VALUES
        this.pixelInterval = points.length / n;
        // temp solution? ideally, LH(2) and LH(4) == 0...
        // this keeps track of the PIXEL value of dx for stepping
        // through the array of points, whereas this.dx is directly
        // related to the xrange the points [a, b]
        //console.log(this.n + ' ' + this.dx);
        //console.log(this.points);
    }

    leftHand() {
        var sum = 0;
        for (var i = 0; i < this.n; i++) {
            sum += this.points[Math.round(i * this.pixelInterval)] * this.dx;
        }
        return sum;
    }

    rightHand() {
        var sum = 0;
        for (var i = 1; i <= this.n; i++) {
            sum += this.points[Math.round(i * this.pixelInterval) - 1] * this.dx;
        }
        return sum;
    }

    trapezoid() {
        var sum = 0;
        sum += this.points[0];
        sum += this.points[this.points.length - 1];
        for (var i = 1; i < this.n; i++) {
            sum += 2 * this.points[Math.round(i * this.pixelInterval)];
        }
        sum *= this.dx;
        sum *= .5;
        return sum;
    }

    actual() {
        // can use reduce here
        // another case where, if im smarter about how i store points,
        // i should be able to get 0 here on sin(x) etc...
        // think the answer is standardize points array to something wider
        // than average display, maybe 10,000? then will have constant pixel
        // interval
        var sum = 0;
        for (var i = 0; i < this.points.length; i++) {
            sum += this.points[i];
        }
        return sum / this.pixelInterval;
        //return this

    }
    
    setN(n) {
        this.n = n; 
        this.dx = this.points.length / n;
        this.pixelInterval = this.points.length / n;
    }
    
    // setPoints(points) {
    //     this.points = points;
    //     this.dx = points.length / this.n;
    // }
}
