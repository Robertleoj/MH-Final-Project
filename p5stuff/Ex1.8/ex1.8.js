
let t;
function setup(){
	createCanvas(600,600);
	loadPixels();
	t = 0.0;
	
}
function draw(){
	
	let xoff = t;
	for (let i = 0; i < width; i++){

		let yoff = t;

		for (let j = 0; j<height; j++){
			let bright = map(noise(xoff, yoff), 0,1,0,255);
			let index = (i + j*width)*4; //equation is (x + y*width)*4
			pixels[index] = bright;
			pixels[index+1] = bright/4;
			pixels[index+2] = bright/2;
			pixels[index+3] = 255;


			yoff+=0.01;

		}
		xoff+=0.01;
	}
	updatePixels();
	t +=0.02;
}