import { Vector3 } from 'three';

export function buildPlaneGeometry(
  verticesPerRow: number,
  vertices: Vector3[]
): Vector3[] {
  // Loop over rows of vertices
  for (let row = 0; row < verticesPerRow; row++) {
    // Loop over row's vertices
    for (let vertexIndex = 0; vertexIndex < verticesPerRow; vertexIndex++) {
      // Displace
      vertices[row * verticesPerRow + vertexIndex].z =
        -Math.cos((row - verticesPerRow / 2) / (verticesPerRow / 2)) * 240 +
        -Math.cos((vertexIndex - verticesPerRow / 2) / (verticesPerRow / 2)) *
          1000;
    }
  }

  return vertices;
}
