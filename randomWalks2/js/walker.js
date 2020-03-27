class Walker {
  constructor(x, y, size, color, stage, renderer) {
    this.x = x
    this.y = y
    this.size = size
    this.tx = random(10000000)
    this.ty = random(10000000)
    this.ta = random(10000000)
    this.stage = stage
    this.speed = walkerSpeed
    this.shape = new PIXI.Graphics()
    this.color = color
    this.drawShape()
    if(test && Math.random() < starChance){
      this.shape = new PIXI.Sprite(resources['star.png'].texture)
      this.shape.rotation = Math.random() * Math.PI * 2
      this.shape.pivot.set(this.shape.width/2, this.shape.height/2)
    }
    this.stage.addChild(this.shape)
    this.shape.x = x
    this.shape.y = y
  }

  drawShape() {
    this.shape.clear()
    this.shape.beginFill(this.color)
    this.shape.drawCircle(0, 0, 1)
    this.shape.endFill()
  }

  setColor(color) {
    this.color = color
    this.drawShape()
  }

  step(type) {
    this.prevX = this.x
    this.prevY = this.y
    this['step'+type]()
    this.shape.position.set(this.x, this.y)
    this.shape.scale.set(walkerSize, walkerSize)
    this.shape.rotation += .1
    this.speed = walkerSpeed
    if(mouseAttack && dist(this.x, this.y, mouse.x, mouse.y) < mouseRadius + this.size) {
      this.remove()
    }
  }

  step0() {
    let r = Math.floor(Math.random()*100)
    let p = [25, 50, 75, 100]
    if(r < p[0]) {
      this.x += this.speed 
    }
    else if(r < p[1]) {
      this.x -= this.speed
    }
    else if(r < p[2]) {
      this.y += this.speed
    }
    else if(r <= p[3]) {
      this.y -= this.speed
    }
  }

  step1() {
    let v = Vector2D.random().mult(this.speed * 2)
    this.x += v.x
    this.y += v.y
  }

  step2() {
    let v = Vector2D.randomUnit().mult(this.speed * 2)
    this.x += v.x
    this.y += v.y
  }

  step3() {
    this.tx += .006
    this.ty += .006
    let v = new Vector2D(noise.simplex2(this.tx, 0), noise.simplex2(this.ty, 0)).mult(this.speed*1.5)
    if(mouse.pressed) {
      v.normalize().mult(mouseForce)
      let theta = v.angleBetween(new Vector2D(mouse.x-this.x, mouse.y-this.y))
      theta += map(noise.simplex2(this.ta, 0), -1, 1, -spread, spread)
      this.ta += .01
      v.rotate(theta)
      if(mouse.rightPressed)
         v.mult(-1)
    }
    this.x += v.x
    this.y += v.y
  }

  step4() {
    this.tx += .006
    this.ty += .006
    let v = new Vector2D(noise.simplex2(this.tx, 0), noise.simplex2(this.ty, 0)).normalize().mult(this.speed*1.5) 
    if(mouse.pressed) {
      v.normalize().mult(mouseForce)
      let theta = v.angleBetween(new Vector2D(mouse.x-this.x, mouse.y-this.y))
      theta += map(noise.simplex2(this.ta, 0), -1, 1, -spread, spread)
      this.ta += .01
      v.rotate(theta)
      if(mouse.rightPressed)
         v.mult(-1)
    }
    this.x += v.x
    this.y += v.y
  }

  remove() {
    walkers.remove(this)
    this.shape.destroy()
    n = walkers.length
  }
}

Walker.add = n => {
  for(let i = 0; i < n; i++) {
    walkers.push(new Walker(app.renderer.width/2, app.renderer.height/2, walkerSize, enableColorFilter ? randomColor() : gui.getColor(), app.stage, app.renderer))
  }
}

Walker.remove = n => {
  for(let i = 0; i < n; i++) {
    let walker = walkers.pop()
    if(walker) {
      walker.shape.destroy()
    }
  }
}
