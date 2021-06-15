import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getRazaDetail } from "../actions/index";
import img from "../perroSvg.svg";

function OrdenDes() {
  const dispatch = useDispatch();

  const datos = useSelector((state) => state.datosPaginadoDes);
  return (
    <div>
      {datos?.posts ? (
        datos?.posts.map((x) => (
          <div key={x.id}>
            <img
              src={x.imagen ? x.imagen : img}
              alt="hol"
              width="500px"
              height="350px"
            />{" "}
            <Link
              to={`/Dogs/detalle`}
              onClick={() => dispatch(getRazaDetail(x.id))}
            >
              <p>{x.nombre}</p>
            </Link>
            <p>{x.temperamentos}</p>
          </div>
        ))
      ) : (
        <h1>Cargando</h1>
      )}
    </div>
  );
}

export default OrdenDes;
