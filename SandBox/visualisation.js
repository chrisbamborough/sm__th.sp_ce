import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

let scene, camera, renderer;

function initScene() {
  THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(1, 1, 1); // White background

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.set(50, 50, 100); // Position the camera
  camera.lookAt(0, 0, 0); // Look at the center of the scene

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  // Lighting setup
  //const ambientLight = new THREE.AmbientLight(0x404040, 2); // Soft white light
  const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // Brighter ambient light
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  //directionalLight.position.set(10, 10, 10); // Position it above and to the side
  directionalLight.position.set(20, 20, 50);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0xffffff, 1, 100);
  pointLight.position.set(0, 0, 50); // Positioned above the center
  scene.add(pointLight);

  // Add a helper for debugging light positions
  const lightHelper = new THREE.PointLightHelper(pointLight);
  scene.add(lightHelper);

  window.addEventListener("resize", onWindowResize, false);

  animate();
}

function addMesh(mesh) {
  scene.add(mesh);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

export { initScene, addMesh };
