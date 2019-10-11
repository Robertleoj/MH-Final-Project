let cols;
let rows;
let scl = 20;
let xm;
let ym;
let t;


function setup(){

	createCanvas(800,800, WEBGL);//WEBGL for 3D
	
	cols = width/scl;//the width of the columns
	rows = height/scl;//the height of the rows
	xm = cols/2;//to start in the right corner
	ym = rows/2;//^^
	t = 0.0;//we will increment this every frame to keep the plane moving


}

function draw(){

	translate(0,300,-1000);//for a better perspective
	let inc = 0.05;//the increment in the perlin noise
	background(255);
	stroke(0);
	fill(100);

	rotateX(PI/2.5);//the rotation of the plane
	let yoff = t;//initiate yoff at t
	for (let y = -ym; y < ym; y++){//run through the rows
		beginShape(TRIANGLE_STRIP);//triangles at vertices
		xoff = t;//for every row, start xoff at t
		for (let x = -xm; x < xm;x++){//run through the columns
			vertex(x*cols, y*rows, map(noise(xoff, yoff), 0,1,0,600));
			vertex(x*cols, y*rows + rows, map(noise(xoff, yoff + inc), 0,1,0,600));

			xoff+=inc;//increment xoff

		}
		yoff+=inc;//increment yoff
		endShape();
	}
	t+= 0.003;//increment t


}