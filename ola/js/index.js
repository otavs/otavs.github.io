let gui, guiAttrs, entityList = {}, newID = 0
var mouseSize = 2, mouseColor = '#FFFFFF', 
    velocity = 1, fps = 0, blockX = false, blockY = false, qtd = 0,
    bgColor = '#000000', clearBg = true

function setup() {
    createCanvas(windowWidth, windowHeight)
    gui = new dat.GUI({
        name: 'ola'
    })
    populateGUI()
    gui.close()
    addCircles()
}

function draw() {
    update()
    if(clearBg)
        background(bgColor)
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
    // entityList = entityList.filter(entity => !entity.toRemove)
    fps = frameRate()
}

function populateGUI() {
    let controlFolder = gui.addFolder('Control')
    controlFolder.add(window, 'velocity', 0, 10).listen()
    controlFolder.add(window, 'blockX').listen()
    controlFolder.add(window, 'blockY').listen()
    controlFolder.add(window, 'addCircle')
    controlFolder.add(window, 'removeCircle')

    let mouseFolder = gui.addFolder('Mouse')
    mouseFolder.add(window, 'mouseSize', 0, windowWidth).listen()
    mouseFolder.addColor(window, 'mouseColor')

    let bgFolder = gui.addFolder('Background')
    bgFolder.add(window, 'clearBg').listen()
    bgFolder.addColor(window, 'bgColor')

    let infoFolder = gui.addFolder('Info')
    infoFolder.add(window, 'mouseX').listen()
    infoFolder.add(window, 'mouseY').listen()
    infoFolder.add(window, 'fps').listen()
}

function mouseWheel(event) {
    mouseSize += event.delta * -.1
    if(mouseSize < 0) mouseSize = 0
    if(mouseSize > windowWidth) mouseSize = windowWidth
}

function mouseClicked() {
    // addCircle()
}

function addCircles() {
    for(let i = 0; i < 250; i++) {
        addCircle()
    }
    qtd += 250
}

function addCircle() {
    let newCircle = new Circle(random(windowWidth), random(windowHeight), random(5, 15), randomColor())
    entityList[newCircle.id] = newCircle
    qtd++
}

function removeCircle() {
    for(let i in entityList) {
        delete entityList[i]
        qtd--
        break
    }
}

function randomColor() {
    return color(random(256), random(256), random(256))
}