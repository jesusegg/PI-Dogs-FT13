import React from "react";
import { Link } from "react-router-dom";

function Landing() {
  return (
    <div>
      <Link to="/home">
        <button>entrar</button>
      </Link>
    </div>
  );
}

export default Landing;
