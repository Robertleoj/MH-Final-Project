let pos;
let vel;
let bsize;
let ssize;
let red;
function setup(){
	createCanvas(800,800, WEBGL);
	pos = createVector(0,0,0);
	vel = p5.Vector.random3D().mult(20);
	bsize = 250;
	ssize = 50;
	red = color(255,0,0);
}

function draw(){
	background(200);
	noFill();
	stroke(0);
	rotateX(frameCount*0.003);
	rotateY(frameCount*0.003);
	box(bsize*2);

	
	fill(0);
	if(pos.x + ssize>bsize || pos.x-ssize<-bsize){
		vel.x*=-1;
		fill(red);
	}
	if(pos.y+ssize>bsize||pos.y-ssize<-bsize){
		vel.y*=-1;
		fill(red);
	}
	if(pos.z+ssize>bsize||pos.z-ssize<-bsize){
		vel.z*=-1;
		fill(red);
	}
	pos.add(vel);
	noStroke();

	translate(pos.x, pos.y, pos.z);
	sphere(ssize);
}