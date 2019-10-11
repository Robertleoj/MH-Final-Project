let m = [];//declaring empty mover array


function setup(){
	createCanvas(800,800);

}
function draw(){
	background(255);
	//relevant mover functions
	for (let i = 0; i<m.length;i++){
		m[i].update();
		m[i].checkEdges();
		m[i].draw();
	}
}

//crate a ball!
function mouseClicked(){
	m.push(new Mover());
}

class Mover{//mover class!

	constructor(){
		this.loc = createVector(mouseX, mouseY);//start out in the middle
		this.vel = createVector(0.0);//no initial velocity
		this.vel.limit(10);//not too fast!
		this.size = random(15,100);//random size
	}

	update(){
		//accellerate toward mouse
		let mouse = createVector(mouseX, mouseY);
		let acc = mouse.sub(this.loc).div(1000);

		//motion 101
		this.vel.add(acc);
		this.loc.add(this.vel);
	}

	checkEdges(){
		//dont wanna leave the screen!
		if(this.loc.x < 0 || this.loc.x > width){
			this.vel.x = 0;
		}
		if(this.loc.y < 0 || this.loc.y > height){
			this.vel.y =0;
		}
	}


	draw(){
		stroke(0);
		fill(200);
		ellipse(this.loc.x, this.loc.y, this.size,this.size);
	}
}


