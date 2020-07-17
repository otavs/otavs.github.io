function map(n, start1, stop1, start2, stop2) {
  return ((n-start1)/(stop1-start1))*(stop2-start2)+start2
}

function rgb(r, g, b) {
  return (r << 16) + (g << 8) + b
}

function dist(x0, y0, x1, y1) {
  return Math.hypot(x0 - x1, y0 - y1)
}

function distSquared(x0, y0, x1, y1) {
  return (x0-x1)*(x0-x1) + (y0-y1)*(y0-y1)
}

function random(a = 1, b) {
  if(b === undefined) return Math.random() * a
  if(a < b) return Math.random() * (b-a) + a
  return Math.random() * (a-b) + b
}

function randomColor() {
  return rgb(random(255), random(255), random(255))
}