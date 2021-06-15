import React from "react";
import { Link } from "react-router-dom";

function Navegacion() {
  return (
    <div>
      <Link to="/Dogs/Home">
        <p>Home</p>
      </Link>
      <Link to="/Dogs/Create">
        <p>Create your Dog</p>
      </Link>
      <Link to="/Dogs/SingIn">
        <p>Sign In</p>
      </Link>
    </div>
  );
}

export default Navegacion;
