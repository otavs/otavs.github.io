

function drawCircle(c) {
	fill(c.color)
	stroke(c.color)
	circle(c.x, c.y, c.radius * 2)
}

function updateCircle(c) {
	if(mouseIsPressed && dist(c.x, c.y, mouseX, mouseY) < c.radius + mouseRadius) {
		deleteCircle(c)
	}
	if(!blockX)
		c.x += c.vx * speed
	if(!blockY)
		c.y += c.vy * speed
	
	if(leftBorder && c.x < c.radius) {
		c.x = c.radius
		c.vx *= -1
	}
	if(!leftBorder && c.x < -c.radius) {
		deleteCircle(c)
	}

	if(rightBorder && c.x > windowWidth - c.radius) {
		c.x = windowWidth - c.radius
		c.vx *= -1
	}
	if(!rightBorder && c.x > windowWidth + c.radius) {
		deleteCircle(c)
	}

	if(topBorder && c.y < c.radius) {
		c.y = c.radius
		c.vy *= -1
	}
	if(!topBorder && y < -radius) {
		deleteCircle(c)
	}

	if(bottomBorder && c.y > windowHeight - c.radius) {
		c.y = windowHeight - c.radius
		c.vy *= -1
	}
	if(!bottomBorder && c.y > windowHeight + c.radius) {
		deleteCircle(c)
	}
}

function deleteCircle(c) {
	delete entityList[c.id]
	qtd--
}