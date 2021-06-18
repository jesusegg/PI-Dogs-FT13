import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import img from "../img/perro.jpeg";
import { useParams } from "react-router-dom";
import { cleardetalle, getRazaDetail } from "../actions/index";

function Detalle() {
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getRazaDetail(id));
    return () => {
      dispatch(cleardetalle());
    };
  }, [dispatch, id]);

  const datos = useSelector((state) => state.detalleRaza);
  return (
    <div className="detalle">
      {datos ? (
        <div className="detalle__contenedor">
          <img
            className="detalle__imagen"
            src={datos.imagen ? datos.imagen : img}
            alt={datos?.nombre}
            width="546"
            height="400"
          />
          <div>
            <div className="detalle__datos">
              <p className="detalle__datos__titulo">
                {datos?.nombre.toUpperCase()}
              </p>
              <p>Weight: {datos?.peso} Kg</p>
              <p>Height: {datos?.altura} Cm</p>
              <p>Life span: {datos?.años_de_vida}</p>{" "}
            </div>
            <div className="detalle__datos__temperamentos">
              <p style={{ fontWeight: "bold" }}>Temperaments</p>
              <p>{datos?.temperamentos}</p>
            </div>
          </div>
        </div>
      ) : (
        <h1>Cargando</h1>
      )}
    </div>
  );
}

export default Detalle;
