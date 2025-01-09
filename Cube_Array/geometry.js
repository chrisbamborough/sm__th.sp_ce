import * as THREE from "three";
import rhino3dm from "rhino3dm";

let rhino, doc;

async function initRhino() {
  rhino = await rhino3dm();
  doc = new rhino.File3dm();
  console.log("Rhino3dm initialized.");
}

function createMeshCubeArray(gridSize = 5, cubeSize = 10, spacing = 5) {
  const loader = new THREE.BufferGeometryLoader();

  const meshes = [];

  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      for (let z = 0; z < gridSize; z++) {
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

        const faces = [
          [0, 1, 2],
          [0, 2, 3],
          [4, 5, 6],
          [4, 6, 7],
          [0, 1, 5],
          [0, 5, 4],
          [1, 2, 6],
          [1, 6, 5],
          [2, 3, 7],
          [2, 7, 6],
          [3, 0, 4],
          [3, 4, 7],
        ];

        const mesh = new rhino.Mesh();
        translatedVertices.forEach((v) =>
          mesh.vertices().add(v[0], v[1], v[2])
        );
        faces.forEach((f) => mesh.faces().addFace(f[0], f[1], f[2]));

        mesh.vertexColors().add(0, 255, 0);
        mesh.normals().computeNormals();

        const meshGeometry = loader.parse(mesh.toThreejsJSON());
        //const material = new THREE.MeshStandardMaterial({ vertexColors: true });
        const material = new THREE.MeshStandardMaterial({
          vertexColors: false, // Use vertex colors
          color: 0x00ff00, // Default green color
          roughness: 0.5, // Adjust roughness for more realistic light interaction
          metalness: 0.1, // Simulate a slightly metallic surface
          side: THREE.DoubleSide, // Make sure both sides of the mesh are rendered
        });

        const threejsMesh = new THREE.Mesh(meshGeometry, material);

        doc.objects().add(mesh, null);
        meshes.push(threejsMesh);
      }
    }
  }

  return meshes; // Return an array of meshes to be added to the scene
}

export { initRhino, createMeshCubeArray, doc };
