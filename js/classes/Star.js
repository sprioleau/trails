import TrailElement from "./TrailElement.js";

export default class Star extends TrailElement {
	constructor({ x, y }) {
		super({ x, y });
		this.angle = 0;
		this.angleIncrement = 3;
		this.spikes = 5;
		this.rotation = (Math.PI / 2) * 3;
		this.step = Math.PI / this.spikes;
		this.innerRadius = 5;
		this.outerRadius = 10;
		this.point1 = this.x;
		this.point2 = this.y;
		this.maxSize = 70;
	}

	draw(c) {
		c.lineWidth = this.lineWidth;
		c.strokeStyle = `hsl(${this.hue}, 100%, 60%)`;

		c.save();
		c.globalAlpha = this.opacity;
		c.translate(this.x, this.y);
		c.rotate((this.angle * Math.PI) / 180);
		c.translate(-this.x, -this.y);

		// Reference: https://stackoverflow.com/questions/25837158/how-to-draw-a-star-by-using-canvas-html5
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

	update(deltaTime) {
		super.update(deltaTime);

		if (this.frameTimer <= this.timeInterval) {
			this.angle += this.angleIncrement;
			this.innerRadius += 1;
			this.outerRadius += 2;
			this.frameTimer += this.deltaTime;
		} else {
			this.frameTimer = 0;
		}

		if (this.innerRadius > this.maxSize) return (this.shouldRemove = true);
	}
}
