import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";

import App from "./App.jsx";
import "./index.css";
import { cognitoConfig } from "./authConfig";

Amplify.configure(cognitoConfig);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);