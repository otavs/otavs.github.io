class Vector2D {
  constructor(x, y) {
    this.x = x
    this.y = y
  }

  add(v) {
    this.x += x
    this.y += y
    return this
  }

  sub(v) {
    this.x -= x
    this.y -= y
    return this
  }

  mult(k) {
    this.x *= k
    this.y *= k
    return this
  }

  div(k) {
    this.x /= k
    this.y /= k
    return this
  }

  mag() {
    return Math.sqrt(this.x*this.x + this.y*this.y)
  }

  normalize() {
    this.div(this.mag())
    return this
  }

  dot(v) {
    return this.x * v.x + this.y * v.y 
  }

  angle() {
    return Math.atan2(this.y, this.x)
  }

  angleBetween(v) {
    return v.angle() - this.angle()
  }

  rotate(theta) {
    let cos = Math.cos(theta), sin = Math.sin(theta), x = this.x, y = this.y
    this.x = x*cos - y*sin
    this.y = x*sin + y*cos
    return this
  }
}

Vector2D.random = () => new Vector2D(Math.random()*2-1, Math.random()*2-1).normalize()