import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

export { default as Home } from "./home";
export { default as Routine } from "./routines";
export { default as Login } from "./login";
export { default as Activities } from "./activities";
export { default as Register } from "./register";
export { default as Profile } from "./profile";
export { default as addRoutines } from "./myRoutines";
export { default as EditRoutine } from "./EditRoutines";
export { default as Logout } from "./logout";
export { default as MyRoutines } from "./myRoutines";
export { default as NavBar } from "./NavBar";
export {};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
