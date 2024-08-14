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

  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array(ptA);
  geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
  const pointsMaterial = new THREE.PointsMaterial({ color: 0xff0000 });
  const threejsPoint = new THREE.Points(geometry, pointsMaterial);

  scene.add(threejsPoint);
  doc.objects().addPoint(ptA);

  // POINTCLOUD

  const ptB = [10, 0, 0];
  const ptC = [10, 10, 0];
  const ptD = [0, 10, 0];
  const ptE = [20, 20, 20];
  const ptF = [30, 0, 0];
  const ptG = [35, 5, 0];
  const ptH = [40, -5, 0];
  const ptI = [45, 5, 0];
  const ptJ = [50, 0, 0];

  const red = { r: 255, g: 0, b: 0, a: 0 };

  const pointCloud = new rhino.PointCloud();
  pointCloud.add(ptA, red);
  pointCloud.add(ptB, red);
  pointCloud.add(ptC, red);
  pointCloud.add(ptD, red);
  pointCloud.add(ptE, red);
  pointCloud.add(ptF, red);
  pointCloud.add(ptG, red);
  pointCloud.add(ptH, red);
  pointCloud.add(ptI, red);
  pointCloud.add(ptJ, red);

  const threejsPointsGeometry = loader.parse(pointCloud.toThreejsJSON());
  const threejsPoints = new THREE.Points(threejsPointsGeometry, pointsMaterial);

  scene.add(threejsPoints);
  doc.objects().add(pointCloud, null);

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
