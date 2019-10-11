let w;

function setup(){
	createCanvas(600,600);
	w = new Walker();
}
function draw(){
	w.step();
	w.draw();

}
class Walker{
	constructor(){
		this.x = width/2;
		this.y = height/2;
	}
	step(){
		while(true){
			let num1 = random(10);
			let prob = pow(num1, 2);
			let num2 = random(10);
			if (num2 < prob){
				this.num = num1;
				break;
			}
		}
		let pv = p5.Vector.random2D().mult(this.num);
		this.x += pv.x;
		this.y += pv.y;

	}
	draw(){
		ellipse(this.x, this.y, 2,2);
	}
}