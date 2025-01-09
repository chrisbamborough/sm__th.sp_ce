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

// a function to create rhino geometry
function create() {
  doc = new rhino.File3dm();
  const loader = new THREE.BufferGeometryLoader();

  const cubeSize = 10;
  const spacing = 5;
  const gridSize = 5; // 5x5 grid of cubes

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
        // Define the vertices of the cube
        const vertices = [
          [0, 0, 0],
          [cubeSize, 0, 0],
          [cubeSize, cubeSize, 0],
          [0, cubeSize, 0],
          [0, 0, cubeSize],
          [cubeSize, 0, cubeSize],
          [cubeSize, cubeSize, cubeSize],
          [0, cubeSize, cubeSize],
        ];

        // Offset vertices to position the cube in the grid
        const offset = [
          x * (cubeSize + spacing),
          y * (cubeSize + spacing),
          z * (cubeSize + spacing),
        ];
        const translatedVertices = vertices.map((v) => [
          v[0] + offset[0],
          v[1] + offset[1],
          v[2] + offset[2],
        ]);

        // Define the faces (triangles) of the cube
        const faces = [
          [0, 1, 2],
          [0, 2, 3], // Bottom face
          [4, 5, 6],
          [4, 6, 7], // Top face
          [0, 1, 5],
          [0, 5, 4], // Side faces
          [1, 2, 6],
          [1, 6, 5],
          [2, 3, 7],
          [2, 7, 6],
          [3, 0, 4],
          [3, 4, 7],
        ];

        // Create a Rhino mesh
        const mesh = new rhino.Mesh();
        translatedVertices.forEach((v) =>
          mesh.vertices().add(v[0], v[1], v[2])
        );
        faces.forEach((f) => mesh.faces().addFace(f[0], f[1], f[2]));

        // Add a color for the vertices
        translatedVertices.forEach(() => mesh.vertexColors().add(0, 255, 0)); // Green

        mesh.normals().computeNormals();

        // Convert the Rhino mesh to a Three.js geometry
        const meshGeometry = loader.parse(mesh.toThreejsJSON());
        const material = new THREE.MeshStandardMaterial({ vertexColors: true });
        const threejsMesh = new THREE.Mesh(meshGeometry, material);

        // Add the mesh to the Three.js scene and the Rhino document
        scene.add(threejsMesh);
        doc.objects().add(mesh, null);
      }
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

// Three JS BOILERPLATE //

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
