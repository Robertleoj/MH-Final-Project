
let car;//declaring the car
function setup(){
	createCanvas(800,800);
	car = new Car();//initiating the car

}
function draw(){
	background(255);

	//relevant funtions
	car.update();
	car.checkEdges();
	car.display();

}

class Car{//The car class!

	constructor(){
		this.loc = createVector(width/2, height/2);//Start in the middle
		this.vel = createVector(0,0);//no velocity
		this.acc = createVector(0,0);
		this.vel.limit(10);//not too fast!

	}
	//update the rectangle
	update(){
		//We are simulating a gas pedal! Cars stop accellerating when you release the pedal
		this.acc.mult(0); 

		//accellerate if you tell it to
		if( keyIsDown(UP_ARROW)){
			this.acc.add(0.5);
		}
		if (keyIsDown(DOWN_ARROW)){
			this.acc.sub(0.5);
		}

		//motion 101
		this.vel.add(this.acc);
		this.loc.add(this.vel);
	}

	//check if rect is out of bounds
	//no velocity in y-axis, so no need to check for that
	checkEdges(){
		if (this.loc.x>width){
			this.loc.x = 0;
		}else if(this.loc.x < 0){
			this.loc.x = width;
		}
	}

	//draw the car!
	display(){
		fill(0)
		rect(this.loc.x - 20, this.loc.y -15, 40, 30);
	}

}