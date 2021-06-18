import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getDatosCompletos, getRazasPaginado } from "../actions/index";

function Landing() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getRazasPaginado());
    dispatch(getDatosCompletos());
  }, [dispatch]);

  return (
    <div className="landing">
      <Link to="/Dogs/home">
        <button className="boton boton--landing">ENTER SITE</button>
      </Link>
    </div>
  );
}

export default Landing;
