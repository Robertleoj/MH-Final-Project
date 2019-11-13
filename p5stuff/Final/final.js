let img;
let canon;
let squares;
let planets;

//for testing
let enemies;

function setup(){
	createCanvas(1200,800);
	makeBackground();
	canon = new Canon();
	squares = [];
	enemies = new EnemyArray();
	planets = new PlanetArray();
	planets.makePlanet(width/2);
}

function draw(){
	//put the background in place
	image(img, 0,0, width, height);
	//spin the canon
	canon.checkArrows();
	fire();

	//do the requisite planet functions
	planets.maybePlanet();
	planets.attract(squares);
	planets.checkImpact(squares);
	planets.checkImpact(enemies.enemies);
	planets.checkEdge();
	planets.checkIfDead();

	enemies.checkImpact(squares);
	enemies.run();
	

	//squares functions
	for(let i = 0;i<squares.length;i++){

		squares[i].update();
		squares[i].checkEdges();
		squares[i].draw();
	}

	//draw the planets
	planets.display();

	//draw the canon
	canon.draw();

	//remove dead squares
	for (let i = 0;i<squares.length;i++){
		if (squares[i].dead ===true){
			squares.splice(i, 1);
		}
	}


}
function fire(){
	if (keyIsDown(32)){
		//make new CanonSquare
		squares.push(new CanonSquare(canon.loc))

		//fire the CanonSquare
		squares[squares.length -1].applyForce(canon.fire(squares[squares.length-1]));

	}
}

class EnemyArray{
	constructor(){
		this.enemies = [];
		this.prob = 2;//probability of new enemy
	}
	run(){
		this.maybeEnemy();
		this.move();
		this.update();
		this.checkEdges();
		this.checkIfDead();
		this.display();
	}

	display(){
		for(let i = 0;i<this.enemies.length;i++){
			this.enemies[i].display();
		}
	}

	move(){
		for(let i =0;i<this.enemies.length;i++){
			this.enemies[i].move();
		}
	}

	//is it dead?
	checkIfDead(){
		for(let i = 0;i<this.enemies.length; i++){
			if (this.enemies[i].dead === true){
				this.enemies.splice(i, 1);
			}
		}
	}

	update(){
		for(let i = 0;i<this.enemies.length; i++){
			this.enemies[i].update();
		}
	}


	checkEdges(){
		for(let i = 0; i<this.enemies.length; i++){
			this.enemies[i].checkEdges();
		}
	}

	//make a planet with the given x coordinate
	makeEnemy(){
		this.enemies.push(new Enemy());
	}

	//small chance of a new planet appearing
	maybeEnemy(){
		let randnum = random(100);
		if (randnum < this.prob){
			this.makeEnemy();
			this.prob += 0.03;
		}
	}

	checkImpact(objArray){
		for (let i = 0;i<this.enemies.length;i++){
			for (let k = 0; k< objArray.length;k++){

			this.enemies[i].checkImpact(objArray[k]);
			}
		}
	}
}


class Enemy{

	constructor(){
		this.rightForce = 0.1;
		this.dead = false;
		this.loc = createVector(0, random(height));
		this.vel = p5.Vector.fromAngle(0);
		this.acc = createVector(0,0);
	}

	update(){
		this.vel.add(this.acc);
		this.loc.add(this.vel);

		this.acc.mult(0);
	}

	applyForce(force){
		this.acc.add(force);
	}

	checkImpact(obj){
		let radius = p5.Vector.dist(this.loc, obj.loc);
		if (radius < 30){
			obj.die();
			this.die();
		}
		
	}

	display(){
		//translate and rotate 
		let angle = this.vel.heading();
		push();
		translate(this.loc.x, this.loc.y);
		rotate(angle);

		//draw the triangle
		fill(255);
		stroke(0);
		triangle(20, 0, -10, 14, -10, -14);

		//draw the two squares
		fill(255, 0, 0);
		stroke(0);
		rect(-15, -10,5, 5); 

		fill(255, 0, 0);
		stroke(0);
		rect(-15, 5, 5, 5);
		pop();
	}

	die(){
		this.dead = true;
	}

	move(){
		let dist;
		//check whether it is closer
		if (this.loc.y > height/2){
			dist = this.loc.y - height;
		}else{
			dist = this.loc.y;
		}
		let force = createVector(this.rightForce, dist/1000);
		this.applyForce(force);
	}

	checkEdges(){
		if (this.loc.x < 0){
			this.die();
		}
		if (this.loc.x > width){
			this.die();
		}
		if (this.loc.y < 0){
			this.die();
		}
		if (this.loc.y > height){
			this.die();
		}
	}
}

//press space to fire canon



//make the perlin noise background and save in image
function makeBackground(){
	img = createImage(width, height);

	img.loadPixels();
	let xoff = 0;
	for (let i = 0; i < width; i++){

		let yoff = 0;

		for (let j = 0; j<height; j++){

			let col = map(noise(xoff, yoff), 0,1,0,255);
			img.set(i, j, color(col, col, 0));


			yoff+=0.01;

		}
		xoff+=0.01;
	}
	img.updatePixels();

	
}

