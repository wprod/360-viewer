import ReactDOM from "react-dom";
import React from "react";
import "./styles.css";
import { Viewer } from "./video/viewer";

ReactDOM.render(
  <div>
    <h1>Enlaps 220° viewer</h1>
    <Viewer />
  </div>,
  document.getElementById("root")
);
