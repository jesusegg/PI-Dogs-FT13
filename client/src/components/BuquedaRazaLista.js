import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getRazaDetail, deleteRaza, getDatosCompletos } from "../actions/index";
import img from "../img/perro.jpeg";
import { BsTrash } from "react-icons/bs";

function BuquedaRazaLista({ data }) {
  const dispatch = useDispatch();

  const eliminarRaza = function (id, nombre) {
    dispatch(deleteRaza({ id, nombre }));

    data = data.filter((x) => x.id !== id);
  };
  React.useEffect(() => {
    dispatch(getDatosCompletos());
  }, [data, dispatch]);

  return (
    <div>
      <div className="ordenamientos">
        {data?.length
          ? data?.map((x) => (
              <div className="ordenamientos__tarjeta" key={x.id}>
                <Link
                  to={`/Dogs/detail/${x.id}`}
                  onClick={() => dispatch(getRazaDetail(x.id))}
                >
                  <img
                    src={x.imagen ? x.imagen : img}
                    alt="imagen"
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
                {x.id.length > 4 && (
                  <button
                    className="boton__borrado"
                    onClick={() => eliminarRaza(x.id, x.nombre, data)}
                  >
                    <BsTrash />
                  </button>
                )}
              </div>
            ))
          : false}
      </div>
      {!data?.length && (
        <div className="loading">
          <h1>You haven't created a breed yet</h1>
        </div>
      )}
    </div>
  );
}

export default BuquedaRazaLista;
