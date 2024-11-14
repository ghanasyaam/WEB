import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

renderer.render(scene, camera);

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xFF6347 });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff, 100, 100);
pointLight.position.set(5, 5, 5); // Adjust position for better lighting

const lightHelper = new THREE.PointLightHelper(pointLight, 1);
const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add( pointLight);

const controls = new OrbitControls(camera, renderer.domElement);

// Function to add stars in a wider area
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Basic material for stars (doesn't depend on lighting)
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200)); // Spread stars within 200 units
  star.position.set(x, y, z);
  scene.add(star);
}

// Add 200 stars to the scene
Array(200).fill().forEach(addStar);
const spaceTexture = new THREE.TextureLoader().load('space.jpg');
spaceTexture.minFilter = THREE.LinearFilter; 
spaceTexture.magFilter = THREE.LinearFilter;
scene.background = spaceTexture;

renderer.setPixelRatio(window.devicePixelRatio);


// Add a grid helper with a more reasonable size
const gridHelper = new THREE.GridHelper(100, 100);
// scene.add(gridHelper);

// Adjust camera position and direction
camera.position.set(0, 20, 40);
camera.lookAt(0, 0, 0);



function animate() {
  requestAnimationFrame(animate);

  // Rotate the torus
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  controls.update();

  renderer.render(scene, camera);
}

animate();

const jeffTexture = new THREE.TextureLoader().load('jeff.png');

const jeff = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({ map: jeffTexture })
);


scene.add(jeff);

