//asteroids game

let ship;

function setup(){
	createCanvas(800, 800);
	ship = new Spaceship();

}

function draw(){
	background(255);

	ship.thrust();
	ship.turn();
	ship.checkEdges();
	ship.update();
	ship.draw();

}

class Spaceship{

	constructor(){
		this.angle = 0;//angle the ship faces
		this.loc = createVector(height/2, width/2);
		this.vel = createVector(0,0);
		this.acc = createVector(0,0);
		this.red = false;//are the trusters engaged?
	}

	update(){
		this.vel.add(this.acc);
		this.loc.add(this.vel);


		this.acc.mult(0);

		//apply illogical space friction
		this.vel.mult(0.99);


	}

	draw(){
		//translate and rotate 
		let s = 3/4;
		push()
		translate(this.loc.x, this.loc.y);
		rotate(this.angle);
		noStroke();
		fill(255, 0, 0);
		triangle(-25*s,12.5*s, -25*s, 25*s, 0, 12.5*s);
		triangle(-25*s, 12.5*s, -25*s, 25*s, -50*s, 25*s);
		triangle(-25*s,-12.5*s, -25*s, -25*s, 0, -12.5*s);
		triangle(-25*s, -12.5*s, -25*s ,-25*s, -50*s, -25*s);
		fill(60);
		ellipse(0,0,90*s, 30*s);
	
		fill(255);
		ellipse(18*s, 0, 14*s, 14*s);
		fill(66, 135, 245);
		if (this.red){
			ellipse(-45*s, 0, 20*s,20*s);
			triangle(-65*s, 0, -45*s, -10*s, -45*s, 10*s);
		}
		
		fill(0);
		rect(-40*s, -12*s, 10*s, 24*s);
		fill(255, 0, 0);
		rect(-50*s, -3*s, 35*s, 6*s);
		this.red = false;
		pop();
	}

	thrust(){
		//up arrow to thrust(why would you use z?????)
		if (keyIsDown(UP_ARROW)){
			this.red = true;

			let force = p5.Vector.fromAngle(this.angle).mult(0.2);
			this.acc.add(force);
		}
	}

	checkEdges(){
		if (this.loc.x < 0){
			this.loc.x = width;
		}
		if (this.loc.x > width){
			this.loc.x = 0;
		}
		if (this.loc.y < 0){
			this.loc.y = height;
		}
		if (this.loc.y > height){
			this.loc.y = 0;
		}
	}

	turn(){
		//left and right arrow keys to turn the spaceship
		let angle = 0;
		if (keyIsDown(LEFT_ARROW)){
			angle -= 0.1;
		}
		if (keyIsDown(RIGHT_ARROW)){
			angle += 0.1;
		}
		this.angle += angle;
	}
}