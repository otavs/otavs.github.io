function createGUI() {
	gui = new dat.GUI({
		name: 'ola'
	})
	gui.close()
}

function populateGUI() {
	const controlFolder = gui.addFolder('Movement')
	controlFolder.add(window, 'speed', 0, 10).listen()
	controlFolder.add(window, 'blockX').listen()
	controlFolder.add(window, 'blockY').listen()
	
	const spawnFolder = gui.addFolder('Spawn')
	spawnFolder.add(window, 'addCircle')
	spawnFolder.add(window, 'removeCircle')
	spawnFolder.add(window, 'add10Circles')
	spawnFolder.add(window, 'remove10Circles')
	spawnFolder.add(window, 'removeAll')
	spawnFolder.add(window, 'autoSpawn').listen()
	spawnFolder.add(window, 'maxQuantity', 0, 1000).listen()
	gui.spawnRangeMinX = spawnFolder.add(window, 'spawnRangeMinX', 0, windowWidth).listen().name('Min spawn x')
	gui.spawnRangeMaxX = spawnFolder.add(window, 'spawnRangeMaxX', 0, windowWidth).listen().name('Max spawn x')
	gui.spawnRangeMinY = spawnFolder.add(window, 'spawnRangeMinY', 0, windowHeight).listen().name('Min spawn y')
	gui.spawnRangeMaxY = spawnFolder.add(window, 'spawnRangeMaxY', 0, windowHeight).listen().name('Max spawn y')
	
	const borderFolder = gui.addFolder('Border')
	borderFolder.add(window, 'leftBorder').name('Left')
	borderFolder.add(window, 'rightBorder').name('Right')
	borderFolder.add(window, 'topBorder').name('Top')
	borderFolder.add(window, 'bottomBorder').name('Bottom')

	const bgFolder = gui.addFolder('Background')
	bgFolder.add(window, 'clearBg').listen()
	bgFolder.addColor(window, 'bgColor')
	
	const mouseFolder = gui.addFolder('Mouse')
	mouseFolder.add(window, 'showMouse')
	mouseFolder.add(window, 'mouseRadius', 0, windowWidth).listen()
	mouseFolder.addColor(window, 'mouseColor')


	const infoFolder = gui.addFolder('Info')
	infoFolder.add(window, 'mouseX').listen()
	infoFolder.add(window, 'mouseY').listen()
	infoFolder.add(window, 'qtd').listen()
	infoFolder.add(window, 'fps').listen()
}