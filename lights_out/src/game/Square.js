export default class Square {
  constructor(x, y, w, h, state, i, j, onClick) {
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.state = state
    this.i = i
    this.j = j
    this.onClick = onClick
  }
  update(p5) {
    
  }
  draw(p5) {
    p5.fill(this.getColor())
    p5.rect(this.x, this.y, this.w, this.h)
  }
  checkMouseClick(x, y) {
    if(x >= this.x && x <= this.x+this.w && y >= this.y && y <= this.y+this.h) {
      this.onClick(this.i, this.j)
    }
  }
  changeState() {
    this.state = (this.state+1)%2
  }
  getColor() {
    switch(this.state) {
      case 0: return '#000000'
      case 1: return '#f2fc32'
      default: return '#ffffff'
    }
  }
}