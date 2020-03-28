function initGUI() {
  gui = new dat.GUI({closed: true})

  curFolder = gui
  add(window, 'n', 2000, 0, 10000, 1).listen().onChange(() => {
    let len = walkers.length 
    if(len < n) Walker.add(n - len)
    else Walker.remove(len - n)
  }).name('N')

  folder('Walker')
  add(window, 'walkerSpeed', 1, 0, 20).name('').name('Speed')
  add(window, 'walkerSize', 2, 0, 20).name('Size')

  folder('Mouse')
  add(window, 'mouseForce', 3, 1, 100).name('Force')
  add(window, 'spread', 1.5, 0, Math.PI).name('Spread')
  add(window, 'mouseRadius', 5, 0, 100).name('Radius').onChange(() => {
    mouseCircle.clear()
    mouseCircle.lineStyle(1, 0xFFFFFF)
    mouseCircle.drawCircle(0, 0, mouseRadius)
  })
  add(window, 'showMouse', false).name('Visible').onChange(() => mouseCircle.visible = showMouse)
  add(window, 'mouseAttack', false).name('Attack')
  
  folder('Background')
  addColor(window, 'bgColor', 0).onChange(() => {
    app.renderer.backgroundColor = bgColor
    redrawFade()
  }).name('Color')
  add(window, 'fade', true).onChange(() => {
    setFadingEffect(!preserveBuffer && fade)
    setBufferPreserving(preserveBuffer || fade)
  }).name('Fade')
  add(window, 'preserveBuffer', false).onChange(() => {
    setFadingEffect(!preserveBuffer && fade)
    setBufferPreserving(preserveBuffer || fade)
  }).name('Preserve Buffer')
  
  folder('Color')
  let sliderR, sliderG, sliderB
  add(window, 'randomR', false).name('Random R').onChange(() => changeWalkerColors()).listen()
  sliderR = add(window, 'R', 0, 0, 255).name('R').onChange(() => changeWalkerColors()).listen()
  add(window, 'randomG', true).name('Random G').onChange(() => changeWalkerColors()).listen()
  sliderG = add(window, 'G', 255, 0, 255).name('G').onChange(() => changeWalkerColors()).listen()
  add(window, 'randomB', false).name('Random B').onChange(() => changeWalkerColors()).listen()
  sliderB = add(window, 'B', 255, 0, 255).name('B').onChange(() => changeWalkerColors()).listen()
  add(window, 'enableColorFilter', false).name('???').listen().onChange(() => {
    if(enableColorFilter) initColorMatrix()
    else app.stage.filters = []
    changeWalkerColors(enableColorFilter)
  })
  
  folder('Movement')
  add(window, 'stepType', 3, {
    RandomDiscrete: 0,
    Random: 1,
    RandomNormal: 2,
    Noise: 3,
    NoiseNormal: 4
  }).name('Movement')

  folder('Config')
  add(window, 'fullScreen', false).name('Full Screen').onChange(toggleFullScreen)
  add(window, 'rendering', true).onChange(() => {
    rendering ? app.ticker.start() : app.ticker.stop()
  }).name('Render')
  addPlainText('Press H to hide the GUI')

  folder('Info')
  add(window, 'showStats', false).name('Stats').onChange(() => stats.domElement.style.display = showStats ? 'block' : 'none')
  add(mouse, 'x', mouse.x).listen().name('Mouse X')
  add(mouse, 'y', mouse.y).listen().name('Mouse Y')

  folder('Download')
  add(window, 'downloadCanvas').name('Download Canvas')

  gui.getColor = () => {
    let r = randomR ? random(R) : R
    let g = randomG ? random(G) : G
    let b = randomB ? random(B) : B
    return rgb(r, g, b)
  }

  function folder(name) {
    curFolder = (name !== undefined) ? gui.addFolder(name) : gui
    curFolder.close()
  }

  function add(obj, attr, init, ...args) {
    if(init !== undefined) obj[attr] = init
    return curFolder.add(obj, attr, ...args)
  }

  function addColor(obj, attr, init) {
    obj[attr] = init
    return curFolder.addColor(obj, attr)
  }

  function addPlainText(text) {
    console.log(text)
    let controller = add(window, 'auxText_', '')
    controller.domElement.remove()
    let span = controller.__li.getElementsByTagName('span')[0]
    span.innerHTML = text
    span.style.overflow = 'visible'
    span.style.whiteSpace = 'pre'
    delete auxText_
  }
}