class CanonSquare{
	constructor(loc){//input location of canon
		this.dead = false;
		this.loc = loc.copy();
		this.vel = createVector(0,0);
		this.acc = createVector(0,0);
		this.angle = 0;
		this.angVel = random(1);
	}

	//kill it
	die(){
		this.dead = true;
	}
	
	//only update if alive
	update(){
		if (this.dead ===false){
			//this.angle += this.angVel;
			this.vel.limit(30).add(this.acc);
			this.loc.add(this.vel);
			this.acc.mult(0);
		}
		
	}

	checkEdges(){
		if (this.loc.x < -30){
			this.dead = true;
		}
		if (this.loc.x > width+30){
			this.dead = true;
		}
		if (this.loc.y < -30){
			this.dead = true;
		}
		if (this.loc.y > height+30){
			this.dead = true;
		}
	}


	//only draw if alive
	draw(){
		if(this.dead === false){
			push();
			translate(this.loc.x, this.loc.y);
			let angle = this.vel.heading();
			rotate(angle);
			//rotate(this.angle);
			//rectMode(RADIUS);
			fill(255, 0, 0);
			noStroke();
			//rect(0,0, 14, 14);
			triangle(20, 0, -10, 14, -10, -14);
			pop();
		}
	}

	applyForce(force){
		this.acc.add(force);
	}
}

class Canon{

	constructor(){
		this.loc = createVector(width-15, height/2);
		this.angle = PI;
		
	}

	fire(){
		//make force to shoot the object
		let force = p5.Vector.fromAngle(this.angle).mult(50);
		return force;
	}



	increaseAngle(num){
		this.angle -= num;
	}
	decreaseAngle(num){
		this.angle += num;
	}

	//press arrow keys to turn the canon
	checkArrows(){
		if (keyIsDown(LEFT_ARROW)){
			this.increaseAngle(0.1);
		}
		if (keyIsDown(RIGHT_ARROW)){
			this.decreaseAngle(0.1);
		}
		this.angle = constrain(this.angle,PI/2, 3*PI/2);
	}

	draw(){
		push();
		translate(this.loc.x, this.loc.y);
		rotate(this.angle);
		fill(0);
		ellipse(0, 0, 50, 50);
		fill(0);
		rect(0, -20, 50,40 );
		pop();
	}
}

//all the planets in an array
class PlanetArray{
	constructor(){
		this.planets = [];
	}

	//attract everything in the inputted array
	attract(objArray){
		for (let i = 0;i<this.planets.length;i++){
			for (let k = 0; k< objArray.length;k++){
				this.planets[i].attract(objArray[k]);
			}
		}
	}

	//draw them all
	display(){
		for(let i = 0;i<this.planets.length;i++){
			this.planets[i].display();
		}
	}

	//is it dead?
	checkIfDead(){
		for(let i = 0;i<this.planets.length; i++){
			if (this.planets[i].dead === true){
				this.planets.splice(i, 1);
			}
		}
	}


	checkEdge(){
		for(let i = 0; i<this.planets.length; i++){
			this.planets[i].checkEdge();
		}
	}

	//make a planet with the given x coordinate
	makePlanet(x){
		this.planets.push(new Planet(x, height));
	}

	//small chance of a new planet appearing
	maybePlanet(){
		let randnum = random(1000);
		if (randnum < 2){
			this.makePlanet(random(width - 300));
		}
	}

	//kill anything in the object array that impacts any planet
	checkImpact(objArray){
		for(let i = 0; i<this.planets.length;i++){
			for(let k = 0; k<objArray.length;k++){
				this.planets[i].checkImpact(objArray[k]);
			}
		}
	}
}

class Planet{
	
	constructor(x, y){
		this.loc = createVector(x, y);
		this.mass = random(100, 170);
		this.G = 6;
		this.dead = false;
	}

	//Recieve a mover object, return a force
	attract(object){
		let force = p5.Vector.sub(this.loc, object.loc);
		let distance = force.mag();
		distance = constrain(distance, 10, 30);

		force.normalize();
		let strength = (this.G*this.mass)/(distance*distance);
		force.mult(strength);
		object.applyForce(force);
	}

	//kill it if it has gone too far
	checkEdge(){
		if (this.loc.y < 0){
			this.dead = true;
		}
	}

	//kill everything that impacts
	checkImpact(obj){
		let radius = p5.Vector.dist(this.loc, obj.loc);
		if (radius < this.mass/2){
			obj.die();
		}
		
	}

	//draw the attractor
	display(){
		fill(0);
		ellipse(this.loc.x, this.loc.y, this.mass, this.mass);
		this.loc.add(createVector(0, -0.3));
		
	}
}


