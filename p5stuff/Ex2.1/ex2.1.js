
let t, a;//perlin noise incrementors
let baloon;
function setup(){
	t = 0;
	a = 10000;
	createCanvas(800,800);
	baloon = new Baloon();
}

function draw(){
	background(255);

	//relevant functions
	baloon.applyForce(createWind(t,a));
	baloon.checkEdges();
	baloon.update();
	baloon.draw();

	//increment perlin noise
	t+= 0.01;
	a+=0.01;

}

class Baloon{

	constructor(){
		this.loc = createVector(width/2, height/2);//initiate in the middle
		this.vel = createVector(0,0);//no velocity
		this.upF = createVector(0, -0.3);//the force up

	}

	applyForce(wind){
		this.force = createVector(0.0);//initiate force

		//add wind and force up
		this.force.add(wind);
		this.force.add(this.upF);

		//bounce force
		if(this.loc.x <= 0 || this.loc.x >=width){
			this.force.add( this.vel.x*-2,0);
		}
		if(this.loc.y < 0 || this.loc.y >height){
			this.force.add(0,this.vel.y*-2);

		}
		this.acc = this.force;
	}

	checkEdges(){
		if(this.loc.x < 0){
			this.loc.x =0;
		}else if(this.loc.x > width){
			this.loc.x = width;
		}
		if(this.loc.y < 0){
			this.loc.y =0;
		}else if(this.loc.y > height){
			this.loc.y = height;
		}
	}

	update(){
		//motion 101
		this.vel.add(this.acc);
		this.loc.add(this.vel);

		this.acc.mult(0);//reset acc
	}
	draw(){
		fill(200);
		stroke(0);
		ellipse(this.loc.x, this.loc.y, 100,100);

	}
	
}
//make the wind
function createWind(t, a){
	let dir = map(noise(t), 0, 1, 0, PI);//perlin direction
	let mag = map(noise(a), 0,1,0,0.1);//perlin magnitude
	let wind = p5.Vector.fromAngle(dir).mult(mag);
	return wind;
}

