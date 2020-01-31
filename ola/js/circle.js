class Circle {
	constructor(x, y, radius, color) {
		this.x = x
		this.y = y
		this.radius = radius
		this.color = randomColor()
		this.vx = random(3, 6) * (random(-1, 1) > 0 ? -1 : 1)
		this.vy = random(3, 6) * (random(-1, 1) > 0 ? -1 : 1)
		this.id = newID++
	}

	draw() {
		fill(this.color)
		stroke(this.color)
		circle(this.x, this.y, this.radius * 2)
	}

	update() {
		if(mouseIsPressed && dist(this.x, this.y, mouseX, mouseY) < this.radius + mouseRadius) {
			this.delete()
		}
		if(!blockX)
			this.x += this.vx * speed
		if(!blockY)
			this.y += this.vy * speed
		
		if(leftBorder && this.x < this.radius) {
			this.x = this.radius
			this.vx *= -1
		}
		if(!leftBorder && this.x < -this.radius) {
			this.delete()
		}

		if(rightBorder && this.x > windowWidth - this.radius) {
			this.x = windowWidth - this.radius
			this.vx *= -1
		}
		if(!rightBorder && this.x > windowWidth + this.radius) {
			this.delete()
		}

		if(topBorder && this.y < this.radius) {
			this.y = this.radius
			this.vy *= -1
		}
		if(!topBorder && this.y < -this.radius) {
			this.delete()
		}

		if(bottomBorder && this.y > windowHeight - this.radius) {
			this.y = windowHeight - this.radius
			this.vy *= -1
		}
		if(!bottomBorder && this.y > windowHeight + this.radius) {
			this.delete()
		}
	}

	delete() {
		delete entityList[this.id]
		qtd--
	}
}