import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from "react";
import { DoubleSide, VideoTexture, Mesh, Vector3, PlaneGeometry } from "three";
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
  const planeGeometry = useRef<
    ReactThreeFiber.Object3DNode<PlaneGeometry, typeof PlaneGeometry>
  >();
  const vertices = 10;
  const { texture, paused, setPaused, pointsOfInterest } = props;

  const [position, setPosition] = useState<{ x: number; y: number; z: number }>(
    { x: 0, y: 0, z: 0 }
  );

  const { camera } = useThree();

  function handlePointerMove(e: PointerEvent) {
    const xFactor = 0.34;
    const yFactor = 0.34;

    const x =
      e.point.x / 500 > xFactor
        ? xFactor
        : e.point.x / 500 < -xFactor
        ? -xFactor
        : e.point.x / 500;
    const y =
      e.point.y / 500 > yFactor
        ? yFactor
        : e.point.y / 500 < -yFactor
        ? -yFactor
        : e.point.y / 500;
    setPosition({ x, y, z: e.point.z / 100 });
  }

  useFrame(() => {
    camera.lookAt(new Vector3(position.x, position.y, position.z));
  });

  useEffect(() => {
    if (planeGeometry.current && planeGeometry.current.vertices) {
      // Loop over rows of vertices
      for (let i = 0; i < vertices; i++) {
        // Loop over row's vertices
        for (let j = 0; j < vertices; j++) {
          planeGeometry.current.vertices[i * vertices + j].z =
            Math.cos((i - vertices / 2) / (vertices / 2)) * 300 +
            Math.cos((j - vertices / 2) / (vertices / 2)) * 1000;
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
        position={[0, 0, -1000]}
        onPointerMove={handlePointerMove}
        onClick={() => setPaused(!paused)}
      >
        <planeGeometry
          ref={planeGeometry}
          attach="geometry"
          args={[1920, 1080, vertices - 1, vertices - 1]}
        />
        <meshBasicMaterial attach="material" side={DoubleSide} map={texture} />
      </mesh>
      {renderPOI()}
    </>
  );
}
