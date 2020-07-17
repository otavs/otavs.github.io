import config from 'game/config'
import solve from 'game/solve'
import Square from 'game/Square'

const game = p5 => {
  let canvas, parent, squares

  p5.setup = () => {
    parent = p5.canvas.parentNode
    canvas = p5.createCanvas(parent.offsetWidth, parent.offsetHeight)
    restart()
  }

  p5.draw = () => {
    let {n, m} = config
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < m; j++) {
        squares[i][j].update(p5)
        updateSquares()
        squares[i][j].draw(p5)
      }
    }
  }

  p5.mousePressed = e => {
    // console.log(e)
    if(e.type != 'mousedown') 
      return true
    let {n, m} = config
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < m; j++) {
        squares[i][j].checkMouseClick(p5.mouseX, p5.mouseY)
      }
    }
  }

  // not working when resized with split pane
  p5.windowResized = () => {
    console.log('RESIZED')
    p5.resizeCanvas(parent.offsetWidth, parent.offsetHeight)
  }

  function squareClick(i, j) {
    let {n, m} = config
    squares[i][j].changeState()
    if(i-1 >= 0)squares[i-1][j].changeState()
    if(j-1 >= 0)squares[i][j-1].changeState()
    if(i+1 < n) squares[i+1][j].changeState()
    if(j+1 < m) squares[i][j+1].changeState()
  }

  function restart() {
    buildSquares()
  }
  
  function buildSquares() {
    let {initStates, gap, squareSize, n, m} = config
    let size = squareSize 
    size = Math.min(canvas.canvas.offsetWidth, canvas.canvas.offsetHeight) / (Math.max(n, m) + gap)
    squares = []
    for(let i = 0, y = gap; i < n; i++, y += size+gap) {
      squares[i] = []
      for(let j = 0, x = gap; j < m; j++, x += size+gap) {
        squares[i][j] = new Square(x, y, size, size, initStates[i][j], i, j, squareClick)
      }
    }
  }

  function updateSquares() {
    let {gap, squareSize, n, m} = config
    let size = squareSize 
    size = Math.min(canvas.canvas.offsetWidth, canvas.canvas.offsetHeight) / (Math.max(n, m) + gap)
    if(p5.mouseIsPressed) console.log(canvas.canvas.offsetWidth, canvas.width, p5.width)
    for(let i = 0, y = gap; i < n; i++, y += size+gap) {
      for(let j = 0, x = gap; j < m; j++, x += size+gap) {
        squares[i][j].x = x
        squares[i][j].y = y
        squares[i][j].w = size
        squares[i][j].h = size
      }
    }
  }

  window.solve = () => solve(squares)

}

export default game