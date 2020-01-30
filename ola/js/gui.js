function createGUI() {
    gui = new dat.GUI({
        name: 'ola'
    })
    gui.close()
}

function populateGUI() {
    const controlFolder = gui.addFolder('Control')
    controlFolder.add(window, 'velocity', 0, 10).listen()
    controlFolder.add(window, 'blockX').listen()
    controlFolder.add(window, 'blockY').listen()
    controlFolder.add(window, 'addCircle')
    controlFolder.add(window, 'removeCircle')

    let mouseFolder = gui.addFolder('Mouse')
    mouseFolder.add(window, 'mouseSize', 0, windowWidth).listen()
    mouseFolder.addColor(window, 'mouseColor')

    let bgFolder = gui.addFolder('Background')
    bgFolder.add(window, 'clearBg').listen()
    bgFolder.addColor(window, 'bgColor')

    let infoFolder = gui.addFolder('Info')
    infoFolder.add(window, 'mouseX').listen()
    infoFolder.add(window, 'mouseY').listen()
    infoFolder.add(window, 'fps').listen()
}