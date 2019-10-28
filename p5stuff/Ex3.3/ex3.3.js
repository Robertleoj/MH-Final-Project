//Program that makes a car that turns according to the arrow keys

let car;

function setup(){
	createCanvas(800,800);
	car = new Car();
}

function draw(){
	background(255);

	
	car.gas();
	car.applyForce(car.turnForce());
	car.checkEdges();
	car.update();
	car.draw();
}



class Car{
	constructor(){
		this.loc = createVector(width/2, height/2);
		this.vel = createVector(10,0);
		this.acc = createVector(0,0);
		this.speed = 10;
	}

	update(){
		this.vel.add(this.acc);
		this.loc.add(this.vel);
		if (this.speed<0){
			this.speed = 0;
		}
		this.vel.setMag(this.speed);
		this.acc.mult(0);
		
		

	}

	applyForce(force){
		this.acc.add(force);
	}

	draw(){
		let angle = this.vel.heading();
		fill(0);
		push();
		translate(this.loc.x, this.loc.y);
		rotate(angle);
		rectMode(RADIUS);
		rect(0,0, 30, 20);
		pop();
	}

	
	turnForce(){
		//create turn force
		//press arrow keys to steer
		let dir = this.vel.heading();
		let f = createVector(0,0);	

		
		if (keyIsDown(LEFT_ARROW)){
			f.add(p5.Vector.fromAngle(dir - PI/2));
		}

		if (keyIsDown(RIGHT_ARROW)){
			f.add(p5.Vector.fromAngle(dir + PI/2));
		}

		return f;
		
		
	}

	gas(){

		if (keyIsDown(UP_ARROW)){
			this.speed += 0.1;
		}

		if (keyIsDown(DOWN_ARROW)){
			this.speed -= 0.1;
		}
	}


	checkEdges(){
		if (this.loc.x > width){
			this.loc.x = 0;
		}
		if (this.loc.x < 0){
			this.loc.x = width;
		}
		if (this.loc.y > height){
			this.loc.y = 0;
		}
		if (this.loc.y < 0){
			this.loc.y = height;
		}

	}

}