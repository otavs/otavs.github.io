let gui, entityList = {}, newID = 0
var mouseRadius = 1, mouseColor = '#FFFFFF', showMouse = false,
	speed = 1, fps = 0, blockX = false, blockY = false, qtd = 0, 
	autoSpawn = true, maxQuantity = 200, spawnRangeMinX = 0, spawnRangeMaxX = 10, spawnRangeMinY = 0, spawnRangeMaxY = 10,
	bgColor = '#000000', clearBg = true,
	leftBorder = true, rightBorder = true, topBorder = true, bottomBorder = true 

function setup() {
	createCanvas(windowWidth, windowHeight)  
	createGUI()
	populateGUI()
}

function draw() {
	update()
	if(clearBg)
		background(bgColor)
	if(showMouse)
		drawMouse()
	for(let i in entityList) {
		drawCircle(entityList[i])
	}
}

function update() {
	if(autoSpawn && qtd < maxQuantity) {
		addCircle()
	}
	for(let i in entityList) {
		updateCircle(entityList[i])
	}
	fps = frameRate()
}

function drawMouse() {
	fill(mouseColor)
	stroke(mouseColor)
	circle(mouseX, mouseY, mouseRadius*2)
}

function mouseWheel(event) {
	mouseRadius += event.delta * -.1
	if(mouseRadius < 0) mouseRadius = 0
	if(mouseRadius > windowWidth) mouseRadius = windowWidth
}

function mouseClicked() {
	// :D
}

function randomColor() {
	return color(random(256), random(256), random(256))
}

function windowResized(){
	resizeCanvas(windowWidth, windowHeight)
	gui.spawnRangeMinX.__max = windowWidth
	gui.spawnRangeMaxX.__max = windowWidth
	gui.spawnRangeMinY.__max = windowHeight
	gui.spawnRangeMaxY.__max = windowHeight
}