import React from "react";
//import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
//import { getOrdenamientos } from "../actions";
import logo from "../img/logo perros.png";

function Navegacion() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getOrdenamientos("", "", "Asc"));
  // }, [dispatch]);
  return (
    <div className="navegacion">
      <Link
        //  onClick={() => dispatch(getOrdenamientos("", "", "Asc"))}
        to="/Dogs/Home"
      >
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
