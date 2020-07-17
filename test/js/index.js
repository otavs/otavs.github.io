const loader = PIXI.loader, resources = PIXI.loader.resources

let app, mouse, txtMouse, vertexList = [], selectedVertex = {}, id = 0

class Vertex {
  constructor(x, y, size) {
    this.id = id++;
    this.x = x
    this.y = y
    this.size = size
    this.shape = new PIXI.Graphics()
    this.color = 0xff0000
    this.drawShape()
    app.stage.addChild(this.shape)
  }
  drawShape() {
    this.shape.clear()
    this.shape.beginFill(this.color)
    this.shape.drawCircle(0, 0, this.size)
    this.shape.endFill()
    this.shape.position.set(this.x, this.y)
  }
}

initMouse()
initApp()
addEvents()
loadImages()

function createVertex(x, y, size) {
  vertexList.push(new Vertex(x, y, size))
}

function initApp() {
  PIXI.utils.sayHello(':D')
  app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: 0,
    transparent: false,
    antialias: true,
    clearBeforeRender: true,
    preserveDrawingBuffer: false,
    autoDensity: true,
    resizeTo: window
  })
  app.renderer.view.style.position = 'absolute'
  app.renderer.view.style.display = 'block'
  document.body.appendChild(app.view)
  app.ticker.add(delta => {
    update(delta)
  })
  txtMouse = new PIXI.Text(`x: ${mouse.x}\ny: ${mouse.y}`, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xff1010,
  })
  txtMouse.x = 0
  txtMouse.y = app.view.height - txtMouse.height
  app.stage.addChild(txtMouse)
  createVertex(100, 100, 20)
  createVertex(100, 200, 20)
}

function update(delta) {
  txtMouse.text = `x: ${mouse.x}\ny: ${mouse.y}`
  for(let v of vertexList) {
    v.drawShape()
  }
}

function loadImages(cb) {
  loader.add('star.png').load(cb)
}

function initMouse() {
  mouse = {
    x: 0,
    y: 0,
    prevX: 0,
    prevY: 0,
    pressed: false,
    leftPressed: false,
    midPressed: false,
    rightPressed: false
  }
}

function addEvents() {
  app.view.onmousemove = e => {
    mouse.prevX = mouse.x
    mouse.prevY = mouse.y
    mouse.x = e.x
    mouse.y = e.y
    for(let v in selectedVertex) {
      vertexList[v].x += mouse.x - mouse.prevX
      vertexList[v].y += mouse.y - mouse.prevY
    }
  }
  app.view.onmousedown = e => {
    mouse.pressed = true
    switch(e.button) {
      case 0: mouse.leftPressed = true; break
      case 1: mouse.midPressed = true; break
      case 2: mouse.rightPressed = true; break 
    }
    if(mouse.leftPressed) {
      for(let v of vertexList)
        if(dist(mouse.x, mouse.y, v.x, v.y) <= v.size)
          selectedVertex[v.id] = true
    }
  }
  app.view.onmouseup = e => {
    mouse.pressed = false
    switch(e.button) {
      case 0: mouse.leftPressed = false; break
      case 1: mouse.midPressed = false; break
      case 2: mouse.rightPressed = false; break 
    }
    if(!mouse.leftPressed) {
      for(let i in selectedVertex)
        delete selectedVertex[i]
    }
  }
  app.view.oncontextmenu = () => false
  app.view.ontouchstart = e => {
    mouse.pressed = true
    mouse.leftPressed = true
    mouse.x = e.touches[0].clientX
    mouse.y = e.touches[0].clientY
  }
  app.view.ontouchmove = e => {
    mouse.x = e.touches[0].clientX
    mouse.y = e.touches[0].clientY
  }
  app.view.ontouchend = e => {
    mouse.pressed = false
    mouse.leftPressed = false
    mouse.x = e.touches[0].clientX
    mouse.y = e.touches[0].clientY
  }
}

