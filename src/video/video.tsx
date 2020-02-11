import React, { useState, useEffect, useMemo } from "react";
import { VideoTexture } from "three";
import { Viewer } from "./viewer";

export function Video() {
  // Get video as an html element & create texture
  const video = document.getElementById("video") as HTMLVideoElement;
  video.play();
  const texture = useMemo(() => new VideoTexture(video), [video]);

  // Handle play pause state
  const [paused, setPaused] = useState(false);

  // Arbitrary create a list of "poi"
  const pointsOfInterest = [
    {
      position: { x: 100, y: 10, z: 100 },
      name: "Refuge du gouter",
      link: "https://refugedugouter.ffcam.fr/FR_home.html"
    },
    {
      position: { x: -100, y: 10, z: 100 },
      name: "Chamonix",
      link: "https://www.chamonix.com/"
    },
    {
      position: { x: -250, y: 20, z: 100 },
      name: "Passy",
      link: "https://www.chamonix.com/"
    }
  ];

  useEffect(() => {
    if (paused) {
      video.pause();
    } else {
      video.play();
    }
  }, [paused, video]);

  return (
    <Viewer
      pointsOfInterest={pointsOfInterest}
      texture={texture}
      paused={paused}
      setPaused={setPaused}
    />
  );
}
