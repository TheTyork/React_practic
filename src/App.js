import React from "react";
import "./styles/style.css";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import MyNavbar from "./Components/UI/navbar/MyNavbar";
import AppRouter from "./Components/AppRouter";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
