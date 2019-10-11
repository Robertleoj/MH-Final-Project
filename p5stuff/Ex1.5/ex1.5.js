let w;
function setup(){
	createCanvas(500,500);
	w = new Walker(4, 2);
}
	
function draw(){
	w.draw();
	w.step();
}
class Walker{
	constructor(mean, sd){
		this.x = width/2;
		this.y = height/2;
		this.mean = mean;
		this.sd = sd;
	}
	step(){
		let num = randomGaussian(this.mean,this.sd);
		let v = p5.Vector.random2D().mult(num);
		this.x += v.x;
		this.y += v.y;

	}
	draw(){
		fill(255);
		ellipse(this.x, this.y, 2,2);
	}
}