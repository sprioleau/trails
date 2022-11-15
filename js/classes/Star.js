import TrailElement from "./TrailElement.js";

export default class Star extends TrailElement {
	constructor({ x, y }) {
		super({ x, y });
		this.angle = 0;
		this.angleIncrement = 3;
    this.spikes = 5;
    this.rotation = (Math.PI / 2) * 3;
    this.step = Math.PI / this.spikes;
		this.innerRadius = 10;
		this.radiusRange = 10;
		this.outerRadius = this.innerRadius + this.radiusRange;
    this.point1 = this.x;
    this.point2 = this.y;
    this.maxSize = 50;
	}

	draw(c) {
		c.lineWidth = this.lineWidth;
		c.strokeStyle = `hsl(${this.hue}, 100%, 60%)`;

    c.save();
    c.globalAlpha = this.opacity;
    c.translate(this.x, this.y)
		c.rotate(this.angle * Math.PI / 180);
		c.translate(-(this.x), -(this.y))

		c.beginPath();
    c.moveTo(this.x, this.y - this.outerRadius);
    
		for (let i = 0; i < this.spikes; i++) {
			this.point1 = this.x + Math.cos(this.rotation) * this.outerRadius;
			this.point2 = this.y + Math.sin(this.rotation) * this.outerRadius;
			c.lineTo(this.point1, this.point2);
			this.rotation += this.step;

			this.point1 = this.x + Math.cos(this.rotation) * this.innerRadius;
			this.point2 = this.y + Math.sin(this.rotation) * this.innerRadius;
			c.lineTo(this.point1, this.point2);
			this.rotation += this.step;
    }
    
		c.lineTo(this.x, this.y - this.outerRadius);
		c.closePath();
    c.stroke();
		c.restore();
	}

	update() {
		super.update();
		if (this.frames % this.frameRate !== 0) return;
    this.angle += this.angleIncrement;
    this.innerRadius++;
		this.outerRadius+=2;
		this.radiusRange++;
		if (this.innerRadius > this.maxSize) return (this.shouldRemove = true);
	}
}
