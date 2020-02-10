import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { DoubleSide, VideoTexture, Mesh, Vector3 } from "three";
import {
  PointerEvent,
  ReactThreeFiber,
  useFrame,
  useThree
} from "react-three-fiber";

interface ViewerProps {
  texture: VideoTexture;
  paused: boolean;
  setPaused: Dispatch<SetStateAction<boolean>>;
}

export function Viewer(props: ViewerProps) {
  const mesh = useRef<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>>();
  const { texture, paused, setPaused } = props;
  const [position, setPosition] = useState<{ x: number; y: number; z: number }>(
    { x: 0, y: 0, z: 0 }
  );
  const { camera } = useThree();

  function handlePointerMove(e: PointerEvent) {
    setPosition({ x: e.point.x / 25, y: e.point.y / 90, z: e.point.z / 50 });
  }

  useFrame(() => {
    camera.lookAt(new Vector3(position.x, position.y, position.z));
  });

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={[-1, 1, 1]}
      onPointerMove={handlePointerMove}
      onClick={() => setPaused(!paused)}
    >
      <cylinderGeometry attach="geometry" args={[100, 100, 360, 100]} />
      <meshBasicMaterial attach="material" side={DoubleSide} map={texture} />
    </mesh>
  );
}
