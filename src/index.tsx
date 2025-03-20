import React from "react";
import { createRoot } from "react-dom/client";

import "index.scss";
import "index.css";
import { App } from "app";

const container = document.getElementById("root");
if (!container) {
  throw new Error("No #root element found in the DOM");
}
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
