import React, {
  Dispatch,
  MutableRefObject,
  SetStateAction,
  useEffect,
  useRef
} from "react";
import { DoubleSide, VideoTexture, Mesh, Vector3, PlaneGeometry } from "three";
import { Dom, extend, ReactThreeFiber } from "react-three-fiber";
import { PointOfInterest } from "./models";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Controls } from "./controls";
extend({ OrbitControls });

declare global {
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
  texture: VideoTexture;
  pointsOfInterest: PointOfInterest[];
}

export function Video(props: ViewerProps) {
  const { texture, pointsOfInterest } = props;
  const verticesPerRow = 101;

  // Refs
  const mesh = useRef<ReactThreeFiber.Object3DNode<Mesh, typeof Mesh>>();
  const planeGeometry = useRef<
    ReactThreeFiber.Object3DNode<PlaneGeometry, typeof PlaneGeometry>
  >();

  useEffect(() => {
    if (planeGeometry.current && planeGeometry.current.vertices) {
      // Loop over rows of vertices
      for (let row = 0; row < verticesPerRow; row++) {
        // Loop over row's vertices
        for (let vertexIndex = 0; vertexIndex < verticesPerRow; vertexIndex++) {
          // Displace
          planeGeometry.current.vertices[row * verticesPerRow + vertexIndex].z =
            -Math.cos((row - verticesPerRow / 2) / (verticesPerRow / 2)) * 240 +
            -Math.cos(
              (vertexIndex - verticesPerRow / 2) / (verticesPerRow / 2)
            ) *
              1000;
        }
      }
    }
  }, []);

  function renderPOI() {
    return pointsOfInterest.map((poi: PointOfInterest, index: number) => (
      <Dom
        position={new Vector3(poi.position.x, poi.position.y, poi.position.z)}
        key={`${index}-poi`}
      >
        <a href={poi.link} className="button nav-link">
          <div className="bottom"></div>

          <div className="top">
            <div className="label">{poi.name}</div>

            <div className="button-border button-border-left" />
            <div className="button-border button-border-top" />
            <div className="button-border button-border-right" />
            <div className="button-border button-border-bottom" />
          </div>
        </a>
      </Dom>
    ));
  }

  return (
    <>
      <mesh {...props} ref={mesh} scale={[1, 1, 1]} position={[0, 0, 850]}>
        <planeGeometry
          ref={planeGeometry}
          attach="geometry"
          args={[1920, 1080, verticesPerRow - 1, verticesPerRow - 1]}
        />
        <meshBasicMaterial attach="material" side={DoubleSide} map={texture} />
      </mesh>
      <Controls />
      {renderPOI()}
    </>
  );
}
