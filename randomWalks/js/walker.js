class Walker {
  constructor(x, y, size, color) {
    this.x = this.prevX = x
    this.y = this.prevY = y
    this.size = size
    this.color = color
    let a = 1000000
    this.tx = random(-a, a)
    this.ty = random(-a, a)
    this.trail = []
  }

  draw() {
    stroke(this.color)
    fill(this.color)
    strokeWeight(this.size)
    line(this.prevX, this.prevY, this.x, this.y)
    // this.drawTrail()
  }

  drawTrail() {
    for(let i = 0; i < this.trail.length-1; i++) {
      let p0 = this.trail[i], p1 = this.trail[i+1]
      this.color.setAlpha(map(i, 0, this.trail.length-2, 0, 255))
      stroke(this.color)
      strokeWeight(map(i, 0, this.trail.length-2, 0, 8))
      line(p0.x, p0.y, p1.x, p1.y)
    }
  }

  step(type) {
    this.prevX = this.x
    this.prevY = this.y
    this['step'+type]()
  }

  step0() {
    let r = random(), c = 3
    if(r < 1/4) {
      this.x += c
      return
    }
    r = random()
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
    let stepX = random(-c, c), stepY = random(-c, c)
    this.x += stepX
    this.y += stepY
  }

  step2() {
    let c = 5
    let v = p5.Vector.random2D()
    this.x += c * v.x
    this.y += c * v.y
  }

  step3() {
    this.tx += .01
    this.ty += .01
    let v = createVector(noise(this.tx)-.47, noise(this.ty)-.47).mult(5)
    if(mouseIsPressed) {
      v.setMag(3)
      let theta = v.angleBetween(createVector(mouseX-this.x, mouseY-this.y))
      //theta *= monteCarlo()
      v.rotate(theta)
      if(mouseButton == RIGHT)
        v.mult(-1)
    }
    this.x += v.x
    this.y += v.y
  }

  step4() {
    this.tx += .05
    this.ty += .05
    let v = createVector(noise(this.tx)-.47, noise(this.ty)-.47).setMag(3)
    if(mouseIsPressed) {
      if(mouse)
      v.setMag(3)
      let theta = v.angleBetween(createVector(mouseX-this.x, mouseY-this.y))
      //theta *= monteCarlo()
      v.rotate(theta)
      if(mouseButton == RIGHT)
        v.mult(-1)
    }
    this.x += v.x
    this.y += v.y
    this.trail.push({x: this.x, y: this.y})
    if(this.trail.length > 10) this.trail.shift()
  }

}