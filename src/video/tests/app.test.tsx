import { render } from "@testing-library/react";
import React from "react";
import { Viewer } from "../viewer";

it("renders without crashing", (): void => {
  render(<Viewer />);
});
