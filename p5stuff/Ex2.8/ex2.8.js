let m;//mover array
let a;//attractor array
let trail;
function setup(){
	createCanvas(800,800);
	background(255);
	trail = false;
	m = [];
	a = [];
}

function draw(){
	//trail or not
	if (!trail){
		background(255);
	}
	
	//draw the attractors
	for (let k = 0; k<a.length;k++){
		a[k].display();
	}

	for (let i = 0; i<m.length; i++){
		m[i].checkEdges();

		//loop through the attractors to fetch and apply their attraction
		for (let j = 0; j<a.length;j++){
			m[i].applyForce(a[j].attract(m[i]));
		}
		m[i].update();
		m[i].display();
		
	}

}

//press mouse to create mover
function mousePressed(){
	m.push(new Mover());
}

//press mouse to make attractor
function keyPressed(){
	if (keyCode === ENTER){
		a.push(new Attractor());
	}

	//press space bar to toggle trails
	if(keyCode === 32){
		if (trail){
			trail = false;
		}else{
		trail = true;
	}
	}
}


class Mover{
	constructor(){
		this.loc = createVector(mouseX, mouseY);
		this.vel = createVector(0,0);
		this.acc = createVector(0,0);
		this.mass = random(40, 100);

	}

	update(){
		//motion 101
		this.vel.add(this.acc);
		this.loc.add(this.vel);

		this.acc.mult(0);
	}

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

	display(){
		fill(200);
		stroke(0);
		ellipse(this.loc.x, this.loc.y, this.mass, this.mass);
	}

	applyForce(force){
		let f = p5.Vector.div(force, this.mass);
		this.acc.add(f);
	}
}

class Attractor{
	
	constructor(){
		this.loc = createVector(mouseX, mouseY);
		this.mass = random(100, 170);
		this.G = 1;
	}

	//Recieve a mover object, return a force
	attract(m){
		let force = p5.Vector.sub(this.loc, m.loc);
		let distance = force.mag();
		distance = constrain(distance, 5, 30);

		force.normalize();
		let strength = (this.G*this.mass*m.mass)/(distance*distance);
		force.mult(strength);
		return force;
	}

	//draw the attractor
	display(){
		fill(0);
		ellipse(this.loc.x, this.loc.y, this.mass, this.mass);
	}
}