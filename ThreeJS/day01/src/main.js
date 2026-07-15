import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader, RGBELoader, DRACOLoader } from 'three/examples/jsm/Addons.js';

const size = {
  width: window.innerWidth,
  height : window.innerHeight
}

//Scene
const scene = new THREE.Scene()
const clock = new THREE.Clock()

//texture loader
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load('https://images.unsplash.com/photo-1531850959096-cfbb6f26c5a8?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ()=> {
    console.log('texture is loaded')
  },
  ()=>{
    console.log('texture is loading')
  },
  ()=>{
    console.log('error')
  }
)
const texture2 = textureLoader.load('https://images.unsplash.com/photo-1593544340816-93d84a106415?q=80&w=2390&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')

//rgbeLoader
const rgbeLoader = new RGBELoader()
rgbeLoader.load('./envMap.hdr', 
  (texture)=>{
    texture.mapping = THREE.EquirectangularReflectionMapping

    // scene.background = texture
    scene.environment = texture
  },
  ()=>{
    console.log('rgbe is loading')
  },
  (err)=>{
    console.error('error loading rgbe environment map', err)
  }
)

// //GLTF loader
// let mixer = null;
// const gltfLoader = new GLTFLoader();

// // Configure Draco Loader for compressed model
// const dracoLoader = new DRACOLoader();
// dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.7/');
// gltfLoader.setDRACOLoader(dracoLoader);

// gltfLoader.load("./LittlestTokyo.glb",(gltf)=>{
//   const model = gltf.scene;

//   // Scale down LittlestTokyo as it is originally huge
//   model.scale.set(0.01, 0.01, 0.01);
//   model.position.y = -1

//   console.log(gltf.animations)

//   if (gltf.animations && gltf.animations.length > 0) {
//     mixer = new THREE.AnimationMixer(model)
//     const action = mixer.clipAction(gltf.animations[0])
//     action.play()
//   }

//   scene.add(model)
// }, undefined, (err) => {
//   console.error("Error loading glTF model:", err);
// })

//Camera
const camera = new THREE.PerspectiveCamera(
  75,
  size.width/size.height,
  0.01,
  100
)

//camera position
camera.position.z = 5;

//lights
const ambientLight = new THREE.AmbientLight('#ffffff',1.2)
scene.add(ambientLight)

//directional light
// const directionalLight = new THREE.DirectionalLight("#ffffff",3)

// directionalLight.position.set(1,1,1)

// scene.add(directionalLight)

// const DirectionalLightHelper = new THREE.DirectionalLightHelper(directionalLight)
// scene.add(DirectionalLightHelper)

// const pointLight = new THREE.PointLight('#ffffff',2,1.2,1)

// pointLight.position.set(0,2,0)

// scene.add(pointLight)

// const pointLightHelper = new THREE.PointLightHelper(pointLight)

// scene.add(pointLightHelper)


//mesh
// const geometry = new THREE.BoxGeometry(1,1,1)//width , height , depth
const geometry = new THREE.CapsuleGeometry( 1, 1, 4, 8, 1 );

// const material = new THREE.MeshBasicMaterial({
// color : 'red'
// })

const material = new THREE.MeshStandardMaterial({
  color: 'red',
  metalness : 0.999,
  roughness : 0.1
})

//actor
const cube = new THREE.Mesh(geometry,material)

const raycaster = new THREE.Raycaster()

const mouse = new THREE.Vector2()

window.addEventListener('mousemove',(e)=>{
  mouse.x = (e.clientX/window.innerWidth) * 2 - 1,
  mouse.y = -(e.clientY/window.innerHeight) * 2 + 1

  // console.log(mouse.x,mouse.y)
})

// cube.rotation.x = Math.PI / 3
// cube.scale.set(1,2,3)//xyz
// cube.position.set(1.5,-2,-2.4)
// cube.rotation.y = 1.1
// cube.rotation.x = 1.1
scene.add(cube)

window.addEventListener("click",()=>{
  raycaster.setFromCamera(mouse,camera)

  const intersect = raycaster.intersectObject(cube)

  if(intersect.length > 0){
    cube.material.color.set("blue")
  }
})
//canvas(parda) 
const canvas = document.querySelector("canvas")

//renderer : which canvas needs to be projected
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
})
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

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
  const delta = clock.getDelta()

  // if (mixer) {
  //   mixer.update(delta)
  // }

  // cube.rotation.y = clock.getElapsedTime();

  controls.update();

  //on
  renderer.render(scene,camera)

  //depends on fps
  requestAnimationFrame(animate);
}

animate()