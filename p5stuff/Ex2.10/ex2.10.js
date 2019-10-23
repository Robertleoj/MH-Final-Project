let m;//mover array
let a;
let trail;
function setup(){
	createCanvas(800,800);
	background(255);
	trail = false;
	m = [];
	a = new Attractor();
}

function draw(){
	//trail or not
	if (!trail){
		background(255);
	}

	for (let i = 0; i<m.length; i++){
		m[i].checkEdges();

		//loop through the movers to fetch and apply their attraction
		for (let j = 0; j<m.length;j++){
			if(j!=i){
				m[i].applyForce(m[j].attract(m[i]));
			}
		}
		m[i].applyForce(a.attract(m[i]));
		m[i].update();
		m[i].display();
		
	}

}

//press mouse to create mover
function mousePressed(){
	m.push(new Mover());
}

//press space for trails
function keyPressed(){

	//press space bar to toggle trails
	if(keyCode === 32){
		trail = !trail;
	}
	
}


class Mover{
	constructor(){
		this.loc = createVector(mouseX, mouseY);
		this.vel = createVector(0,0);
		this.acc = createVector(0,0);
		this.mass = random(40, 100);
		this.G = 0.4;

	}
//--------------------------------------------------------------------------
	update(){
		//motion 101
		this.vel.add(this.acc);
		this.loc.add(this.vel);

		this.acc.mult(0); 
	}
//------------------------------------------------------------------------
	checkEdges(){

		//check x coordinates
		if(this.loc.x < 1){
			this.loc.x = 1;
		}else if(this.loc.x > width-1){
			this.loc.x = width-1;
		}

		//check y coordinates
		if(this.loc.y < 1){
			this.loc.y = 1;
		}else if(this.loc.y > height-1){
			this.loc.y = height-1;
		}
	}
//-------------------------------------------------------------------------
	display(){
		fill(200);
		stroke(0);
		ellipse(this.loc.x, this.loc.y, this.mass, this.mass);
	}
//-----------------------------------------------------------------------
	applyForce(force){
		let f = p5.Vector.div(force, this.mass);
		this.acc.add(f);
	}
//---------------------------------------------------------------------
	attract(m){
		let force = p5.Vector.sub(this.loc, m.loc);
		let distance = force.mag();
		distance = constrain(distance, 10, 30);

		force.normalize();
		//not the minus sign, this will repell in this case
		let strength = -(this.G*this.mass*m.mass)/(distance*distance);
		force.mult(strength);
		return force;
	}
}
//this will represent the mouse as an attractor
class Attractor{
	
	constructor(){
		this.G = 1;
		this.mass = 100;
	}

	//Recieve a mover object, return a force
	attract(m){
		let mouse = createVector(mouseX, mouseY);
		let force = p5.Vector.sub(mouse , m.loc);
		let distance = force.mag();
		distance = constrain(distance, 10, 30);

		force.normalize();
		let strength = (this.G*this.mass*m.mass)/(distance*distance);
		force.mult(strength);
		return force;
	}
}