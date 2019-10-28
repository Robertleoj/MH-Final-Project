//spiral drawer
let spiral;

function setup(){
	createCanvas(800,800);
	background(255);
	spiral = new Spiral();
}

function draw(){
	spiral.draw();
	spiral.move();

}

class Spiral{
	constructor(){
		//polar coordinates
		this.r = 0
		this.angle = 0;
	}
	draw(){
		translate(width/2, height/2);

		//make the polar into cartesian
		let x = this.r * cos(this.angle);
		let y = this.r* sin(this.angle);
		fill(0);
		ellipse(x, y, 7,7);

	}
	move(){
		this.r +=0.1;
		this.angle += 0.05;

	}
}
