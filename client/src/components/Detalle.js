import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import img from "../img/perro.jpeg";
import { useParams } from "react-router-dom";
import { cleardetalle, getRazaDetail } from "../actions/index";
import Error404 from "./Error404";

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
  console.log(datos);
  return (
    <div className="detalle">
      {datos === null && <Error404 />}
      {typeof datos === "object" && datos?.nombre && (
        <div className="detalle__contenedor">
          <img
            className="detalle__imagen"
            src={datos?.imagen ? datos.imagen : img}
            alt={datos?.nombre}
            width="546"
            height="400"
          />
          <div>
            <div className="detalle__datos">
              <p className="detalle__datos__titulo">
                {datos?.nombre?.toUpperCase()}
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
      )}
      {datos === undefined && <h1>cargando</h1>}
    </div>
  );
}

export default Detalle;
