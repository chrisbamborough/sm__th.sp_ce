// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

// import canvas sketch
const canvasSketch = require("canvas-sketch");

// import simplex noise
const openSimplexNoise = require("open-simplex-noise");
//const random = require("canvas-sketch-util/random");

const settings = {
  // Make the loop animated
  animate: true,
  // Get a WebGL canvas rather than 2D
  context: "webgl",
};

const sketch = ({ context }) => {
  // Setup your scene
  const scene = new THREE.Scene();

  // Setup a camera
  const camera = new THREE.PerspectiveCamera(50, 1, 0.01, 100);
  camera.position.set(0, 0, -4);
  camera.lookAt(new THREE.Vector3());

  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas,
    ntialias: true,
    alpha: true,
  });

  // Setup camera controller
  const controls = new THREE.OrbitControls(camera, context.canvas);

  // WebGL background color
  renderer.setClearColor("#000", 1);

  // Setup vectors
  let v3 = new THREE.Vector3();

  // GEOMETRY
  // setup box geometry
  const planeGeometry = new THREE.BoxGeometry(2, 2, 1, 5, 5, 5);
  //planeGeometry.translate(3, 0, 0);
  planeGeometry.positionData = [];

  for (let i = 0; i < planeGeometry.attributes.position.count; i++) {
    v3.fromBufferAttribute(planeGeometry.attributes.position, i);
    planeGeometry.positionData.push(v3.clone());
  }

  // MATERIALS
  // setup planemesh material
  const planeMesh = new THREE.MeshBasicMaterial({
    color: 0x898989,
    wireframe: true,
  });

  // MESH
  // settup plane mesh
  const plane = new THREE.Mesh(planeGeometry, planeMesh);
  scene.add(plane);

  // NOISE
  const noise = openSimplexNoise.makeNoise4D(Date.now());
  const clock = new THREE.Clock();

  // ANIMATION
  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      renderer.setPixelRatio(pixelRatio);
      renderer.setSize(viewportWidth, viewportHeight, false);
      camera.aspect = viewportWidth / viewportHeight;
      camera.updateProjectionMatrix();
    },

    // Update & render your scene here
    render({ time }) {
      controls.update();

      let t = clock.getElapsedTime() / 1;

      planeGeometry.positionData.forEach((p, idx) => {
        let sineWave = (Math.sin(t) * Math.PI) / 100 + 1;
        let setNoise = noise(p.x, p.y, p.z, t / 3);
        v3.copy(p).addScaledVector(p, setNoise);
        planeGeometry.attributes.position.setXYZ(idx, v3.x, v3.y, v3.z);
      });
      planeGeometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    },

    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      controls.dispose();
      renderer.dispose();
    },
  };
};

canvasSketch(sketch, settings);
