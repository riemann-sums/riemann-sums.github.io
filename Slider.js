// Currently, max n === length of points array
// should points array be standard length regardless of
// width? seems trivial, 1px per points offer enoguh accuacy
'use strict'

class Slider {
    constructor(x, y, length) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.handleX = this.x - this.length / 2;
        this.position = 0;
        //this.sliderSize = length / 5;
        this.sliderSize = 14;
    }

    draw() {
        stroke(255);
        strokeWeight(0.5);
        line(this.x - this.length / 2, this.y, this.x + this.length/2, this.y);
        line(this.handleX, this.y - 7, this.handleX, this.y + 7);
        noFill();
        ellipse(this.handleX, this.y, this.sliderSize, this.sliderSize);
        //ellipse(this.x - this.length / 2 + this.position, this.y, this.sliderSize, this.sliderSize);
    }

    mouseOver() {
        return  dist(this.handleX,
                this.y, mouseX, mouseY) <= this.sliderSize;
    }

    inBounds() {
        if (this.getPortion() > 1) {
            console.log("over");
            this.handleX = this.x + this.length / 2;
            return false;
        }
        else if (this.getPortion() < 0) {
            console.log("under");
            this.handleX = this.x - this.length / 2;
            return false;
        }
        return true;
    }

    setPosition(x) {
        if (this.handleX <= this.x + this.length / 2 &&
            this.handleX >= this.x - this.length / 2) {
            
            this.handleX = x;
        }
        this.inBounds();
    }

    getPortion() {
        return (this.handleX - (this.x - this.length / 2)) / this.length;
    }

}
