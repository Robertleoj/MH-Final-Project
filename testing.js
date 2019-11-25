let v;


function setup(){
	createCanvas(800,800, WEBGL);
	v = new VectorV();
}

function draw(){
	v.draw();

}


class VectorV{
	constructor(){
		this.v = createVector(200,0,0);
	}

	draw(){
		strokeWeight(5);
		line(0,0,0, this.v.x, this.v.y, this.v.z);
		let angle = createVector(200,0).heading();
		push();
		translate(this.v.x, this.v.y, this.v.z);
		rotateY(angle);
		fill(0);
		cone(30, 20);
		pop();
	}
}