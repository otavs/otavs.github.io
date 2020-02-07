let walker;

function setup() {
	createCanvas(windowWidth, windowHeight)  
	//createGUI()
	populateGUI()
	walker = new Walker(windowWidth/2, windowHeight/2, 5)
}

function draw() {
	update()
	//background(255, 255, 255)
	walker.draw()
}

function update() {
	walker.update()
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
}