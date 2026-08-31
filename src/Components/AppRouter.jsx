import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import { PrivateRoutes, PublicRoutes, routes } from "../router/rutes";
import { AuthContext } from "../context/context";

const AppRouter = () => {
  const {isAuth} = useContext(AuthContext);
  console.log(isAuth)
  return isAuth ? (
    <Routes>
      {PrivateRoutes.map((route) => (
        <Route path={route.path} element={<route.component />} />
      ))}

      <Route path="*" element={<Navigate to="/posts" />} />
    </Routes>
  ) : (
    <Routes>
      {PublicRoutes.map((route) => (
        <Route path={route.path} element={<route.component />} />
      ))}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRouter;
