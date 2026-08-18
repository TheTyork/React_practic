import React from "react";
import { Link } from "react-router-dom";

const MyNavbar = () => {
  return (
    <div className="navbar">
      <div className=".navbar__links">
        <Link to="/about">Информация</Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  );
};

export default MyNavbar;
