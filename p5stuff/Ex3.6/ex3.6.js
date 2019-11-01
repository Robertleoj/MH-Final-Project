let amplitude;
let period;

function setup(){
	createCanvas(800,800);
	amplitude = height/2;
	period = 120;//arbitrary
}

function draw(){
	background(255);
	translate(width/2, height/2);

	let y = amplitude*cos(TAU*frameCount/period);
	line(0, -height/2, 0, y-35);//line from ceiling to ball

	ellipse(0, y, 70, 70);
	amplitude *=0.997;//reduce amplitude
}


//press space to reset amplitude
function keyPressed(){
	if (keyCode===32){
		amplitude = height/2;
	}
}

