import React from 'react';
import {
  DoubleSide,
  VideoTexture,
  Vector3,
  Texture,
  Raycaster,
  Vector2,
} from 'three';
import {
  Dom,
  extend,
  ReactThreeFiber,
  useThree,
  PointerEvent,
} from 'react-three-fiber';
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

const rayCaster = new Raycaster();

export function Scene(props: ViewerProps): JSX.Element {
  const { texture, pointsOfInterest } = props;
  const { camera, scene } = useThree();

  function onClick(e: PointerEvent) {
    const screen = scene.getObjectByName('screen');

    if (!screen) {
      return;
    }

    const mouse = new Vector2(
      (e.clientX / window.innerWidth) * 2 - 1,
      -(e.clientY / window.innerHeight) * 2 + 1
    );

    rayCaster.setFromCamera(mouse, camera);

    const intersects = rayCaster.intersectObject(screen);

    if (intersects.length > 0) {
      pointsOfInterest?.push({
        position: {
          x: intersects[0].point.x,
          y: intersects[0].point.y,
          z: intersects[0].point.z,
        },
        name: 'Grenoble',
        link: 'https://www.chamonix.com/',
      });
    }

    console.log(pointsOfInterest);
  }

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
      <mesh
        {...props}
        name={'screen'}
        position={[0, 0, 0]}
        scale={[-1, 1, 1]}
        onClick={(e) => onClick(e)}
      >
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
