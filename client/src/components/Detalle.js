import React from "react";
import { useSelector } from "react-redux";
import img from "../perroSvg.svg";

function Detalle() {
  const datos = useSelector((state) => state.detalleRaza);
  return (
    <div>
      {datos ? (
        <div>
          <img src={datos.imagen ? datos.imagen : img} alt={datos?.nombre} />
          <p>{datos?.nombre}</p>
          <p>{datos?.peso} Kg</p>
          <p>{datos?.altura} Cm</p>
          <p>{datos?.años_de_vida}</p>
          <p>{datos?.temperamentos}</p>
        </div>
      ) : (
        <h1>Cargando</h1>
      )}
    </div>
  );
}

export default Detalle;
