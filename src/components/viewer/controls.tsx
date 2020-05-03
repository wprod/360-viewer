import React, { useEffect, useRef } from 'react';
import { ReactThreeFiber, useFrame, useThree } from 'react-three-fiber';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { PerspectiveCamera } from 'three';

export function Controls(): JSX.Element {
  const controls = useRef<
    ReactThreeFiber.Object3DNode<OrbitControls, typeof OrbitControls>
  >();

  const {
    camera,
    gl: { domElement },
  } = useThree();

  useFrame(() => {
    if (!controls.current) {
      return;
    }

    controls.current.update && controls.current.update();
  });

  useEffect(() => {
    if (!controls.current) {
      return;
    }

    // Vertical
    controls.current.minPolarAngle = (86 * Math.PI) / 180;
    controls.current.maxPolarAngle = (94 * Math.PI) / 180;

    // Horizontal
    const hFov =
      2 *
      Math.atan(
        Math.tan(((camera as PerspectiveCamera).fov * Math.PI) / 180 / 2) *
          (camera as PerspectiveCamera).aspect
      );

    const x = (110 * Math.PI) / 180;

    controls.current.minAzimuthAngle = -x + hFov;
    controls.current.maxAzimuthAngle = x - hFov;
  }, []);

  return (
    <orbitControls
      ref={controls}
      enableDamping={true}
      enableKeys={false}
      enableZoom={false}
      rotateSpeed={-0.1}
      panSpeed={0.5}
      args={[camera, domElement]}
    />
  );
}
