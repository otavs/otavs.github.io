import config from 'game/config'
import Square from 'game/Square'

const game = p5 => {
  let canvas, parent, boardSize, squares

  p5.setup = () => {
    parent = p5.canvas.parentNode
    canvas = p5.createCanvas(parent.offsetWidth, parent.offsetHeight)
    boardSize = Math.min(p5.width, p5.height)
    restart()
  }

  p5.draw = () => {
    let {n, m} = config
    p5.background('#bdf3ff')
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < m; j++) {
        squares[i][j].update(p5)
        squares[i][j].draw(p5)
      }
    }
  }

  p5.mousePressed = () => {
    let {n, m} = config
    for(let i = 0; i < n; i++) {
      for(let j = 0; j < m; j++) {
        squares[i][j].checkMouseClick(p5.mouseX, p5.mouseY)
      }
    }
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
    squares = []
    for(let i = 0, y = gap; i < n; i++, y += squareSize+gap) {
      squares[i] = []
      for(let j = 0, x = gap; j < m; j++, x += squareSize+gap) {
        squares[i][j] = new Square(x, y, squareSize, squareSize, initStates[i][j], i, j, squareClick)
      }
    }
  }

  function solve() {
    
  }
}

export default game