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
		push()
		translate(this.loc.x, this.loc.y);
		rotate(this.angle);

		translate(width/2, height/2);
		noStroke();
		fill(255, 0, 0);
		triangle(-25,12.5, -25, 25, 0, 12.5);
		triangle(-25, 12.5, -25, 25, -50, 25);
		triangle(-25,-12.5, -25, -25, 0, -12.5);
		triangle(-25, -12.5, -25 ,-25, -50, -25);
		fill(0);
		ellipse(0,0,90, 30);
		fill(0);
		triangle(25,12.5, 25, -12.5, 60, 0);
		fill(255);
		ellipse(18, 0, 14, 14);
		fill(255);
		rect(-45, -12, 20, 24);
		fill(255, 0, 0);
		rect(-45, -3, 35, 6);
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