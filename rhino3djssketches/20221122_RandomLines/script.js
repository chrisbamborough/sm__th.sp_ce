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

  const lineTotal = 10;

  // for loop to create strPt, endPt and line
  for (let i = 0; i < lineTotal; i++) {
    let strPt = [
      Math.floor(Math.random() * 20),
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 20),
    ];
    let endPt = [Math.random(), Math.random(), Math.random()];

    console.log(strPt, endPt);

    let line = new rhino.LineCurve(strPt, endPt);
    console.log(line);

    let lineGeometry = new THREE.BufferGeometry();
    const lineVertices = new Float32Array(line.line.from.concat(line.line.to));
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(lineVertices, 3)
    );
    const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
    const lineObject = new THREE.Line(lineGeometry, lineMaterial);
    scene.add(lineObject);
    doc.objects().add(line.toNurbsCurve(), null);
  }

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
