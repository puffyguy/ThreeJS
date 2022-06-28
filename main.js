import "./style.css"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { Pane } from "tweakpane"
//Get canvas
const canvas = document.querySelector("#renderCanvas")

//GUI Tweakpane
const pane = new Pane()

const createCamera = () => {
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
  camera.position.set(0, 1.2, 4)

  //Rendere
  const rendrer = new THREE.WebGLRenderer({
    canvas: canvas,
  })
  rendrer.setPixelRatio(window.devicePixelRatio)
  rendrer.setSize(aspectRatio.width, aspectRatio.height)

  return [camera, aspectRatio, rendrer]
}
//call createCamera
const [camera, aspectRatio, rendrer] = createCamera()

//Create Scene
const createScene = () => {
  //Scene
  const scene = new THREE.Scene()
  scene.background = new THREE.Color(0xC0C0C0)

  // const params = {
  //   camera: {x: 0, y: 0, z: 0}
  // }
  // pane.addInput(camera.position, "x",{min: -3, max: 3, step: 0.1})
  scene.add(camera)

  //Lights
  const ambientLight = new THREE.AmbientLight({
    color: 0xffffff,
    intensity: 0.1,
  })

  const pointLight = new THREE.PointLight({
    color: 0xffffff,
    intensity: 1,
  })
  pointLight.position.set(0, 1.2, 3)
  scene.add(ambientLight, pointLight)
  // scene.add(new THREE.PointLightHelper(pointLight))

  //Grid helper
  const gridHelper = new THREE.GridHelper(20)
  scene.add(gridHelper)
  return [scene]
}
//call createScene
const [scene] = createScene()

//Model
let cpu = THREE.Object3D
const loader = new GLTFLoader()
function loadCPU() {
  loader.load(
    "./assets/BasicCPU.glb",
    (gltf) => {
      cpu = gltf.scene
      cpu.position.set(0, 0.2, 0)
      cpu.rotation.set(0, 0, 0)
      scene.add(cpu)
    },
    (xhr) => {
      console.log((xhr.loaded / xhr.total) * 100 + "% loaded")
    },
    (error) => {
      console.log("An error happened", error)
    }
  )
  return cpu
}
loadCPU()

// //Raycaster
const raycaster = new THREE.Raycaster()
const mouse = new THREE.Vector2()

canvas.addEventListener("click", onClick)
function onClick(event) {
  event.preventDefault()
  mouse.x = (event.clientX / aspectRatio.width) * 2 - 1
  mouse.y = -(event.clientY / aspectRatio.height) * 2 + 1

  raycaster.setFromCamera(mouse, camera)

  let cpuFull = cpu.children[0].children
  // console.log(cpuFull);
  let intersects = raycaster.intersectObjects(cpuFull, true)
  console.log(intersects)
  if (intersects.length > 0) {
    let cpuPart = intersects[0].object
    console.log(cpuPart)
    if (cpuPart.name === "Front_Panel") {
      console.log(cpuPart.name)
      cpuPart.position.set(2, 1, 1)
    }
    if (cpuPart.name === "HDD_Tray") {
      console.log(cpuPart.name)
      cpuPart.position.set(-2, 1, -1)
    }
    if (cpuPart.name === "Lower_Compartment") {
      console.log(cpuPart.name)
      cpuPart.position.set(4, 1, -1)
    }
    if (cpuPart.name === "Side_Panel") {
      console.log(cpuPart.name)
      cpuPart.position.set(-4, 1, -1)
    }
    if (cpuPart.parent.name === "SMPS") {
      console.log(cpuPart.parent.name)
      cpuPart.parent.position.set(-3, 1, -1)
    }
    if (cpuPart.parent.name === "CPU_air_Cooler") {
      console.log(cpuPart.parent.name)
      cpuPart.parent.position.set(3, 1, -0.8)
    }
    if (cpuPart.parent.name === "Motherboard") {
      console.log(cpuPart.parent.name)
      cpuPart.parent.position.set(-3, 1, 2)
    }
    if (cpuPart.parent.name === "Intel_Actual_Chip") {
      console.log(cpuPart.parent.name)
      cpuPart.parent.position.set(-2, 1, 2)
    }
    if (cpuPart.parent.name === "RAM_4") {
      console.log(cpuPart.parent.name)
      cpuPart.parent.position.set(3.5, 1, 1)
    }
    if (cpuPart.parent.name === "RAM_3") {
      console.log(cpuPart.parent.name)
      cpuPart.parent.position.set(3.3, 1, 1.2)
    }
    if (cpuPart.parent.name === "RAM_2") {
      console.log(cpuPart.parent.name)
      cpuPart.parent.position.set(3.1, 1, 1.4)
    }
    if (cpuPart.parent.name === "RAM_1") {
      console.log(cpuPart.parent.name)
      cpuPart.parent.position.set(2.9, 1, 1.6)
    }
    if (cpuPart.parent.name === "Fan__back") {
      console.log(cpuPart.parent.name)
      cpuPart.parent.position.set(1.8, 1, 2)
    }
  }
}
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

const clock = new THREE.Clock()
//Animate
const animate = () => {
  window.requestAnimationFrame(animate)

  const elapsedTime = clock.getElapsedTime()
  //Update objects
  // camera.lookAt()
  // camera.position.y = Math.sin(elapsedTime)
  // camera.position.x = Math.cos(elapsedTime)

  //Update controls
  controls.update()
  rendrer.render(scene, camera)
}
animate()
