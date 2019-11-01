
let pArray;

function setup(){
	createCanvas(800,800);
	pArray = [];

}

function draw(){	
	background(255);

	//run all the particles
	for (let i = 0;i<pArray.length;i++){
		pArray[i].run();
	}

	//check if any of them are dead, if so then make a new one
	for (let i = 0;i<pArray.length;i++){
		if(pArray[i].dead){
			pArray.splice(i, 1);
			pArray.push(new Particle());
		}
	}
	
	//to start us off
	if (pArray.length<20){
		pArray.push(new Particle());
	}
}


class Particle{
	constructor(){
		this.loc = createVector(random(width), random(height));//initiate anywhere
		this.acc = createVector(0,0);
		this.vel = p5.Vector.fromAngle(random(TAU)).mult(random(5));//little bit of velocity

		this.life = random(1000);
		this.initLifespan = this.life//grab the initial lifespan 4 l8r

		this.angle = 0;//angle of rotation
		this.angVel = random(0, 1);
		this.size = random(10, 40);

		this.dead = false;

	}

	run(){

		//do all the things if not dead
		if(!this.dead){
		this.update();
		this.display();
		this.applyForce(this.edgeForce());
		}
	}

	update(){
		//
		this.vel.add(this.acc);
		this.loc.add(this.vel);
		this.angle +=this.angVel;//increment angle
		this.isDead();
		this.life -= 2;//decreasing lifespan
		this.acc.mult(0);
	}

	isDead(){
		//is the damn thing dead?
		if (this.life < 0){
			this.dead = true;
		}
	}

	applyForce(f){
		this.acc.add(f);
	}

	display(){
		//map its remaining lifespan to its alpha
		push();
		translate(this.loc.x, this.loc.y);
		rotate(this.angle);
		fill(0, map(this.life, 0,this.initLifespan, 0, 255));
		noStroke();
		rectMode(RADIUS);
		rect(0,0, this.size, this.size);
		pop();
	}

	//stolen function from ex2.3
	edgeForce(){
		let m = 100;//how strong is the edgeForce?
		let f = createVector(0,0);//start at no force
		if (this.loc.x < width/2){
			f.x = m/this.loc.x;
		}else{
			f.x = -m/(width - this.loc.x);
		}
		if (this.loc.y < height/2){
			f.y = m/this.loc.y;
		}else{
			f.y = -m/(height - this.loc.y);
		}
		return f;
	}
}
