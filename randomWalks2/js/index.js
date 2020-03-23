const Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite

PIXI.utils.sayHello(':D')

const app = new Application({
  width: 256, 
  height: 256,
  // transparent: true,
  antialias: true,
})

document.body.appendChild(app.view)

// app.renderer.backgroundColor = 0x061639

app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'
// app.renderer.autoResize = true
// app.renderer.view.width = 50
app.renderer.resize(window.innerWidth, window.innerHeight)

loader.add('star.png').load(setup)

let walkers = [], walkerSize = 3, n = 5000, stepType = 3
let mouseX = 0, mouseY = 0, mouseDown = false

// let fade = new PIXI.Graphics()
// fade.beginFill(0x000000,0.03)
// fade.drawRect(0, 0, app.renderer.width, app.renderer.height)
// fade.endFill()
// app.stage.addChild(fade)

var stats = new Stats()
stats.showPanel(0)
document.body.appendChild(stats.dom)

function setup() {
  startWalkers()
}

function startWalkers() {
	walkers = []
	for(let i = 0; i < n; i++)
		walkers.push(new Walker(app.renderer.width/2, app.renderer.height/2, walkerSize, 0, app.stage, app.renderer))
}

app.ticker.add(delta => {
  stats.begin()
  app.renderer.render(app.stage)
  walkers.forEach(walker => walker.step(stepType))
  let mousePos = app.renderer.plugins.interaction.mouse.global
  mouseX = mousePos.x
  mouseY = mousePos.y
  stats.end()
})

document.body.onmousedown = function() { 
  mouseDown = true
}

document.body.onmouseup = function() {
  mouseDown = false
}

function map(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2
}