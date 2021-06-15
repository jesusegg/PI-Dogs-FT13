import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findRazaLista } from "../ordenamientos/index";
import {
  getRazasPaginado,
  getTemperamentos,
  getRazaPerros,
  getDatosCompletos,
  getTemperamentosLista,
  getPaginadoDes,
  getPesoMayor,
  getPesoMenor,
} from "../actions/index";

import BusquedaInput from "./BusquedaInput";
import PaginaInicial from "./PaginaInicial";
import BuquedaRazaLista from "./BuquedaRazaLista";
import BusquedaTemperamentos from "./BusquedaTemperamentos";
import OrdenDes from "./OrdenDes";
import OrdenPesoMayor from "./OrdenPesoMayor";
import OrdenPesoMenor from "./OrdenPesoMenor";
import Ordenamientos from "./Ordenamientos";

function Home() {
  const [razas, setRazas] = useState({
    ordenAsc: true,
    ordenDes: false,
    busquedaNombre: false,
    busqueda: false,
    busquedaTemperamentos: false,
    pesoMayor: false,
    pesoMenor: false,
  });
  const dispatch = useDispatch();
  const [paginado, setPaginado] = useState(1);

  const datos = useSelector((state) => state.datosCompletos);
  const datosPaginado = useSelector((state) => state.datosPaginado);
  const datosTemperamentos = useSelector((state) => state.temperamentos);
  const datosTemperamentoslista = useSelector(
    (state) => state.temperamentosLista
  );
  const datosBusquedaNombre = useSelector((state) => state.datosBusquedaRazas);
  const datosOrdenDes = useSelector((state) => state.datosPaginadoDes);
  const datosPesoMayor = useSelector((state) => state.datosPesoMayor);
  const datosPesoMenor = useSelector((state) => state.datosPesoMenor);

  const refInput = useRef(null);
  const refRazaSelect = useRef(null);
  const refRazaTemperamentos = useRef(null);
  const refOrdenamientos = useRef(null);
  const refSelect = useRef(null);

  function setRazasValue(e, value) {
    setRazas({
      ordenAsc: false,
      ordenDes: false,
      busqueda: false,
      busquedaTemperamentos: false,
      pesoMayor: false,
      pesoMenor: false,
      busquedaNombre: false,
      [e.target.name]: value,
    });
  }
  function paginaSiguiente(data) {
    if (paginado < data.pageCount) {
      setPaginado(paginado + 1);
    }
  }
  function paginaAnterior() {
    if (paginado > 1) {
      setPaginado(paginado - 1);
    }
  }

  const resultadoRazaLista = findRazaLista(
    razas.busqueda === "Creadas por mi" ? datos : datosPaginado?.posts,
    razas.busqueda
  );

  useEffect(() => {
    razas.busquedaNombre &&
      dispatch(getRazaPerros(razas.busquedaNombre, `${paginado}`));

    razas.busqueda && dispatch(getDatosCompletos(`${paginado}`));

    razas.busquedaTemperamentos &&
      dispatch(
        getTemperamentosLista(`${razas.busquedaTemperamentos}`, `${paginado}`)
      );

    razas.ordenDes && dispatch(getPaginadoDes(`${paginado}`));

    razas.pesoMayor && dispatch(getPesoMayor(`${paginado}`));

    razas.pesoMenor && dispatch(getPesoMenor(`${paginado}`));

    dispatch(getTemperamentos());
    dispatch(getDatosCompletos());
    dispatch(getRazasPaginado(`${paginado}`));
  }, [dispatch, paginado, razas]);

  return (
    <div>
      <input ref={refInput} type="text" />
      <button
        name="busquedaNombre"
        onClick={(e) => {
          setRazasValue(e, refInput.current.value);
          setPaginado(1);
        }}
      >
        buscar
      </button>

      <label>razas</label>
      <select defaultValue={"DEFAULT"} name="razas" ref={refRazaSelect}>
        <option value="DEFAULT" disabled>
          Elige una opción
        </option>
        <option value="Existentes">Existentes</option>
        <option value="Creadas por mi">Creadas por mi</option>
      </select>
      <button
        name="busqueda"
        onClick={(e) => {
          refRazaSelect.current.value !== "Elige una opción" &&
            setRazasValue(e, refRazaSelect.current.value);
          setPaginado(1);
          refRazaTemperamentos.current.value = "DEFAULT";
          refOrdenamientos.current.value = "DEFAULT";
        }}
      >
        boton razas
      </button>
      <label>Tempramentos</label>
      <select
        defaultValue={"DEFAULT"}
        name="temperamentos"
        ref={refRazaTemperamentos}
      >
        <option value="DEFAULT" disabled>
          Elige una opción
        </option>
        {datosTemperamentos?.map((x, i) => (
          <option key={i} value={x}>
            {x}
          </option>
        ))}
      </select>
      <button
        name="busquedaTemperamentos"
        onClick={(e) => {
          refRazaTemperamentos.current.value !== "Elige una opción" &&
            setRazasValue(e, refRazaTemperamentos.current.value);
          setPaginado(1);
          refRazaSelect.current.value = "DEFAULT";
          refOrdenamientos.current.value = "DEFAULT";
        }}
      >
        boton temp
      </button>
      <label>Ordenar por:</label>
      <select
        name="razas"
        ref={refOrdenamientos}
        defaultValue={"DEFAULT"}
        onChange={(e) =>
          e.target.value === "Name A-Z"
            ? (refSelect.current.name = "ordenAsc")
            : e.target.value === "Name Z-A"
            ? (refSelect.current.name = "ordenDes")
            : e.target.value === "Peso Mayor"
            ? (refSelect.current.name = "pesoMayor")
            : e.target.value === "Peso Menor"
            ? (refSelect.current.name = "pesoMenor")
            : (refSelect.current.name = "")
        }
      >
        <option value="DEFAULT" disabled>
          Elige una opción
        </option>
        <option value="Name A-Z">Name A-Z</option>
        <option value="Name Z-A">Name Z-A</option>
        <option value="Peso Mayor">Peso Mayor</option>
        <option value="Peso Menor">Peso Menor</option>
      </select>
      <button
        ref={refSelect}
        onClick={(e) => {
          refOrdenamientos.current.value !== "Elige una opción" &&
            setRazasValue(e, refOrdenamientos.current.value);
          setPaginado(1);
          refRazaSelect.current.value = "DEFAULT";
          refRazaTemperamentos.current.value = "DEFAULT";
        }}
      >
        boton razas
      </button>

      <button onClick={() => paginaAnterior()}>anterior</button>
      <button
        onClick={() =>
          paginaSiguiente(
            (razas.ordenAsc && datosPaginado) ||
              (razas.busqueda && datosPaginado) ||
              (razas.busquedaTemperamentos && datosTemperamentoslista) ||
              (razas.busquedaNombre && datosBusquedaNombre) ||
              (razas.ordenDes && datosOrdenDes) ||
              (razas.pesoMayor && datosPesoMayor) ||
              (razas.pesoMenor && datosPesoMenor)
          )
        }
      >
        siguiente
      </button>

      {/* {razas.ordenAsc && <PaginaInicial />}
      {razas.busquedaNombre && <BusquedaInput />}
      {razas.busqueda && <BuquedaRazaLista data={resultadoRazaLista} />}
      {razas.busquedaTemperamentos && <BusquedaTemperamentos />}
      {razas.ordenDes && <OrdenDes />}
      {razas.pesoMayor && <OrdenPesoMayor />}
      {razas.pesoMenor && <OrdenPesoMenor />} */}
      {razas.busqueda && <BuquedaRazaLista data={resultadoRazaLista} />}
      {razas.ordenAsc && <Ordenamientos datos={datosPaginado} />}
      {razas.busquedaNombre && <Ordenamientos datos={datosBusquedaNombre} />}
      {razas.busquedaTemperamentos && (
        <Ordenamientos datos={datosTemperamentoslista} />
      )}
      {razas.ordenDes && <Ordenamientos datos={datosOrdenDes} />}
      {razas.pesoMayor && <Ordenamientos datos={datosPesoMayor} />}
      {razas.pesoMenor && <Ordenamientos datos={datosPesoMenor} />}
    </div>
  );
}

export default Home;
