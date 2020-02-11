let gui, walkers = [], n = 400, nSteps = 1

function setup() {
	createCanvas(windowWidth, windowHeight)  
	createGUI()
	populateGUI()
	for(let i = 0; i < n; i-=-1)
		walkers.push(new Walker(windowWidth/2, windowHeight/2, 5, randomColor()))
}

function draw() {
	update()
	//  background(255, 255, 255)
	for(let walker of walkers) {
		for(let i = 0; i < nSteps; i++){
			walker.step()
			walker.draw()
		}
	}
}

function update() {
	
}

function windowResized(){
	let canvasCopy = get()
	resizeCanvas(windowWidth, windowHeight)
	image(canvasCopy, 0, 0)
}

function randomColor() {
	return color(random(255), random(255), 255)
}