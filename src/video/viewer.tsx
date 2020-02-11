import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { DoubleSide, VideoTexture, Mesh, Vector3 } from "three";
import {
  Dom,
  PointerEvent,
  ReactThreeFiber,
  useFrame,
  useThree
} from "react-three-fiber";
import { PointOfInterest } from "./models";

interface ViewerProps {
  texture: VideoTexture;
  paused: boolean;
  setPaused: Dispatch<SetStateAction<boolean>>;
  pointsOfInterest: PointOfInterest[];
}

export function Viewer(props: ViewerProps) {
  const mesh = useRef<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>>();
  const { texture, paused, setPaused, pointsOfInterest } = props;

  const [position, setPosition] = useState<{ x: number; y: number; z: number }>(
    { x: 0, y: 0, z: 0 }
  );

  const { camera } = useThree();

  function handlePointerMove(e: PointerEvent) {
    setPosition({ x: e.point.x / 50, y: e.point.y / 75, z: e.point.z / 40 });
  }

  useFrame(() => {
    camera.lookAt(new Vector3(position.x, position.y, position.z));
  });

  function renderPOI() {
    return pointsOfInterest.map(poi => (
      <Dom
        position={new Vector3(poi.position.x, poi.position.y, poi.position.z)}
      >
        <a className="poi" href={poi.link}>
          {poi.name}
        </a>
      </Dom>
    ));
  }

  return (
    <>
      <mesh
        {...props}
        ref={mesh}
        scale={[-1, 1, 1]}
        onPointerMove={handlePointerMove}
        onClick={() => setPaused(!paused)}
      >
        <cylinderGeometry
          attach="geometry"
          args={[100, 100, 400, 30, 1, true]}
        />
        <meshBasicMaterial attach="material" side={DoubleSide} map={texture} />
      </mesh>
      {renderPOI()}
    </>
  );
}
