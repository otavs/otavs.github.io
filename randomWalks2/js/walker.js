class Walker {
  constructor(x, y, size, color, stage, renderer) {
    this.x = x
    this.y = y
    this.size = size
    this.color = color
    let a = 1000000
    this.tx = Math.random()*a
    this.ty = Math.random()*a
    this.ta = Math.random()*a
    this.stage = stage
    this.shape = new PIXI.Graphics()
    // this.shape.beginFill(0x33FF00)
    this.shape.beginFill(Math.random()*0xFFFFFF)
    this.shape.drawCircle(0, 0, size)
    this.shape.endFill()
    if(Math.random() < .1){
      this.shape = new Sprite(resources['../img/star.png'].texture)
      this.shape.rotation = Math.random() * Math.PI * 2
      this.shape.pivot.set(this.shape.width/2, this.shape.height/2)
    }
    stage.addChild(this.shape)
    this.shape.x = x
    this.shape.y = y
    this.trail = []
  }

  step(type) {
    this.prevX = this.x
    this.prevY = this.y
    this['step'+type]()

    let g = this.shape
    // g.clear()
    // g.beginFill(Math.random()*0xFFFFFF)
    // g.drawCircle(0, 0, this.size)
    // g.endFill()
    
    this.shape.x = this.x
    this.shape.y = this.y
    this.shape.rotation += .1
    for(let e of this.trail) {
      e.alpha -= .1
    }
  }

  step0() {
    let r = Math.random(), c = 3
    if(r < 1/4) {
      this.x += c
      return 
    }
    r = Math.random()
    if(r < 1/3) {
      this.x -= c
    }
    else if(r < 2/3) {
      this.y += c
    }
    else if(r <= 1) {
      this.y -= c
    }
  }

  step1() {
    let c = 5
    let stepX = Math.random()*2*c-c, stepY = Math.random()*2*c-c
    this.x += stepX
    this.y += stepY
  }

  step2() {
    let c = 5
    let v = Vector2D.random()
    this.x += c * v.x
    this.y += c * v.y
  }

  step3() {
    this.tx += .01
    this.ty += .01
    let v = new Vector2D(noise.simplex2(this.tx, 0), noise.simplex2(this.ty, 0)).mult(2)
    
    if(mouseDown) {
      v.normalize().mult(100)
      let theta = v.angleBetween(new Vector2D(mouseX-this.x, mouseY-this.y))
      theta += map(noise.simplex2(this.ta, 0), -1, 1, -2, 2)
      this.ta += .01
      v.rotate(theta)
      // if(mouseButton == RIGHT)
      //   v.mult(-1)
    }

    this.x += v.x
    this.y += v.y

    // let trailShape = new PIXI.Graphics()
    // trailShape.beginFill(0x33FF00)
    // trailShape.drawCircle(0, 0, this.size)
    // trailShape.endFill()
    // trailShape.x = this.x
    // trailShape.y = this.y
    // trailShape.alpha = 1
    // this.stage.addChild(trailShape)
    // this.trail.push(trailShape)
    // if(this.trail.length > 10) {
    //   let oldTrail = this.trail.shift()
    //   oldTrail.destroy()
    // }
  }

}