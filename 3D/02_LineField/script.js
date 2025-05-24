import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import rhino3dm from "rhino3dm";

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

  // Define the field size and spacing
  const fieldSize = 10;
  const spacing = 10;

  // Create a field of lines
  for (let x = 0; x < fieldSize; x++) {
    for (let y = 0; y < fieldSize; y++) {
      const ptA = [x * spacing, y * spacing, 0];
      const ptB = [x * spacing, y * spacing, 10];

      const line = new rhino.LineCurve(ptA, ptB);

      const lineGeometry = new THREE.BufferGeometry();
      const lineVertices = new Float32Array(
        line.line.from.concat(line.line.to)
      );
      lineGeometry.setAttribute(
        "position",
        new THREE.BufferAttribute(lineVertices, 3)
      );
      const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
      const lineObject = new THREE.Line(lineGeometry, lineMaterial);
      scene.add(lineObject);
      doc.objects().add(line.toNurbsCurve(), null);
    }
  }

  // Hide the spinner
  document.getElementById("loader").style.display = "none";

  // Enable download button
  downloadButton.disabled = false;

  console.log(scene);
}

// download button handler
function download() {
  const options = new rhino.File3dmWriteOptions();
  options.version = 7;
  let buffer = doc.toByteArray(options);
  saveByteArray("rhinoObjectTypes" + options.version + ".3dm", buffer);
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
