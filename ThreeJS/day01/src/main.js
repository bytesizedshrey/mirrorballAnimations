import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const size = {
  width: window.innerWidth,
  height : window.innerHeight
}

//Scene
const scene = new THREE.Scene()
const clock = new THREE.Clock()

//Camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width/size.height,
  0.01,
  100
)

//camera position
camera.position.z = 5;

//mesh
const geometry = new THREE.BoxGeometry(1,1,1)//width , height , depth
const material = new THREE.MeshBasicMaterial({
  color: 'red',
})

//actor
const cube = new THREE.Mesh(geometry,material)
// cube.rotation.y = 1.1
// cube.rotation.x = 1.1
scene.add(cube)
//canvas(parda)
const canvas = document.querySelector("canvas")

//renderer : which canvas needs to be projected
const renderer = new THREE.WebGLRenderer({
  canvas,
})

const controls = new OrbitControls( camera, renderer.domElement );
controls.enableDamping = true 


//aspect ratio
renderer.setSize(size.width,size.height)

window.addEventListener('resize',()=>{
  size.width = window.innerWidth,
  size.height = window.innerHeight

  camera.aspect = size.width/size.height
  camera.updateProjectionMatrix()


  renderer.setSize(size.width, size.height)
})


//ANIMATE
const animate = () => {
  const delta = clock.getElapsedTime()

  cube.rotation.y = delta;

  controls.update();

  //on
  renderer.render(scene,camera)

  //depends on fps
  requestAnimationFrame(animate);
}

animate()