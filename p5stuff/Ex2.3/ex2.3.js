let m;//declare mover array


function setup(){
	createCanvas(800,800);
	m = [];//initiata mover array


}

function draw(){
	background(255);
	//make movers do their thing
	for (let i = 0; i<m.length; i++){
		m[i].checkEdges();
		m[i].applyForce(m[i].edgeForce());
		m[i].applyForce(m[i].gravity);
		m[i].update();
		m[i].draw();
	}
}

//create new mover when mouse is pressed
function mousePressed(){
	m.push( new Mover(random(20,70),createVector(mouseX, mouseY)));
}

//Mover class
class Mover{
	constructor(mass, loc){
		this.mass = mass;//its mass
		this.loc = loc;//the location
		this.vel = createVector(0,0);//initiate velocity at 0
		this.gravity = createVector(0,0.1*mass);//gravity force proportional to mass
		this.vel.limit(20);//not too fast
		this.acc = createVector(0,0);//acelleration
	}

	update(){
		//motion 101
		this.vel.add(this.acc);
		this.loc.add(this.vel);

		//reset acelleration
		this.acc.mult(0);
	}
	draw(){
		fill(200);
		stroke(0);
		ellipse(this.loc.x, this.loc.y, this.mass, this.mass);//size proportional to mass
	}

	applyForce(force){
		this.acc.add(p5.Vector.div(force, this.mass));
	}
	//make forces push from edges
	edgeForce(){
		let m = 1000;//how strong is the edgeForce?
		let f = createVector(0,0);//start at no force
		if (this.loc.x < width/2){
			f.x = m/this.loc.x;
		}else{
			f.x = -m/(width - this.loc.x);
		}
		if (this.loc.y < height/2){
			f.y = m/this.loc.y;
		}else{
			f.y = -m/(height - this.loc.y);
		}
		return f;
	}

	//no getting out
	checkEdges(){
		let k = 2;//To avoid dividing by zero in our edgeForce function
		if(this.loc.x < k){
			this.loc.x = k;
		}else if (this.loc.x > width - k){
			this.loc.x = widht - k;
		}
		if(this.loc.y < k){
			this.loc.y = k;
		}else if (this.loc.y > height-k){
			this.loc.y = height-k;
		}
	}
	
}