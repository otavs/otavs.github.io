class Walker {
  constructor(x, y, s, color) {
    this.x = x
    this.y = y
    this.s = s
    this.color = color
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

  step() {
    let choice = Math.floor(random(4))
    let r = random()
    if(r < .25) choice = 0
    else {
      choice = Math.floor(random()*3) + 1
    }
    if(choice == 0) {
      this.x += this.s
    }
    if(choice == 1) {
      this.x -= this.s
    }
    if(choice == 2) {
      this.y += this.s
    }
    if(choice == 3) {
      this.y -= this.s
    }
  }

  step2() {
    let c = 7
    let stepX = random(-c, c), stepY = random(-c, c)
    this.x += stepX
    this.y += stepY
  }

  step3() {
    
  }
}