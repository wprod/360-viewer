import { useEffect, useState } from 'react';
import { Vector3 } from 'three';

interface Size {
  width: number | undefined;
  height: number | undefined;
}

export function useResize(): Size {
  const isClient = typeof window === 'object';

  function getSize(): Size {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined,
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    function handleResize(): void {
      setWindowSize(getSize());
    }

    window.addEventListener('resize', handleResize);

    return (): void => {
      window.removeEventListener('resize', handleResize);
    };
  }, [getSize]);

  return windowSize;
}

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
