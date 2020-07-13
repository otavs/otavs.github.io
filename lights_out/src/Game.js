const game = p5 => {
  let x = 100
  let y = 100

  p5.setup = () => {
    p5.createCanvas(200, 200)
  }

  p5.draw = () => {
    p5.background(0)
    p5.fill(255)
    p5.rect(x, y, 50, 50)
  }
}

export default game