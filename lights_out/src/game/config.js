import states from 'game/states'

const config = {
  n: 6,
  m: 6,
  state: states.PLAY,
  showSolution: false,
  gap: 3,
  squareSize: 100,
  initStates: [
    [1,1,0,1,0,0,1],
    [1,1,1,0,1,0,1],
    [0,1,1,0,0,1,0],
    [1,0,0,1,1,0,0],
    [0,1,0,1,1,1,0],
    [0,0,1,0,1,1,1]
  ]
}

export default config