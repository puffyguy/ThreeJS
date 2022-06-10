import './style.css'
import * as THREE from 'three'

//Scene
const scene = new THREE.Scene()

//Aspect Ration is the width of the render divided by height of render
const aspectRatio = {
  width: 500,
  height: 400,
}
const fov = 75 //Field of view is the vertical vision angle in degrees always keep it in between 45-75

const camera = new THREE.PerspectiveCamera(fov, aspectRatio.width / aspectRatio.height)
camera.position.set(2,2,2)
scene.add(camera)

//Lights
const ambientLight = new THREE.AmbientLight({color: 0xffffff, intensity: 0.1})
scene.add(ambientLight)

//Object
const box = new THREE.Mesh(
  new THREE.BoxGeometry(1,1,1),
  new THREE.MeshStandardMaterial({color: 0xfff444}),
)
scene.add(box)

//Rendere
const rendrer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#renderCanvas'),
})
rendrer.setSize(aspectRatio.width, aspectRatio.height)

const clock = new THREE.Clock()
//Animate
const animate = () => {
  const elapsedTime = clock.getElapsedTime()
  
  //Update objects 
  // box.position.y = Math.sin(elapsedTime)
  // box.position.x = Math.cos(elapsedTime)
  // box.rotation.x += 0.02
  
  camera.position.y = Math.sin(elapsedTime)
  camera.position.x = Math.cos(elapsedTime)
  camera.lookAt(box.position)
  
  rendrer.render(scene, camera)

  window.requestAnimationFrame(animate)
}
animate()