import config from 'game/config'

export default function solve(squares) {
  let {n, m} = config
  // build matrix A
  let A = []
  for(let i = 0; i < n; i++) {
    for(let j = 0; j < m; j++) {
      let I = pos(i, j)
      A[I] = []
      ;[pos(i, j), pos(i-1, j), pos(i, j-1), pos(i+1, j), pos(i, j+1)]
      .filter(x => x != -1).map(x => A[I][x] = 1)
      for(let k = 0; k < n*m; k++)
        if(!(k in A[I])) A[I][k] = 0
      A[I][n*m] = squares[i][j].state
    }
  }
  console.log(A)
  // gaussian elimination
  return A

}

function pos(i, j) {
  let {n, m} = config
  if(i < 0 || j < 0 || i >= n || j >= m)
    return -1
  return i*n + j
}