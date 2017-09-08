// Currently, max n === length of points array
// should points array be standard length regardless of
// width? seems trivial, 1px per points offer enoguh accuacy
'use strict'

class Sums {
    constructor(n, points, xRange) {
        this.n = n;
        this.points = points;
        this.xRange = xRange;
        this.dx = this.xRange / n;
        this.pixelInterval = points.length / n;
    }

    leftHand() {
        var sum = 0;
        for (var i = 0; i < this.n; i++) {
            sum += this.points[Math.round(i * this.pixelInterval)];
        }
        return sum * this.dx;
    }

    rightHand() {
        var sum = 0;
        for (var i = 1; i <= this.n; i++) {
            sum += this.points[Math.round(i * this.pixelInterval) - 1];
        }
        return sum * this.dx;
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
        var initValue = this.points[0] + this.points[this.points.length - 1];
        var dx = this.xRange / this.points.length;
        return (dx/ 2) * this.points.reduce(function (sum, point) {
            return sum + 2 * point;
        }, initValue);
    }
    
    setN(n) {
        this.n = n; 
        this.dx = this.xRange / n
        this.pixelInterval = this.points.length / n;
    }
}
