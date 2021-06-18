import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRazaDetail } from "../actions/index";
import img from "../img/perro.jpeg";

function BuquedaRazaLista({ data }) {
  const dispatch = useDispatch();
  return (
    <div className="ordenamientos">
      {data?.length ? (
        data?.map((x) => (
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
            </Link>

            <Link
              to={`/Dogs/detalle/${x.id}`}
              onClick={() => dispatch(getRazaDetail(x.id))}
            >
              <p>{x.nombre.toUpperCase()}</p>
            </Link>
            <p>{x.temperamentos}</p>
          </div>
        ))
      ) : (
        <h1>Aun no has creado raza de perro</h1>
      )}
    </div>
  );
}

export default BuquedaRazaLista;
