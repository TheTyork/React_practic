import React, { useEffect, useState } from "react";
import "./styles/style.css";
import { BrowserRouter, Link, Route, Routes, Navigate } from "react-router-dom";
import MyNavbar from "./Components/UI/navbar/MyNavbar";
import AppRouter from "./Components/AppRouter";
import { AuthContext } from "./context/context";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading
      }}
    >
      <BrowserRouter>
        <MyNavbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
