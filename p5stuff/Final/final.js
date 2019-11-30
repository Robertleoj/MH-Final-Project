let img;
let canon;
let squares;
let planets;
let bullets;
let enemies;
let status;
let explosions;
let music;
let expSound;
let oof;

function preload(){
	soundFormats('mp3');
	music = loadSound('p5stuff/Final/nas.mp3');
	expSound = loadSound('p5stuff/Final/exp.mp3');
	oof = loadSound('p5stuff/Final/oof.mp3');
}


function setup(){
	createCanvas(1200,800);
	makeBackground();
	canon = new Canon();
	enemies = new EnemyArray();
	planets = new PlanetArray();
	bullets = new Bullets();
	planets.makePlanet(width/2);//to start us off
	status = new WinOrLose();
	explosions = new ExplosionArray;
	music.loop();
}


function draw(){
	//put the background in place
	image(img, 0,0, width, height);
	
	
	//check if the game is lost
	if (!status.lost){
		//spin the gun
		canon.checkArrows();
		
		//do the requisite planet functions
		planets.maybePlanet();
		planets.attract(bullets.bullets);
		planets.checkImpact(bullets.bullets);
		planets.checkImpact(enemies.enemies);
		planets.checkEdge();
		planets.checkIfDead();

		//enemy functions
		enemies.checkImpact(bullets.bullets);
		enemies.run();
		
		
		bullets.run();
		bullets.fire();


		//draw the planets
		planets.display();
		explosions.run();

		//draw the canon
		canon.draw();

		bullets.drawHeatLine();
		bullets.checkDead();

		status.drawLives();
		status.drawScore();

	}else{//if the game is lost, display game over screen
		status.drawLose();
	}
}


class WinOrLose{

	constructor(){
		this.lives = 15;
		this.lost = false;
		this.score = 0;
	}

	loseLife(){
		this.lives -= 1;
		oof.play();
		if(this.lives <= 0){
			this.lost = true;
		}
	}

	//draw the hearts displaying the lives
	drawLives(){
		for (let i = 0; i<this.lives; i++){
			push();
			translate(width-30 - 20*i, height-30);
			noStroke();
			fill(255,0,0);
			triangle(-10, 0, 10,0, 0, 14);
			arc(-5, 0, 10, 12, PI, TAU);
			arc(5, 0, 10, 12, PI, TAU);
			pop();
		}
	}

	drawScore(){
		textSize(50);
		fill(0,255,0);
		let message  = concat("Score: ", this.score.toString());
		text(message, 40, height - 40);
	}

	lose(){
		this.lost = true;
	}

	//game over screen
	drawLose(){
		push();
		textAlign(CENTER, CENTER);
		textSize(100);
		fill(0, 255,0);
		text("GAME OVER",width/2, height/2);
		textSize(50);
		let message  = concat("Final Score: ", this.score.toString());
		text(message, width/2, height/2 + 60);
		textSize(30);
		text("Don't screw up again next time", width/2, height/2 +100);
		pop();
	}
}

class Bullets{
	constructor(){
		this.bullets = [];
		this.heat = 0;
		this.heatMax = 100;
		this.hot = false;
	}

	//make canon overheat
	tooHot(){
		this.hot = true;
	}

	//press space to fire
	fire(){
		if(this.heat<this.heatMax && this.hot ===false){
			if(keyIsDown(32)){
				this.bullets.push(new CanonSquare(canon.loc));

				this.bullets[this.bullets.length-1].applyForce(canon.fire(this.bullets[this.bullets.length-1]));
				this.heat += 3;
			}
		}else if(this.heat>= this.heatMax){
			this.tooHot();
		}
	}

	//draw the overheating line
	drawHeatLine(){
		if(this.hot){
			fill(255,0,0);
		}else{
			fill(0,255,0);
		}
		let xwidth = map(this.heat, 0,100,0,width);
		rect(0, 0, xwidth, 30 );
	}

	checkDead(){
		//remove dead squares
		for (let i = 0;i<this.bullets.length;i++){
			if (this.bullets[i].dead ===true){
				this.bullets.splice(i, 1);
			}
		}
	}

	run(){
		for(let i = 0;i<this.bullets.length;i++){
			
			this.bullets[i].update();
			this.bullets[i].checkEdges();
			this.bullets[i].draw();
		}
		if(this.heat >0){
			this.heat -= 0.5;
		}
		if(this.heat< 0.7*this.heatMax ){
			this.hot = false;
		}
	}
}

class EnemyArray{
	constructor(){
		this.enemies = [];
		this.prob = 2;//probability of new enemy
	}

	//do most of the functions
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

	//small chance of a new enemy appearing
	maybeEnemy(){
		let randnum = random(200);
		if (randnum < this.prob){
			this.makeEnemy();
			
		}
	}

	//check if it has been shot
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

	//has it been shot?
	checkImpact(obj){
		let radius = p5.Vector.dist(this.loc, obj.loc);
		if (radius < 30){
			obj.die();
			this.die();
			enemies.prob +=0.03;

			//add one to the player score
			status.score += 1;
		}
	}

