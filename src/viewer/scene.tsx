import React, { useEffect, useRef } from 'react';
import {
  DoubleSide,
  VideoTexture,
  Mesh,
  Vector3,
  PlaneGeometry,
  Texture,
} from 'three';
import { Dom, extend, ReactThreeFiber } from 'react-three-fiber';
import { PointOfInterest } from './models/models';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Controls } from './controls';
import { buildPlaneGeometry } from './utils/utils';
import './styles/video.scss';
extend({ OrbitControls });

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Object3DNode<
        OrbitControls,
        typeof OrbitControls
      >;
    }
  }
}

interface ViewerProps {
  texture: VideoTexture | Texture;
  pointsOfInterest?: PointOfInterest[];
}

export function Scene(props: ViewerProps): JSX.Element {
  const { texture, pointsOfInterest } = props;
  const verticesPerRow = 51;

  const mesh = useRef<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>>();
  const planeGeometry = useRef<
    ReactThreeFiber.Object3DNode<PlaneGeometry, typeof PlaneGeometry>
  >();

  useEffect(() => {
    if (planeGeometry.current && planeGeometry.current.vertices) {
      planeGeometry.current.vertices = buildPlaneGeometry(
        verticesPerRow,
        planeGeometry.current.vertices
      );
    }
  }, []);

  function renderPOI(
    pointsOfInterest: PointOfInterest[]
  ): JSX.Element[] | undefined {
    return pointsOfInterest.map((poi: PointOfInterest, index: number) => (
      <Dom
        position={new Vector3(poi.position.x, poi.position.y, poi.position.z)}
        key={`${index}-poi`}
      >
        <a href={poi.link} className="poi">
          {poi.name}
        </a>
      </Dom>
    ));
  }

  return (
    <>
      <mesh {...props} ref={mesh} position={[0, 0, 850]}>
        <planeGeometry
          ref={planeGeometry}
          attach="geometry"
          args={[1920, 1080, verticesPerRow - 1, verticesPerRow - 1]}
        />
        <meshBasicMaterial attach="material" side={DoubleSide} map={texture} />
      </mesh>
      <Controls />
      {pointsOfInterest && renderPOI(pointsOfInterest)}
    </>
  );
}
