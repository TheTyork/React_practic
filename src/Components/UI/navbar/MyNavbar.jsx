import React, { useContext } from "react";
import { Link } from "react-router-dom";
import MyButton from "../btn/MyButton";
import { AuthContext } from "../../../context/context.js";

const MyNavbar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  return (
    <div className="navbar">
      {isAuth ? <MyButton onClick = {() => setIsAuth(false)} >Выйти</MyButton> : <div></div>} 
      <div className=".navbar__links">
        <Link to="/about">Информация</Link>
        <Link to="/posts">Посты</Link>
      </div>
    </div>
  );
};

export default MyNavbar;
