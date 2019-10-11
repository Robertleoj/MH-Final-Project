/*
Nature of Code Excercise 1.1:
Create a Random walker with a tendency to walk to the right and down
Róbert Leó Jónsson
*/



let w;
function setup(){
	createCanvas(600, 600);

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
		//this inclines the walker to move more down and to the right
		var xstep = random(5)-2;
		var ystep = random(5)-2;
		this.x += xstep;
		this.y += ystep;

	}
	//call to draw walker
	draw(){
		ellipse(this.x, this.y, 2,2);
	}


}