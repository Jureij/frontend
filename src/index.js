import React from "react";
import ReactDOM from "react-dom/client"; // Tumia react-dom/client badala ya react-dom
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")); // Tumia createRoot badala ya render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
