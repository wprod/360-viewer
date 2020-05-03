import React from 'react';
import { DoubleSide, VideoTexture, Vector3, Texture } from 'three';
import { Dom, extend, ReactThreeFiber } from 'react-three-fiber';
import { PointOfInterest } from './models/models';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Controls } from './controls';
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
  zFar: number;
}

export function Scene(props: ViewerProps): JSX.Element {
  const { texture, pointsOfInterest, zFar } = props;

  function renderPOI(
    pointsOfInterest: PointOfInterest[]
  ): JSX.Element[] | undefined {
    return pointsOfInterest.map((poi: PointOfInterest, index: number) => (
      <Dom
        position={new Vector3(poi.position.x, poi.position.y, -100)}
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
      <mesh {...props} name={'screen'} position={[0, 0, 0]} scale={[-1, 1, 1]}>
        <sphereGeometry
          attach="geometry"
          args={[
            10,
            15,
            15,
            (160 * Math.PI) / 180,
            (220 * Math.PI) / 180,
            Math.PI / 3,
            Math.PI / 3,
          ]}
        />
        <meshBasicMaterial attach="material" side={DoubleSide} map={texture} />
      </mesh>
      <Controls />
      {pointsOfInterest && renderPOI(pointsOfInterest)}
    </>
  );
}
