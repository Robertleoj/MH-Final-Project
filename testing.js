
let explosion;

function setup(){
	createCanvas(800,800);
	explosion  = new ExplosionArray();

}

function draw(){	
	background(255);

	//run all the particles
	explosion.run();
	//explosion.revive();

	
	//to start us off
	
}

function mouseClicked(){
	explosion.explode(createVector(mouseX, mouseY));
}
class ExplosionArray{
	constructor(){
		this.explosions = [];

	}

	explode(loc){
		this.explosions.push(new Explosion(loc));
	}

	run(){
		for(let i = 0; i<this.explosions.length; i++){
			this.explosions[i].run();
		}

		for (let i = 0;i<this.explosions.length;i++){
			if(this.explosions[i].dead){
				this.explosions.splice(i, 1);
			}
		}
	
	}
}

class Explosion{
	constructor(loc){
		this.pArray = [];
		this.dead = false;
		this.loc = loc;
		this.lifeSpan = 200;


		for (let i = 0; i < 50;i++){
			this.pArray.push(new Particle(this.loc));
		}
	}

	run(){
		for (let i = 0;i<this.pArray.length;i++){
			this.pArray[i].run();
		}
		this.lifeSpan -= 1;
		/*
		//make 50 new particles
		if (this.pArray.length<50){
			
		}
		*/
		if(this.lifeSpan < 0){
			this.dead = true;
		}
	}

	/*
	revive(){
		//check if any of them are dead, if so then make a new one
		for (let i = 0;i<this.pArray.length;i++){
			if(this.pArray[i].dead){
				this.pArray.splice(i, 1);
				this.pArray.push(new Particle());
			}
		}
	}
	*/

}


class Particle{
	constructor(loc){//location vector
		this.loc = loc.copy();//initiate anywhere
		this.acc = createVector(0,0);
		this.vel = p5.Vector.fromAngle(random(TAU)).mult(random(5));//little bit of velocity

		this.life = random(130);
		this.initLifespan = this.life//grab the initial lifespan 4 l8r

		this.angle = 0;//angle of rotation
		this.angVel = random(0, 1);
		this.size = random(2, 10);

		this.dead = false;


		//red or yellow?
		this.redYellow = int(random(2));
	}

	run(){

		//do all the things if not dead
		if(!this.dead){
		this.update();
		this.display();
		//this.applyForce(this.outForce());
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

		if(this.redYellow === 0){
			fill(255, 0, 0, map(this.life, 0,this.initLifespan, 0, 255));
		}else{
			fill(255,238, 0, map(this.life, 0, this.initLifespan, 0, 255));
		}
		noStroke();
		rectMode(RADIUS);
		rect(0,0, this.size, this.size);
		pop();
	}

	//stolen function from ex2.3
	outForce(){
		let m = 10;//how strong is the edgeForce?
		let f = p5.Vector.fromAngle(random(TAU)).mult(m);
		return f;
	}
}
