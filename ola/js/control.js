function addCircle() {
	let newCircle = new Circle(random(spawnRangeMinX, spawnRangeMaxX), random(spawnRangeMinY, spawnRangeMaxY), random(5, 15), randomColor())
	entityList[newCircle.id] = newCircle
	qtd++
}

function removeCircle() {
	for(let i in entityList) {
		delete entityList[i]
		qtd--
		break
	}
}

function addCircles(n) {
	for(let i = 0; i < n; i++) {
		addCircle()
	}
}

function removeCircles(n) {
	for(let i = 0; i < n; i++) {
		removeCircle()
	}
}

function add10Circles() {
	addCircles(10)
}

function remove10Circles() {
	removeCircles(10)
}

function removeAll() {
	removeCircles(qtd)
}