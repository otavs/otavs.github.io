let gui, centerX, centerY, walkers = [], width, height, r, canvas
var n = 500, nSteps = 1, walkerSize = 5, stepType = 3

function setup() {
	width = windowWidth
	height = windowHeight
	if(height > width) height = width
	canvas = createCanvas(width, height)
	centerX = width/2
	centerY = height/2
	//createGUI()
	//populateGUI()
	startWalkers()
	background(0, 0, 0)
	r = createGraphics(width, height)
	document.getElementById(canvas.id()).oncontextmenu = () => true
}

function draw() {
	update()
	background(0, 0, 0, 30)
	for(let walker of walkers) {
		for(let i = 0; i < nSteps; i++) {
			walker.step(stepType)
			walker.draw()
		}
	}
	r.background(0, 0, 0, 0)
	// set ???
	drawMouse()
}

function drawMouse() {
	r.fill('blue')
	r.stroke('blue')
	r.strokeWeight(1)
	r.circle(mouseX, mouseY, 22)
}

function update() {
	
}

function windowResized() {
	let canvasCopy = get()
	if(windowHeight > windowWidth) {
		resizeCanvas(windowWidth, windowWidth)
		windowHeight = windowWidth
	}
	if(windowWidth > width || windowHeight > height) {
		resizeCanvas(windowWidth, windowHeight)
		fill(0, 0, 0)
		stroke(0, 0, 0)
		if(windowWidth > width) {
			rect(width, 0, windowWidth - width, windowHeight)
		}
		else {
			rect(0, height, windowWidth, windowHeight - height)
		}
		image(canvasCopy, 0, 0)
	}
	width = windowWidth
	height = windowHeight
	centerX = width/2
	centerY = height/2
}

function randomColor() {
	return color(0, random(255), 255)
	return color(random(255), 0, 255)
	return color(random(255), random(255), 255)
	return color(255, 255, random(255)) // white/yellow
	return color(0, 255, 255) // aqua
	return color(255, random(255), 0) // fire
}

function startWalkers() {
	walkers = []
	for(let i = 0; i < n; i++)
		walkers.push(new Walker(centerX, centerY, walkerSize, randomColor()))
}

function keyPressed() {
  if(Walker.prototype['step'+key]) {
		stepType = key
		background(0, 0, 0)
		startWalkers()
	}
}

function monteCarlo() {
	for(;;) {
		let r1 = random()
		if(random() < r1) 
			return r1
	}
}

function monteCarlo2() {
	for(;;) {
		let r1 = monteCarlo()
		if(monteCarlo() < r1) 
			return r1
	}
}