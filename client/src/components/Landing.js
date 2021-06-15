import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getDatosCompletos,
  getRazasPaginado,
  getRazaPerros,
  getRazaDetail,
  postRaza,
} from "../actions/index";

function Landing() {
  const dispatch = useDispatch();
  //const datos = useSelector((state) => state.datosCompletos);
  // const datos2 = useSelector((state) => state.datosPaginado);
  // const datos3 = useSelector((state) => state.datosBusquedaRazas);
  // const datos4 = useSelector((state) => state.detalleRaza);
  // const datos5 = useSelector((state) => state.razasCreadas);

  useEffect(() => {
    dispatch(getDatosCompletos());
    dispatch(getRazasPaginado("2"));
    // dispatch(getRazaPerros("bu"));
    // dispatch(getRazaDetail("5"));
    // dispatch(
    //   postRaza({
    //     nombre: "orito",
    //     altura: "20-50",
    //     peso: "15-25",
    //     años_de_vida: "500-600 years",
    //     temperamentos: ["loquito", "mordelon", "boristico", "Fast"],
    // })
    // );
    // return () => {
    //   cleanup
    // }
  }, [dispatch]);

  // console.log(datos);
  // console.log(datos4);
  return (
    <div>
      <Link to="/Dogs/home">
        <button>entrar</button>
      </Link>
    </div>
  );
}

export default Landing;
