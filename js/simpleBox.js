// import modules
import * as THREE from "three";

// set the canvas
const canvas = document.querySelector(".webgl");

// Set up scene
const scene = new THREE.Scene();

// Set up camera
const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100);
camera.position.set(1, 1, 2);
camera.lookAt(0, 0, 0);
scene.add(camera);

// Add geometry
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({ color: 0x781ce5 });
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// create material

// Add lights
const ambient = new THREE.AmbientLight(0x404040, 5);
const point = new THREE.PointLight(0xe4ff00, 1, 10);
point.position.set(3, 3, 2);
scene.add(ambient);
scene.add(point);

// Create Render
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setClearColor(0x222222);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Animate
function animate() {
  mesh.rotation.x += 0.003;
  mesh.rotation.y += 0.004;
  mesh.rotation.z += 0.005;

  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
}

animate();
