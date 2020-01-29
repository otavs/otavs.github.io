let gui, guiAttrs, entityList = {}, newID = 0
var mouseSize = 2, mouseColor = '#FFFFFF', velocity = 1

function setup() {
    createCanvas(windowWidth, windowHeight)
    gui = new dat.GUI()
    populateGUI()
    gui.close()
    addCircles()
}

function draw() {
    update()
    background(0)
    fill(mouseColor)
    stroke(mouseColor)
    circle(mouseX, mouseY, mouseSize*2)
    for(let i in entityList) {
        entityList[i].draw()
    }
}

function update() {
    for(let i in entityList) {
        entityList[i].update()
    }
}

function populateGUI() {
    gui.add(window, 'mouseX').listen()
    gui.add(window, 'mouseY').listen()
    // gui.add(window, 'mouseSize', 0, windowWidth).listen()
    gui.add(window, 'velocity', 0, 10).listen()
    gui.addColor(window, 'mouseColor')
}

function mouseWheel(event) {
    mouseSize += event.delta * -.1
    if(mouseSize < 0) mouseSize = 0
    if(mouseSize > windowWidth) mouseSize = windowWidth
}

function mouseClicked() {
    //addCircles()
}

function addCircles() {
    for(let i = 0; i < 600; i++) {
        addCircle()
    }
}

function addCircle() {
    let newCircle = new Circle(random(windowWidth), random(windowHeight), random(5, 15), randomColor())
    entityList[newCircle.id] = newCircle
}

function randomColor() {
    return color(random(256), random(256), random(256))
}