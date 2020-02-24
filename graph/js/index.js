let range = {x: 10, y: 10}
let x = -range.x
let h = .001

function f(x) {
	return Math.sqrt(10-x*x)
}

function setup() {
	createCanvas(windowWidth, windowHeight)  
	background(0, 0, 0)
}

function draw() {
	translate(windowWidth/2, windowHeight/2)
	scale(1, -1)
	if(x < 10) {
		while(x < 10) {
			stroke(255, 255, 255)
			fill(255, 255, 255)
			lineMap(x, f(x), x+h, f(x+h))
			x += h
		}
	}
}

function lineMap() {
	let sx = windowWidth / range.x
	let sy = windowHeight / range.y
	let s = min(sx, sy)
	line(x*s, f(x)*s, (x+h)*s, f(x+h)*s)
	line(x*s, -f(x)*s, (x+h)*s, -f(x+h)*s)
}

function update() {
	
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight)
	background(0, 0, 0)
	x = -range.x
}

function randomColor() {
	return color(255, 255, 255)
	return color(random(255), random(255), 255)
}

function keyPressed() {
  
}