var canvas;
function setup() {
canvas = createCanvas(window.innerWidth,window.innerHeight);
canvas.position(0,0);
canvas.style('z-index', '-1');
}
function windowResized(){
	resizeCanvas(window.innerWidth,window.innerHeight);
}
function draw() {
	stroke(200);
	fill(255);
	ellipse(mouseX, mouseY, 80,80);
	
  // put drawing code here
}