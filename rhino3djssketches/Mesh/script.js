import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.126.0/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.126.0/examples/jsm/controls/OrbitControls.js";
import rhino3dm from "https://cdn.jsdelivr.net/npm/rhino3dm@0.15.0-beta/rhino3dm.module.js";

const downloadButton = document.getElementById("downloadButton");
downloadButton.onclick = download;

let rhino, doc;
rhino3dm().then(async (m) => {
  console.log("Loaded rhino3dm.");
  rhino = m; // global
  init();
  create();
});

function create() {
  doc = new rhino.File3dm();
  const loader = new THREE.BufferGeometryLoader();

  // -- POINTS / POINTCLOUDS -- //

  // POINTS

  let ptA = [0, 0, 0];
  const ptB = [10, 0, 0];
  const ptC = [10, 10, 0];

  // -- MESHES -- //

  const mesh = new rhino.Mesh();
  mesh.vertices().add(ptA[0], ptA[1], ptA[2]);
  mesh.vertices().add(ptB[0], ptB[1], ptB[2]);
  mesh.vertices().add(ptC[0], ptC[1], ptC[2]);

  mesh.faces().addFace(0, 1, 2);

  mesh.vertexColors().add(255, 0, 255);
  mesh.vertexColors().add(0, 255, 255);
  mesh.vertexColors().add(255, 255, 255);

  mesh.normals().computeNormals();

  const meshGeometry = loader.parse(mesh.toThreejsJSON());
  const threejsMesh = new THREE.Mesh(
    meshGeometry,
    new THREE.MeshStandardMaterial({ vertexColors: true })
  );
  scene.add(threejsMesh);
  doc.objects().add(mesh, null);

  // hide spinner
  document.getElementById("loader").style.display = "none";

  // enable download button
  downloadButton.disabled = false;

  console.log(scene);
}

// download button handler
function download() {
  let buffer = doc.toByteArray();
  saveByteArray("rhinoObjects.3dm", buffer);
}

function saveByteArray(fileName, byte) {
  let blob = new Blob([byte], { type: "application/octect-stream" });
  let link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

// BOILERPLATE //

let scene, camera, renderer;

function init() {
  // Rhino models are z-up, so set this as the default
  THREE.Object3D.DefaultUp = new THREE.Vector3(0, 0, 1);

  scene = new THREE.Scene();
  scene.background = new THREE.Color(1, 1, 1);
  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.z = 50;

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);

  const light = new THREE.DirectionalLight();
  scene.add(light);

  window.addEventListener("resize", onWindowResize, false);

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  animate();
}
