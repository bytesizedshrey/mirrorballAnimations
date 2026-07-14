import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Scene
const scene = new THREE.Scene()

//Camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth/window.innerHeight,
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
renderer.setSize(window.innerWidth,window.innerHeight)

const animate = () => {
  cube.rotation.y += 0.1;

  controls.update();

  //on
  renderer.render(scene,camera)

  //depends on fps
  requestAnimationFrame(animate);
}

animate()