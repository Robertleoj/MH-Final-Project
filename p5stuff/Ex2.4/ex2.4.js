
let m;//mover array
let p;//friction place array

function setup(){
	createCanvas(800,800);
	m = [];
	p = [];
}
function draw(){
	background(255);
	for (let j = 0; j<p.length;j++){
		p[j].draw();
	}
	for (let i = 0; i<m.length;i++){
		m[i].checkEdges();
		m[i].applyForce(m[i].gravity);
		for(let j = 0; j<p.length;j++){
			m[i].applyForce(m[i].createFriction(p[j]));
		}
		m[i].update();
		m[i].draw();
	}

}
function mousePressed(){
	m.push(new Mover());
}
function keyPressed(ENTER){
	
	randsize = random(150, 300);
	randmag = random(20,60);
	p.push(new frictionPlace(mouseX, mouseY, randsize, randmag));
}




class Mover{
	constructor(){
		this.loc = createVector(mouseX,mouseY);
		this.vel = createVector(0,0);
		this.acc = createVector(0,0);
		this.mass = random(20,70);
		this.gravity = createVector(0,0.5*this.mass);
	}

	update(){
		this.vel.add(this.acc);
		this.loc.add(this.vel);

		this.acc.mult(0);

	}

	checkEdges(){
		if (this.loc.x < 1 || this.loc.x > width-1){
			this.vel.x *= -1;
		}
		if (this.loc.y < 1 || this.loc.y >height-1){
			this.vel.y *= -1;
		}
	}

	applyForce(force){
		let a = p5.Vector.div(force, this.mass);
		this.acc.add(a);
	}
	createFriction(place){//place is a frictionplace
		if (this.loc.x > place.locx
				&& this.loc.x  < place.locx + place.size
				&& this.loc.y  > place.locy
				&& this.loc.y < place.locy + place.size){
			let friction = this.vel.copy();
			friction.normalize().mult(-1).mult(place.mag);
			return friction;
		}else{
			return createVector(0,0);
		}
		
	}

	draw(){
		fill(200);
		stroke(0);
		ellipse(this.loc.x, this.loc.y, this.mass, this.mass);
	}
}

class frictionPlace{
	constructor(locx, locy, size, mag){
		this.locx = locx
		this.locy = locy
		this.size = size;
		this.mag = mag;
	}
	draw(){
		fill(255, 0,0);
		noStroke();
		rect(this.locx, this.locy, this.size, this.size);
	}
}


