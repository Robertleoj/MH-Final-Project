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
		translate(this.loc.x, this.loc.y);
		rotate(this.angle);

		//draw the triangle
		fill(255);
		stroke(0);
		triangle(20, 0, -10, 14, -10, -14);

		//draw the two squares
		//check the red variable
		if (this.red){fill(255, 0, 0);}else{fill(255);}
		stroke(0);
		rect(-15, -10,5, 5); 

		//check the red variable
		if (this.red){fill(255, 0, 0);}else{fill(255);}
		stroke(0);
		rect(-15, 5, 5, 5);

		//reset the red variable to false
		this.red = false;
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