import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { gsap } from 'gsap'
import params from './params'
import './style.css'

const width = window.innerWidth
const height = window.innerHeight

const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10)
camera.position.z = 2

const cubeSize = 0.2

const scene = new THREE.Scene()

const geometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize)
const redMaterial = new THREE.MeshStandardMaterial({ color: 0xff0000 })
const blueMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff })

generateGrid()

const ambientLight = new THREE.AmbientLight(0xffffff, 0.9)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(5, 5, 5)
scene.add(directionalLight)

const directionalLight2 = new THREE.DirectionalLight(0xffffff, 1)
directionalLight2.position.set(-5, -5, 5)
scene.add(directionalLight2)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(width, height)
renderer.setAnimationLoop(animate)
document.body.appendChild(renderer.domElement)

new OrbitControls(camera, renderer.domElement)

function animate() {
  renderer.render(scene, camera)
}

function generateGrid() {
  scene.children = scene.children.filter((child) => !(child instanceof THREE.Mesh))

  for (let x = 0; x < params.gridSize; x++) {
    for (let y = 0; y < params.gridSize; y++) {
      for (let z = 0; z < params.gridSize; z++) {
        const cubeMesh = createCube(x, y, z)
        scene.add(cubeMesh)
      }
    }
  }
}

function createCube(x: number, y: number, z: number) {
  const { gridSize, spacing } = params
  const isRed = x == 0 || y == 0 || z == 0 || x == gridSize - 1 || y == gridSize - 1 || z == gridSize - 1
  const material = isRed ? redMaterial : blueMaterial

  const mesh = new THREE.Mesh(geometry, material)
  const fixCenter = spacing / 2
  mesh.position.set((x - gridSize / 2) * spacing + fixCenter, (y - gridSize / 2) * spacing + fixCenter, (z - gridSize / 2) * spacing + fixCenter)

  return mesh
}

let isMoved = false

params.toggleRedCubes = () => {
  isMoved = !isMoved

  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh && child.material === redMaterial) {
      const cube = child
      const origin = new THREE.Vector3(0, 0, 0)
      const currentPosition = cube.position.clone()

      const direction = currentPosition.sub(origin).normalize()

      const targetPosition = cube.position.clone().add(direction.multiplyScalar(0.2))

      gsap.to(cube.position, {
        x: targetPosition.x,
        y: targetPosition.y,
        z: targetPosition.z,
        duration: 1,
        ease: 'power2.out',
      })
    }
  })
}

params.reset = generateGrid

const gui = new GUI({
  title: 'Controls',
})

gui
  .add(params, 'cuts', 0, 10, 1)
  .onChange((cuts: number) => {
    params.gridSize = cuts + 1
    generateGrid()
  })
  .name('Cuts')
// gui.add(params, 'spacing', 0, 10).onChange(() => updateGrid())
gui.add(params, 'toggleRedCubes').name('Move Red Cubes')
gui.add(params, 'reset').name('Reset')
