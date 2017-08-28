// Currently, max n === length of points array
// should points array be standard length regardless of
// width? seems trivial, 1px per points offer enoguh accuacy
'use strict'

class Sums {
    constructor(n, points) {
        this.n = n;
        this.points = points;
        this.dx = points.length / n;
    }

    leftHand() {
        var sum = 0;
        for (var i = 0; i < this.n; i++) {
            sum += this.points[i * this.dx];
        }
        return sum * this.dx;
    }

    rightHand() {
        var sum = 0;
        for (var i = 1; i <= this.n; i++) {
            sum += this.points[i * this.dx - 1];
        }
        return sum * this.dx;
    }

    trapezoid() {
        var sum = 0;
        sum += this.points[0];
        sum += this.points[this.points.length - 1];
        for (var i = 1; i < this.n; i++) {
            sum += 2 * this.points[i * this.dx];
        }
        sum *= this.dx;
        sum *= .5;
        return sum;
    }
    
    setN(n) {
        this.n = n; 
        this.dx = this.points.length / n;
    }
    
    setPoints(points) {
        this.points = points;
        this.dx = points.length / this.n;
    }
}
