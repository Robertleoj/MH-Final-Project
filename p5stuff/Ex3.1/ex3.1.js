
let angle;//angle of rotation
let baton;
let move;

function setup(){

	createCanvas(800,800);
	angle = 0;//initiate angle at 0
	baton = new Baton();

}

function draw(){
	translate(width/2, height/2);//move origin to middle
	background(255);
	rotate(angle);
	baton.draw();
	

	angle += 0.03;//increment angle
}

//completely unnececary Baton class
class Baton{
	constructor(){
		this.loc = createVector(0,0);
		this.dist = 200;
	}

	draw(){
		fill(0);
		ellipse(this.loc.x,this.loc.x-this.dist, 50,50);
		fill(0);
		ellipse(this.loc.x,this.loc.y +this.dist, 50,50);
		stroke(0);
		line(this.loc.x, this.loc.y-this.dist, 0, this.dist);

	}

}