	display(){
		//translate and rotate 
		let angle = this.vel.heading();
		let s =2/3;
		push();
		translate(this.loc.x, this.loc.y);
		rotate(angle);
		noStroke();
		fill(255, 0, 0);
		triangle(-25*s,12.5*s, -25*s, 25*s, 0, 12.5*s);
		triangle(-25*s, 12.5*s, -25*s, 25*s, -50*s, 25*s);
		triangle(-25*s,-12.5*s, -25*s, -25*s, 0, -12.5*s);
		triangle(-25*s, -12.5*s, -25*s ,-25*s, -50*s, -25*s);
		fill(60);
		ellipse(0,0,90*s, 30*s);
		//triangle(25*s,12.5*s, 25*s, -12.5*s, 60*s, 0);
		fill(255);
		ellipse(18*s, 0, 14*s, 14*s);
		fill(66, 135, 245);
		ellipse(-45*s, 0, 20*s,20*s);
		triangle(-65*s, 0, -45*s, -10*s, -45*s, 10*s);
		fill(0);
		rect(-40*s, -12*s, 10*s, 24*s);
		fill(255*s, 0, 0);
		rect(-50*s, -3*s, 35*s, 6*s);
		pop();
	}

	//kill it
	die(){
		this.dead = true;
		explosions.explode(this.loc);
		expSound.play();
	}

	//make acelleration
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
			this.dead = true;
		}
		if (this.loc.x > width){
			this.dead = true;
			//lose a life
			status.loseLife();
		}
		if (this.loc.y < 0){
			this.dead = true;
		}
		if (this.loc.y > height){
			this.dead = true;
		}
	}
}

//make the perlin noise background and save in image
function makeBackground(){
	img = createImage(width, height);

	img.loadPixels();
	let xoff = 0;
	for (let i = 0; i < width; i++){

		let yoff = 0;

		for (let j = 0; j<height; j++){

			let col = map(noise(xoff, yoff), 0,1,0,255);
			img.set(i, j, color(col, 0, col));


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
		let randnum = random(2000);
		if (randnum < 1){
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
		this.mass = random(50,90);
		this.G = this.mass/6;
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
		if (radius < this.mass/1.5){
			obj.die();
		}
	}

	//draw the attractor
	display(){
		fill(0);
		ellipse(this.loc.x, this.loc.y, this.mass, this.mass);
		this.loc.add(createVector(0, -0.1));
	}
}

function constrain(value, min, max){
	if (value<min){
		value = min;
	}
	if (value > max){
		value = max;
	}
}

class ExplosionArray{
	constructor(){
		this.explosions = [];
	}

	//call this funciton to make an explosion at that loc
	explode(loc){
		this.explosions.push(new Explosion(loc));
	}

	run(){
		for(let i = 0; i<this.explosions.length; i++){
			this.explosions[i].run();
		}

		for (let i = 0;i<this.explosions.length;i++){
			if(this.explosions[i].dead){
				this.explosions.splice(i, 1);
			}
		}
	}
}

class Explosion{
	constructor(loc){
		this.pArray = [];
		this.dead = false;
		this.loc = loc;
		this.lifeSpan = 200;

		//start with 50 initial particles
		for (let i = 0; i < 50;i++){
			this.pArray.push(new Particle(this.loc));
		}
	}

	run(){
		for (let i = 0;i<this.pArray.length;i++){
			this.pArray[i].run();
		}

		this.lifeSpan -= 1;
		
		//kill it when the lifespan is zero
		if(this.lifeSpan < 0){
			this.dead = true;
		}
	}
}

class Particle{
	constructor(loc){//location vector
		this.loc = loc.copy();
		this.acc = createVector(0,0);
		this.vel = p5.Vector.fromAngle(random(TAU)).mult(random(5));//little bit of velocity

		this.life = random(130);
		this.initLifespan = this.life//grab the initial lifespan 4 l8r

		this.angle = 0;//angle of rotation
		this.angVel = random(0, 1);
		this.size = random(2, 10);

		this.dead = false;

		//red or yellow?
		this.redYellow = int(random(2));
	}

	run(){
		//do all the things if not dead
		if(!this.dead){
		this.update();
		this.display();
		}
	}

	update(){
		this.vel.add(this.acc);
		this.loc.add(this.vel);
		this.angle +=this.angVel;//increment angle
		this.isDead();
		this.life -= 2;//decreasing lifespan
		this.acc.mult(0);
	}

	isDead(){
		//is the damn thing dead?
		if (this.life < 0){
			this.dead = true;
		}
	}

	display(){
		//map its remaining lifespan to its alpha
		push();
		translate(this.loc.x, this.loc.y);
		rotate(this.angle);

		if(this.redYellow === 0){
			fill(255, 0, 0, map(this.life, 0,this.initLifespan, 0, 255));
		}else{
			fill(255,238, 0, map(this.life, 0, this.initLifespan, 0, 255));
		}
		noStroke();
		rectMode(RADIUS);
		rect(0,0, this.size, this.size);
		pop();
	}
}