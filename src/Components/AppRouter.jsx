import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import About from "../pages/About";
import Posts from "../pages/Posts";
import PostIdPage from "../pages/PostIdPage";
import { PrivateRoutes, PublicRoutes, routes } from "../router/rutes";
import { AuthContext } from "../context/context";
import Loader from "./UI/loader/Loader";

const AppRouter = () => {
  const {isAuth, isLoading} = useContext(AuthContext);
  console.log(isAuth)

  if (isLoading) {
    return <Loader/>
  }

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
