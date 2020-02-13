function createGUI() {
	gui = new dat.GUI({
		name: 'guiName'
	})
	gui.close()
}

function populateGUI() {
	const controlFolder = gui.addFolder('Control')
	controlFolder.open()
	controlFolder.add(window, 'n')
	controlFolder.add(window, 'nSteps', 0, 100).listen()
	controlFolder.add(window, 'startWalkers')
}