import React, { Children } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { click } from "@testing-library/user-event/dist/click";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <App/>
);
