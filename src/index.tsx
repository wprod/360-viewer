import ReactDOM from "react-dom";
import React from "react";
import { Canvas } from "react-three-fiber";
import "./styles.css";
import { Video } from "./video/video";

ReactDOM.render(
  <div>
    <h1>Enlaps 220° viewer</h1>
    <Canvas camera={{ position: [0, 0, -1], far: 400 }}>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Video />s
    </Canvas>
  </div>,
  document.getElementById("root")
);
