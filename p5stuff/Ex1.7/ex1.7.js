let w;

function setup(){
	createCanvas(600,600);
	w = new walker();
}
function draw(){
	w.step();
	w.draw();
}

class walker{
	constructor(){
		this.x = width/2;
		this.y = height/2;
		this.t = 0
	}
	step(){
		let nv = noise(this.t);
		let nvmap = map(nv, 0,1,0,15)
		let p = p5.Vector.random2D().mult(nvmap);

		this.x += p.x;
		this.y += p.y;
		this.t +=0.01;
	}
	draw(){
		ellipse(this.x, this.y, 20,20);
	}
}