import * as THREE from "three";
import rhino3dm from "rhino3dm";

let rhino, doc;

async function initRhino() {
  rhino = await rhino3dm();
  doc = new rhino.File3dm();
  console.log("Rhino3dm initialized.");
}

function createGeometry() {
  const loader = new THREE.BufferGeometryLoader();
}

export { initRhino, createGeometry, doc };
