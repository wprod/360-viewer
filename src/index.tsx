import ReactDOM from "react-dom";
import React from "react";
import { Canvas } from "react-three-fiber";
import "./styles.css";
import { Video } from "./video/video";

ReactDOM.render(
  <Canvas>
    <ambientLight />
    <pointLight position={[10, 10, 10]} />
    <Video />
  </Canvas>,
  document.getElementById("root")
);
