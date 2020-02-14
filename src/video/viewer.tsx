import React, { useState, useEffect, useMemo, useRef } from "react";
import { VideoTexture } from "three";
import { Video } from "./video";
import { Canvas } from "react-three-fiber";

// Arbitrary create a list of "poi"
const pointsOfInterest = [
  {
    position: { x: 200, y: -20, z: 200 },
    name: "Refuge du gouter",
    link: "https://refugedugouter.ffcam.fr/FR_home.html"
  },
  {
    position: { x: 0, y: 40, z: 200 },
    name: "Chamonix",
    link: "https://www.chamonix.com/"
  },
  {
    position: { x: -100, y: -20, z: 200 },
    name: "Passy",
    link: "https://www.chamonix.com/"
  }
];

export function Viewer(): JSX.Element {
  // Get video as an html element & create texture
  const video = document.getElementById("video") as HTMLVideoElement;
  video.play();
  const texture = useMemo(() => new VideoTexture(video), [video]);

  // Handle play pause state
  const [paused, setPaused] = useState(false);

  const canvasRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (paused) {
      video.pause();
    } else {
      video.play();
    }
  }, [paused, video]);

  return (
    <div ref={canvasRef}>
      <button onClick={() => setPaused(!paused)}>Pause</button>
      <Canvas
        shadowMap
        pixelRatio={window.devicePixelRatio}
        camera={{ far: 10000 }}
      >
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <Video
          pointsOfInterest={pointsOfInterest}
          texture={texture}
        />
        <axesHelper></axesHelper>
      </Canvas>
    </div>
  );
}
