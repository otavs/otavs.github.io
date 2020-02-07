class Walker {
  constructor(x, y, s) {
    this.x = x
    this.y = y
    this.s = s
  }

  draw() {
    stroke(0)
    fill(0)
    strokeWeight(5)
    point(this.x, this.y)
  }

  update() {
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