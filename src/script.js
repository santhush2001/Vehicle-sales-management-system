import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as dat from 'dat.gui'

// ----- Canvas -----
const canvas = document.querySelector('canvas.webgl')

// ----- Sizes -----
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// ----- Scene -----
const scene = new THREE.Scene()
// Remove the solid color background to use a background model instead
scene.background = new THREE.Color(0xffffff)

// ----- Camera -----
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 2
scene.add(camera)

// ----- Renderer -----
const renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true })
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// ----- Lighting -----
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8)
scene.add(ambientLight)

const spotLight = new THREE.SpotLight(0xffffff, 0.5)
spotLight.position.set(-40, 60, -10)
scene.add(spotLight)

// ----- Loaders -----
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/') // Ensure the path to Draco decoder is correct

const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)

// ----- Car Model Variables -----
let car
let carBodyMaterials = []
let wheels = []
let doors = []
let currentModel = 'car.glb'

// ----- Background Model Variable -----
let backgroundModel

/// ----- Loading Message -----
const loadingMessage = document.createElement('div');
loadingMessage.innerText = 'Loading...';
loadingMessage.style.position = 'absolute';
loadingMessage.style.top = '50%';
loadingMessage.style.left = '50%';
loadingMessage.style.transform = 'translate(-50%, -50%)';
loadingMessage.style.fontSize = '32px';
loadingMessage.style.color = '#ff4500'; // Vibrant orange
loadingMessage.style.fontFamily = "'Poppins', sans-serif"; // Modern, stylish font
loadingMessage.style.textShadow = '2px 2px 8px rgba(0, 0, 0, 0.3)'; // Adds depth
loadingMessage.style.animation = 'pulse 1.5s infinite ease-in-out';

// Append to the body
document.body.appendChild(loadingMessage);

// Add keyframe animation styles
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@600&display=swap'); /* Stylish font */

  @keyframes pulse {
    0% {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(0.9);
    }
    50% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0.5;
      transform: translate(-50%, -50%) scale(0.9);
    }
  }
