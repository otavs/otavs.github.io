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
    strokeWeight(5)
    point(this.x, this.y)
    // circle(this.x, this.y, 5)
  }

  step() {
    let choice = Math.floor(random(4))
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
}