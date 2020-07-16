let m = [
  [1,1,0,1,0,0,1],
  [1,1,1,0,1,0,1],
  [0,1,1,0,0,1,0],
  [1,0,0,1,1,0,0],
  [0,1,0,1,1,1,0],
  [0,0,1,0,1,1,1]
]

// let m = [
//   [1,0,0,1,0,0,1],
//   [1,1,1,0,1,0,1],
//   [0,1,1,0,0,1,0],
//   [1,0,0,1,1,0,0],
//   [0,0,0,1,1,0,0],
//   [0,0,1,0,0,1,1]
// ]

console.time('a')
const n = m.length
let p = {}, lastP = -1
elimination()
log('end')
let minMoves = Infinity
let nul = []
for(let i = 0, j = 0; i < n; i++)
if(!(i in p))
nul.push(i)
let nuls = nul.length
let combs = getCombinations([], nuls, [])
for(let c of combs) {
  let r = []
  c.forEach((val, i) => r[nul[i]] = val)
  for(let i = m.length-1; i >= 0; i--) {
    if(!(i in p))
      continue
    let sum = m[i][n]
    for(let j = p[i]+1; j < n; j++)
      sum += m[i][j] * r[j]
    r[[p[i]]] = sum % 2
  }
  console.log(r)
}
console.timeEnd('a')

function elimination() {
  for(let i = 0; i < n; i++) {

    log('i = ' + i)

    if(lastP + 1 >= n) {
      console.log(`break on i = ${i}`)
      return
    }
    let j = lastP + 1
    while(!m[i][j]) {
      for(let I = i + 1; I < n; I++) {
        if(m[I][j]) {
          [m[i], m[I]] = [m[I], m[i]]
          break
        }
      }
      if(m[i][j])
        break
      j++
      if(j >= n) {
        console.log(`break on j = ${j}`)
        return
      }
    }
    p[i] = lastP = j
    for(let k = i + 1; k < n; k++)
      if(m[k][j])
        for(let a = j; a <= n; a++)
          m[k][a] = (m[k][a] + m[i][a]) % 2
  }
}

function log(label) {
  if(label)
    console.log(label)
  for(let i = 0; i < n; i++) {
    let msg = ''
    for(let j = 0; j < n; j++)
      msg += `${m[i][j]} `
    console.log(msg)
  } 
  console.log()
}

function getCombinations(v, i, res) {
  if(i <= 0) {
    res.push(v)
    return res
  }
  let v_ = v.slice()
  v.push(0)
  v_.push(1)
  getCombinations(v, i-1, res)
  getCombinations(v_, i-1, res)
  return res
}

function verify(m, v, r) {
  for(let i = 0; i < n; i++) {
    let s = 0
    for(let j = 0; j < n; j++) {
      s += m[i][j] * v[j]
    }
    s %= 2
    if(s != r[i]) return false
  }
  return true
}
