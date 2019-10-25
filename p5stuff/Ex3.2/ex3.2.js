/*
Program that simulates a canon that can fire red squares
that have angular spin.
*/


let canon;
let squares;

function setup(){
	createCanvas(1400,800);
	canon = new Canon();
	squares = [];
}

function draw(){
	background(102, 159, 250);

	//draw the ground
	fill(0,255, 0);
	noStroke();
	rect(0, (0.85)*height, width, 0.15*height);

	canon.checkArrows();

	//draw the squares
	for(let i = 0;i<squares.length;i++){
		squares[i].update();
		squares[i].checkGround();
		squares[i].applyForce(squares[i].gravity);
		squares[i].draw();
	}

	//draw the canon
	canon.draw();
}

//press space to fire
function keyPressed(){
	if (keyCode === 32){
		//make new CanonSquare
		squares.push(new CanonSquare(canon.loc))

		//fire the CanonSquare
		squares[squares.length -1].applyForce(canon.fire(squares[squares.length-1]));

	}
}


class CanonSquare{
	constructor(loc){//input location of canon
		this.dead = false;
		this.loc = loc.copy();
		this.vel = createVector(0,0);
		this.acc = createVector(0,0);

		this.mass = random(5,15);
		this.gravity = createVector(0, this.mass);

		this.angle = 0;
		this.angVel = random(1);
	}



	update(){
		if (this.dead ===false){
			this.angle += this.angVel;
			this.vel.add(this.acc);
			this.loc.add(this.vel);
			this.acc.mult(0);
		}
		
	}


	draw(){
		push();
		translate(this.loc.x, this.loc.y);
		rotate(this.angle);
		rectMode(RADIUS);
		fill(255, 0, 0);
		noStroke();
		rect(0,0, 28, 28);
		pop();
	}

	applyForce(force){
		let f = p5.Vector.div(force, this.mass);
		this.acc.add(f);
	
	}

	checkGround(){
		if (this.loc.y> 0.90*height){
			this.dead = true;
		}
	}
}

class Canon{

	constructor(){
		this.loc = createVector(width/7, 0.82*height);
		this.angle = -PI/4;

	}

	fire(object){
		//make force to shoot the object
		let force = p5.Vector.fromAngle(this.angle).mult(300);
		return force;
	}

	increaseAngle(num){
		this.angle -= num;
	}
	decreaseAngle(num){
		this.angle += num;
	}

	//press arrow kays to turn the canon
	checkArrows(){
		if (keyIsDown(UP_ARROW)){
			this.increaseAngle(0.1);
		}
		if (keyIsDown(DOWN_ARROW)){
			this.decreaseAngle(0.1);
		}
	}

	draw(){
		fill(139, 69, 19);
		noStroke();
		triangle(this.loc.x, this.loc.y, this.loc.x-60,this.loc.y+ 60,
				 this.loc.x + 60, this.loc.y + 60);


		push();
		translate(this.loc.x, this.loc.y);
		rotate(this.angle);
		fill(0);
		ellipse(0, 0, 100, 100);
		fill(0);
		rect(0, -40, 100,80 );
		pop();
	}
}
