let Application = PIXI.Application,
    loader = PIXI.loader,
    resources = PIXI.loader.resources,
    Sprite = PIXI.Sprite;

PIXI.utils.sayHello(':D')

let app = new Application({
  width: 256, 
  height: 256,
  // transparent: false,
  antialias: true,
})

document.body.appendChild(app.view)

app.renderer.backgroundColor = 0x061639

app.renderer.view.style.position = 'absolute'
app.renderer.view.style.display = 'block'
app.renderer.autoResize = true
// app.renderer.view.width = 50
app.renderer.resize(window.innerWidth, window.innerHeight)

loader.add('../img/star.png').load(setup)

let star

function setup() {
  star = new Sprite(resources['../img/star.png'].texture)
  app.stage.addChild(star)
  // app.stage.removeChild(starSprite)
  // starSprite.visible = false
  star.x = 200
  star.y = 100
  star.anchor.set(.5, .5)
  star.scale.set(10, 10)
  setInterval(() => star.rotation += .2, 30)
  // star.scale.set(2, 2)
  let circle = new PIXI.Graphics()
  circle.beginFill(0xFFFFFF)
  circle.drawCircle(0, 0, 32)
  circle.endFill()
  circle.x = 64
  circle.y = 130
  app.stage.addChild(circle)
}


