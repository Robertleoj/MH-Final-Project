let ant;
let movers;

function setup(){
	createCanvas(800, 800);
	ant = new Peculiar();
	movers = [];//the movers array
	//make all the legs and feelers width confusing coordinates
	movers.push(new Oscillator(createVector(-60, 55), createVector(-100, 140), createVector(15, 10), createVector(PI, PI)));
	movers.push(new Oscillator(createVector(-60,-55), createVector(-100,-140), createVector(15, 10)));
	movers.push(new Oscillator(createVector(60, 55), createVector(100, 140), createVector(15, 10), createVector(PI,PI)));
	movers.push(new Oscillator(createVector(60, -55), createVector(100, -140), createVector(15, 10)));
	movers.push(new Oscillator(createVector(150, 30), createVector(240, 70), createVector(15,15)));
	movers.push(new Oscillator(createVector(150, -30), createVector(240, -70), createVector(15,15)));
	
}

function draw(){
	background(255);
	translate(width/2, height/2);
	ant.draw();
	for(let i = 0; i<movers.length;i++){
		movers[i].draw();
	}
}

class Oscillator{
	constructor(loc1, loc2, amplitude, angle = createVector(0,0)){

		this.loc1 = loc1;//beginning of line
		this.loc2 = loc2;//end of line
		this.angle = angle;;
		this.amplitude = amplitude;
		this.vel = createVector(0.4, 0.01);


	}

	draw(){
		//line from loc1 to loc2 with circle at the end
		this.angle.add(this.vel);
		let x = map(sin(this.angle.x)*this.amplitude.x, -this.amplitude.x, this.amplitude.x,
					this.loc2.x -this.amplitude.x, this.loc2.x + this.amplitude.x);
		let y = map(sin(this.angle.y)*this.amplitude.y, -this.amplitude.y, this.amplitude.y,
					this.loc2.y -this.amplitude.y, this.loc2.y + this.amplitude.y);
		strokeWeight(5);
		line(this.loc1.x, this.loc1.y, x, y);	
		fill(0);
		ellipse(x, y, 10, 10);
	}

}

class Peculiar{
	constructor(){

	}

	draw(){
		
		fill(0);
		ellipse(0,0, 60, 60);
		fill(0);
		ellipse(-60, 0, 110,110);
		fill(0);
		ellipse(60, 0, 110, 110);
		fill(0);
		ellipse(130, 0, 80, 80);
		
	}
}