const loader = PIXI.loader, resources = PIXI.loader.resources

const walkers = new LinkedList()

let app, fadeBg, stats, gui, mouse, colorMatrixFilter, mouseCircle, downloadLink

let test = false, starChance = .1

initMouse()
initGUI()
initStats()

initApp()

addEvents()
initMouseCircle()
initFade()

loadImages(startWalkers)

function initApp() {
  PIXI.utils.sayHello(':D')
  app = new PIXI.Application({
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundColor: bgColor,
    transparent: false,
    antialias: true,
    clearBeforeRender: false,
    preserveDrawingBuffer: true,
    autoDensity: true,
    resizeTo: window
  })
  app.renderer.view.style.position = 'absolute'
  app.renderer.view.style.display = 'block'
  document.body.appendChild(app.view)
  document.body.appendChild(gui.domElement.parentNode)
  setupDownloadLink()
  gui.close()
  app.ticker.add(delta => {
    stats.begin()
    update(delta)
    stats.end()
  })
}

function update() {
  if(enableColorFilter) updateFilter()
  updateMouse()
  walkers.forEach(walker => walker.step(stepType))
}

function updateMouse() {
  mouseCircle.x = mouse.x
  mouseCircle.y = mouse.y
}

function startWalkers() {
  Walker.add(n)
}

function initColorMatrix() {
  colorMatrixFilter = new PIXI.filters.ColorMatrixFilter()
  app.stage.filters = [colorMatrixFilter]
  colorMatrixFilter.t0 = random(1000000)
  colorMatrixFilter.t1 = random(1000000)
  colorMatrixFilter.t2 = random(1000000)
}

function updateFilter() {
  let t0 = colorMatrixFilter.t0 += .02
  let t1 = colorMatrixFilter.t1 += .02
  let t2 = colorMatrixFilter.t2 += .02
  colorMatrixFilter.matrix = [
    noise.simplex2(t0, 0)/2+1.5, 0, 0, 0, 0,
    0, noise.simplex2(t1, 0)/2+1.5, 0, 0, 0,
    0, 0, noise.simplex2(t2, 0)/2+1.5, 0, 0,
    0, 0, 0, 1, 0,
    0, 0, 0, 0, 0, 
  ]
}

function loadImages(cb) {
  loader.add('star.png').load(cb)
}

function initStats() {
  stats = new Stats()
  stats.showPanel(0)
  stats.domElement.style.display = showStats ? 'block' : 'none'
  document.body.appendChild(stats.dom)
}

function initMouse() {
  mouse = {
    x: 0,
    y: 0,
    pressed: false,
    leftPressed: false,
    midPressed: false,
    rightPressed: false
  }
}

function initMouseCircle() {
  mouseCircle = new PIXI.Graphics()
  mouseCircle.lineStyle(1, 0xFFFFFF).drawCircle(0, 0, mouseRadius)
  mouseCircle.visible = false
  mouseCircle.alpha = .3
  app.stage.addChild(mouseCircle)
}

function initFade() {
  fadeBg = new PIXI.Graphics()
  redrawFade()
  app.stage.addChild(fadeBg)
}

function redrawFade() {
  fadeBg.clear()
  .beginFill(bgColor, .15)
  .drawRect(0, 0, app.renderer.width, app.renderer.height)
  .endFill()
}

function addEvents() {
  app.view.onmousemove = e => {
    mouse.x = e.x
    mouse.y = e.y
  }
  app.view.onmousedown = e => {
    mouse.pressed = true
    switch(e.button) {
      case 0: mouse.leftPressed = true; break
      case 1: mouse.midPressed = true; break
      case 2: mouse.rightPressed = true; break 
    }
  }
  app.view.onmouseup = e => {
    mouse.pressed = false
    switch(e.button) {
      case 0: mouse.leftPressed = false; break
      case 1: mouse.midPressed = false; break
      case 2: mouse.rightPressed = false; break 
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
  window.addEventListener('resize', redrawFade)
}

function setFadingEffect(v) {
  fadeBg.visible = v
}

function setBufferPreserving(v) {
  app.renderer.clearBeforeRender = !v
  app.renderer.preserveDrawingBuffer = v
}

function changeWalkerColors(randomize) {
  walkers.forEach(walker => {
    walker.setColor(randomize ? randomColor() : gui.getColor())
  })
}

function setupDownloadLink() {
  downloadLink = document.createElement('a')
  downloadLink.id = 'downloadLink'
  downloadLink.download = 'canvas.png'
  downloadLink.href = app.view.toDataURL('image/png')
  document.body.appendChild(downloadLink)
}

function downloadCanvas() {
  downloadLink.href = app.view.toDataURL("image/png")
  downloadLink.click()
}

function toggleFullScreen(fullScreen) {
  if(fullScreen) document.body.requestFullscreen()
  else document.exitFullscreen()
}