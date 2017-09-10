// This is a button only applicable in MenuBar (along top of screen)
// Option updateFunction is called on each redraw

class Button {
	constructor(x, y, text, updateFunction, clickable = false) {
		this.x = x;
		this.y = y;
		this.text = text;
		this.updateFunction = updateFunction;
		this.active = true;
		this.clickable = clickable;
		this.textWidth;
	}

	draw() {
		if (this.active && this.clickable) {
			fill(176, 214, 139);
		} else {
			fill(255);
		}
		if (this.updateFunction) {
			text(this.text + this.updateFunction(), this.x, this.y);
		} else {
			text(this.text, this.x, this.y)
		}

		this.textWidth = textWidth(text + this.updateFunction());
	}

	mouseOver() {
		this.textWidth = textWidth(text + this.updateFunction());
		if ((mouseX - this.x) < this.textWidth / 2 && mouseX - this.x > 0 &&
			mouseY < this.y * 1.5) {
			return true;
		}
		return false;
	}

	toggle() {
		this.active = !this.active;
	}
}