import React, { useState, useEffect } from "react";
import { VideoTexture } from "three";
import { Viewer } from "./viewer";

export function Video() {
  // Get video an html element
  const video = document.getElementById("video") as HTMLVideoElement;
  video.play();
  // Create a video texture
  const texture = new VideoTexture(video);

  // Handle play pause state
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) {
      video.pause();
    } else {
      video.play();
    }
  }, [paused, video]);

  return <Viewer texture={texture} paused={paused} setPaused={setPaused} />;
}
