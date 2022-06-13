import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import gsap from "gsap"
import * as dat from "dat.gui"
import { BoxGeometry } from "three"

//Scene
const scene = new THREE.Scene()

//Aspect Ration is the width of the render divided by height of render
const aspectRatio = {
  width: window.innerWidth,
  height: window.innerHeight,
}
const fov = 75 //Field of view is the vertical vision angle in degrees always keep it in between 45-75

const camera = new THREE.PerspectiveCamera(
  fov,
  aspectRatio.width / aspectRatio.height,
  0.1,
  1000
)
camera.position.set(0, 3, 4)
scene.add(camera)

//Get canvas
const canvas = document.querySelector("#renderCanvas")

//Rendere
const rendrer = new THREE.WebGLRenderer({
  canvas: canvas,
})
rendrer.setPixelRatio(window.devicePixelRatio)
rendrer.setSize(aspectRatio.width, aspectRatio.height)

//Lights
const ambientLight = new THREE.AmbientLight({ color: 0xffffff, intensity: 0.1 })
scene.add(ambientLight)

//Grid helper
const gridHelper = new THREE.GridHelper(50, 50)
scene.add(gridHelper)

//Textures
const loadingManager = new THREE.LoadingManager()
const textureLoader = new THREE.TextureLoader(loadingManager) 
const texture = textureLoader.load()

//Object
//Box color
const parameters = {
  color: 0xffff00,
  spin: () => {
    gsap.to(box.rotation, {duration: 1, y: box.rotation.y + 10})
  }
}
//Box Mesh
const box = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshStandardMaterial({ color: parameters.color, wireframe: false }),
  )
  scene.add(box)

//Sphere Mesh
const geometry = new THREE.TorusBufferGeometry(1, 2, 10, 6, 1, 2)
const material = new THREE.MeshStandardMaterial({color: parameters.color, wireframe: true})
const sphereMesh = new THREE.Mesh(geometry, material)
sphereMesh.position.set(-1, 0, 0)
// sphereMesh.scale.set(2,2,1)
scene.add(sphereMesh)
console.log(geometry.attributes.uv);

  //Debug GUI
const gui = new dat.GUI()

gui.addColor(parameters, "color").onChange(() => {
  box.material.color.set(parameters.color)
})
gui.add(box.position, "y").min(-1).max(1).step(0.01).name("elevation")
gui.add(box, "visible").name("Visiblitiy")
gui.add(box.material, "wireframe")
gui.add(parameters, 'spin')

//Window resizing
window.addEventListener("resize", () => {
  //update window sizes
  aspectRatio.width = window.innerWidth
  aspectRatio.height = window.innerHeight

  //update camera
  camera.aspect = aspectRatio.width / aspectRatio.height
  camera.updateProjectionMatrix()

  //update renderer
  rendrer.setSize(aspectRatio.width, aspectRatio.height)
  rendrer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//Toggle Fullscreen on mouse double click
window.addEventListener("dblclick", () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen()
  } else {
    document.exitFullscreen()
  }
})

//Mouse Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// const ram = document.getElementById('ram').host
// //Ram
// function onRam(){
//   alert('Button clicked')
//   console.log(ram);
//   return false
// }

const clock = new THREE.Clock()
//Animate
const animate = () => {
  window.requestAnimationFrame(animate)

  const elapsedTime = clock.getElapsedTime()

  //Update objects
  // box.position.y = Math.sin(elapsedTime)
  // box.position.x = Math.cos(elapsedTime)
  box.rotation.x += 0.02
  camera.lookAt(box.position)

  // camera.position.y = Math.sin(elapsedTime)
  // camera.position.x = Math.cos(elapsedTime)
  // camera.lookAt(box.position)

  //Update controls
  controls.update()
  rendrer.render(scene, camera)
}
animate()
