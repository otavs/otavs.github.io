class Walker {
  constructor(x, y, s, color) {
    this.x = x
    this.y = y
    this.s = s
    this.color = color
    let a = 1000000
    this.tx = random(-a, a)
    this.ty = random(-a, a)
    this.step = type => this['step'+type]()
  }

  draw() {
    stroke(this.color)
    fill(this.color)
    strokeWeight(1)
    circle(this.x, this.y, this.s/2+1)
  }

  drawPoint() {
    strokeWeight(this.s)
    point(this.x, this.y)
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
    let c = 5;
    let stepX = (noise(this.tx)-.47) * c
    let stepY = (noise(this.ty)-.47) * c
    this.x += stepX
    this.y += stepY
  }
}