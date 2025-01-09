import { initRhino, createMeshCubeArray, doc } from "./geometry.js";
import { initScene, addMesh } from "./visualization.js";

//const downloadButton = document.getElementById("downloadButton");
//downloadButton.onclick = download;

async function main() {
  await initRhino();
  initScene();

  const gridSize = 5;
  const meshes = createMeshCubeArray(gridSize);
  meshes.forEach((mesh) => addMesh(mesh)); // Add all meshes to the scene

  document.getElementById("loader").style.display = "none";
  downloadButton.disabled = false;
}

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

main();
