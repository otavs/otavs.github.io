class Circle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = randomColor()
        this.vx = random(3, 6) * (random(-1, 1) > 0 ? -1 : 1)
        // this.vx = 0
        this.vy = random(3, 6) * (random(-1, 1) > 0 ? -1 : 1)
        this.id = newID++
    }

    update() {
        this.x += this.vx * velocity
        this.y += this.vy * velocity
        if(this.x < this.radius) {
            this.x = this.radius
            this.vx *= -1
        }
        if(this.x > windowWidth - this.radius) {
            this.x = windowWidth - this.radius
            this.vx *= -1
        }
        if(this.y < this.radius) {
            this.y = this.radius
            this.vy *= -1
            // delete entityList[this.id]
            // addCircle()
        }
        if(this.y > windowHeight - this.radius) {
            this.y = windowHeight - this.radius
            this.vy *= -1
        }
    }

    draw() {
        fill(this.color)
        stroke(this.color)
        circle(this.x, this.y, this.radius * 2)
    }
}