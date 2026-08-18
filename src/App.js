import React from "react";
import "./styles/style.css";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import About from "./pages/About";
import Posts from "./pages/Posts";
import MyNavbar from "./Components/UI/navbar/MyNavbar";

function App() {
  return (
    <BrowserRouter>
      <MyNavbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="*" element={<Navigate to="/posts" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
