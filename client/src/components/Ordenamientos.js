import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRazaDetail } from "../actions/index";
import img from "../img/perro.jpeg";
import Error404 from "./Error404";
import spin from "../img/1544764567.svg";

function Ordenamientos({ datos }) {
  const dispatch = useDispatch();

  return (
    <div>
      {datos === null && <Error404 />}
      <div className="ordenamientos">
        {datos?.posts &&
          datos.posts?.map((x) => (
            <div className="ordenamientos__tarjeta" key={x.id}>
              <Link
                to={`/Dogs/detalle/${x.id}`}
                onClick={() => dispatch(getRazaDetail(x.id))}
              >
                <img
                  src={x.imagen ? x.imagen : img}
                  alt="hol"
                  width="360px"
                  height="250px"
                />
              </Link>{" "}
              <Link
                to={`/Dogs/detalle/${x.id}`}
                onClick={() => dispatch(getRazaDetail(x.id))}
              >
                <p>{x.nombre.toUpperCase()}</p>
              </Link>
              {x.peso.includes("-") && <p>{x.peso} Kg</p>}
              <p>{x.temperamentos}</p>
            </div>
          ))}
      </div>
      {datos === undefined && (
        <div className="loading">
          <h1>Loading ....</h1> <img className="spin" src={spin} alt="1" />
        </div>
      )}
    </div>
  );
}

export default Ordenamientos;
