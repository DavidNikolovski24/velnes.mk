import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App.tsx";
import "./index.css";

const rootElement = document.getElementById("root");
let root;
if (rootElement) {
  root = createRoot(rootElement);
}

root?.render(
  <StrictMode>
    <App />
  </StrictMode>
);
