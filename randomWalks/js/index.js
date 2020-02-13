let gui, centerX, centerY, walkers = []
var n = 400, nSteps = 1

function setup() {
	createCanvas(windowWidth, windowHeight)  
	centerX = windowWidth/2
	centerY = windowHeight/2
	//createGUI()
	//populateGUI()
	startWalkers()
	background(0, 0, 0)
}

function draw() {
	update()
	//background(0, 0, 0)
	for(let walker of walkers) {
		for(let i = 0; i < nSteps; i++) {
			walker.step3()
			walker.draw()
		}
	}
}

function update() {
	
}

function windowResized() {
	let canvasCopy = get()
	resizeCanvas(windowWidth, windowHeight)
	image(canvasCopy, 0, 0)
	centerX = windowWidth/2
	centerY = windowHeight/2
}

function randomColor() {
	return color(random(255), random(255), 255)
}

function startWalkers() {
	walkers = []
	for(let i = 0; i < n; i++)
		walkers.push(new Walker(centerX, centerY, 1, randomColor()))
}