`;
document.head.appendChild(styleSheet);


// ----- Normalize Model Scale Function -----
function normalizeModelScale(model) {
    const box = new THREE.Box3().setFromObject(model) // Calculate bounding box
    const size = new THREE.Vector3()
    box.getSize(size) // Get the dimensions of the bounding box

    const maxDimension = Math.max(size.x, size.y, size.z) // Largest dimension
    const scaleFactor = 1 / maxDimension // Normalize to fit within a unit size
    model.scale.set(scaleFactor, scaleFactor, scaleFactor)
}

// ----- Load Car Model Function -----
function loadCarModel(modelPath) {
    loadingMessage.style.display = 'block' // Show loading message
    gltfLoader.load(
        modelPath,
        (gltf) => {
            if (car) {
                scene.remove(car) // Remove previous model
            }
            car = gltf.scene
            carBodyMaterials = []
            wheels = []
            doors = []

            car.traverse((child) => {
                if (child.isMesh) {
                    // Identify and store materials and parts
                    if (
                        child.name.toLowerCase().includes('body') ||
                        child.material.name.toLowerCase().includes('paint')
                    ) {
                        carBodyMaterials.push(child.material)
                    }
                    if (child.name.toLowerCase().includes('wheel')) {
                        wheels.push(child)
                    }
                    if (child.name.toLowerCase().includes('door')) {
                        doors.push(child)
                    }
                }
            })

            normalizeModelScale(car)

            console.log('Loaded model:', modelPath)
            console.log('Car body materials:', carBodyMaterials)
            console.log('Wheels:', wheels)
            console.log('Doors:', doors)

            scene.add(car)
            loadingMessage.style.display = 'none' // Hide loading message
        },
        undefined,
        (error) => {
            console.error('Error loading car model:', error)
            loadingMessage.style.display = 'none' // Hide loading message on error
        }
    )
}

// ----- Load Background Model Function -----
function loadBackgroundModel(modelPath) {
    gltfLoader.load(
        modelPath,
        (gltf) => {
            backgroundModel = gltf.scene

            // Scale and position the background model
            backgroundModel.scale.set(10, 10, 10) // Adjust scale as needed
            backgroundModel.position.set(0, -5, -20) // Position it behind the main scene

            // Optimize background model rendering
            backgroundModel.traverse((child) => {
                if (child.isMesh) {
                    child.material.depthWrite = false // Prevent depth conflicts
                    child.material.side = THREE.BackSide // Render the inside of the model
                }
            })

            scene.add(backgroundModel)
            console.log('Background model loaded:', modelPath)
        },
        undefined,
        (error) => {
            console.error('Error loading background model:', error)
        }
    )
}

// ----- Initial Load Calls -----
loadCarModel(currentModel) // Load the initial car model
loadBackgroundModel('background.glb') // Load your background .glb model

// ----- Orbit Controls -----
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// ----- Resize Event -----
window.addEventListener('resize', () => {
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// ----- Fullscreen Toggle -----
window.addEventListener('dblclick', () => {
    if (!document.fullscreenElement) {
        canvas.requestFullscreen()
    } else {
        document.exitFullscreen()
    }
})

// ----- Dat.GUI Setup -----
const gui = new dat.GUI()
const carOptions = {
    bodyColor: '#ff0000',
    openDoors: false,
    doorAngle: 0,
    scale: 1,
}

// ----- Body Color Controller -----
gui.addColor(carOptions, 'bodyColor').onChange((value) => {
    carBodyMaterials.forEach((material) => {
        material.color.set(value)
    })
})

// ----- Open Doors Controller -----
gui.add(carOptions, 'openDoors').name('Open Doors').onChange(() => {
    carOptions.doorAngle = carOptions.openDoors ? 90 : 0
})

// ----- Scale Controller -----
gui.add(carOptions, 'scale', 0.5, 2).name('Scale').onChange((value) => {
    car.scale.set(value, value, value)
})

// ----- Rotate 360 Button -----
let isRotating = false
const rotateButton = document.createElement('button')
rotateButton.innerText = 'Rotate 360'
rotateButton.style.position = 'absolute'
rotateButton.style.top = '40px'
rotateButton.style.right = '20px'
rotateButton.style.padding = '10px 20px'
rotateButton.style.backgroundColor = '#ffffff'
rotateButton.style.border = '2px solid #000'
rotateButton.style.cursor = 'pointer'
document.body.appendChild(rotateButton)

rotateButton.addEventListener('click', () => {
    isRotating = !isRotating
    rotateButton.innerText = isRotating ? 'Stop Rotation' : 'Rotate 360'
})

// ----- Models and Buttons -----
const models = ['car.glb', 'jeep.glb', 'van.glb', 'bike.glb', 'scania_r440.glb', 'lorry.glb', 'ducati_panigale_v4.glb', 'free_mazda_6_sedan_2011_arvr_lowpoly_3d_model.glb', 'generic_town_bus.glb']
models.forEach((model, index) => {
    const button = document.createElement('button')
    button.innerText = `Load Model ${index + 1}`
    button.style.position = 'absolute'
    button.style.top = `${40 + (index * 50)}px`
    button.style.left = '20px'
    button.style.padding = '10px 20px'
    button.style.backgroundColor = '#ffffff'
    button.style.border = '2px solid #000'
    button.style.cursor = 'pointer'
    document.body.appendChild(button)

    button.addEventListener('click', () => {
        currentModel = models[index]
        loadCarModel(currentModel)
    })
})

// ----- Back Button -----
const backButton = document.createElement('button')
backButton.innerText = 'Back'
backButton.style.position = 'absolute'
backButton.style.top = `${40 + (models.length * 50) + 20}px`
backButton.style.left = '20px'
backButton.style.padding = '10px 20px'
backButton.style.backgroundColor = '#ffffff'
backButton.style.border = '2px solid #000'
backButton.style.cursor = 'pointer'
document.body.appendChild(backButton)

backButton.addEventListener('click', () => {
    window.location.href = 'http://localhost:5173/'
})

// ----- Animation Loop -----
const animate = () => {
    controls.update()

    // Rotate wheels
    wheels.forEach((wheel) => {
        wheel.rotation.x += 0.05
    })

    // Open/Close doors
    doors.forEach((door) => {
        const targetRotation = carOptions.doorAngle * (Math.PI / 180)
        door.rotation.y = THREE.MathUtils.lerp(door.rotation.y, targetRotation, 0.1)
    })

    // Rotate the entire car model if enabled
    if (isRotating) {
        car.rotation.y += 0.01
    }

    renderer.render(scene, camera)
    requestAnimationFrame(animate)
}




animate()
