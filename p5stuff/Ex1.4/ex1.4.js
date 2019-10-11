/*
Excercise 1.4
Robert
*/

let sd;
let mean;
function setup(){
	createCanvas(500,500)
	//the mean and the standard deviation for the dot location
	mean = 0;
	sd = 70;
}
function draw(){
	//distance from center
	let num = randomGaussian(mean, sd);
	//vector with a random direction and gaussian distributed magnitude
	let v = p5.Vector.random2D().mult(num);

	//distributed values for the color distribution
	let rc1=255/( 1+ abs(randomGaussian(0, 10)));
	let rc2=255/( 1+ abs(randomGaussian(0, 10)));
	let rc3=255/( 1+ abs(randomGaussian(0, 10)));
	noStroke();
	fill(rc1, rc2, rc3, 170);
	ellipse((width/2) + v.x, (height/2) + v.y , 10,10);


}
