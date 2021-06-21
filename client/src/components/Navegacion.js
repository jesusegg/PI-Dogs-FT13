import React from "react";
import { Link } from "react-router-dom";
import logo from "../img/logo perros.png";

function Navegacion() {
  return (
    <div className="navegacion">
      <Link to="/Dogs/Home">
        <img src={logo} alt="" width="230" height="90" />
      </Link>

      <div className="navegacion__enlaces">
        <Link to="/Dogs/Home">
          <p>Home</p>
        </Link>
        <Link to="/Dogs/Create">
          <p>Create your Dog</p>
        </Link>
      </div>
    </div>
  );
}

export default Navegacion;
