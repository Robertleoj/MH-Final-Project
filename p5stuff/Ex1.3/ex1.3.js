/*
Nature of Code Excercise 1.3:
Create a Random walker with a 50% probability of moving in the
direction of the mouse
Róbert Leó Jónsson
*/



let w;
function setup(){
	createCanvas(window.innerWidth, window.innerHeight);

	background(255);
	w = new Walker();
}
function draw(){
	w.draw();
	w.step()
}


class Walker{
	constructor(){
		//initiate walker in middle of screen
		this.x = width/2;
		this.y = height/2;
	}
	//step functon, call to move walker
	step(){
		var rand = random(1);
		
		if (rand<0.41){
			if (mouseX>this.x){
				this.x++;
			}else{
				this.x--;
			}
			if (mouseY>this.y){
				this.y++;
			}else{
				this.y--;
			}
		}else{
			//move in a random direction
			this.x += int(random(3))-1;
			this.y += int(random(3))-1;
			

		}
		

	}
	//call to draw walker
	draw(){
		ellipse(this.x, this.y, 2,2);
	}


}