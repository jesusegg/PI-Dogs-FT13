import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findRazaLista } from "../ordenamientos/index";
import BuquedaRazaLista from "./BuquedaRazaLista";
import Ordenamientos from "./Ordenamientos";
import { FcSearch } from "react-icons/fc";
import { FaSortAmountDownAlt, FaSearch } from "react-icons/fa";
import {
  AiOutlineControl,
  AiTwotoneFunnelPlot,
  AiFillFunnelPlot,
} from "react-icons/ai";
import {
  getRazasPaginado,
  getTemperamentos,
  getRazaPerros,
  getDatosCompletos,
  getTemperamentosLista,
  getPaginadoDes,
  getPesoMayor,
  getPesoMenor,
  clearTemperamentos,
} from "../actions/index";

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
  // const [paginaFinal, setPaginaFinal] = useState(false);
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
  // console.log(paginaFinal); //4564654654654654646546546546546546464646546
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
    dispatch(getRazasPaginado(`${paginado}`));
    dispatch(getTemperamentos());
    dispatch(getDatosCompletos());
    return () => {
      dispatch(clearTemperamentos());
    };
  }, [dispatch, paginado, razas]);

  return (
    <div className="home">
      <div className="home__formulario">
        <div className="home__formulario__input">
          <input ref={refInput} type="text" placeholder="Search dogs by name" />

          <button
            className="boton-lupa"
            name="busquedaNombre"
            onClick={() => {
              refInput.current.value &&
                setRazas({
                  ordenAsc: false,
                  ordenDes: false,
                  busqueda: false,
                  busquedaTemperamentos: false,
                  pesoMayor: false,
                  pesoMenor: false,
                  busquedaNombre: refInput.current.value,
                });
              setPaginado(1);
            }}
          >
            <FcSearch name="busquedaNombre" />
          </button>
        </div>
        <div style={{ marginBottom: "2rem" }}>
          <AiFillFunnelPlot style={{ color: "white" }} /> <span>FILTER BY</span>
        </div>
        <div className="home__formulario__ordenamientos">
          <label>Type of breeds</label>
          <select defaultValue={"DEFAULT"} name="razas" ref={refRazaSelect}>
            <option value="DEFAULT" disabled>
              Choose one option
            </option>
            <option value="Existentes">Existentes</option>
            <option value="Creadas por mi">Creadas por mi</option>
          </select>

          <button
            className="boton boton-home"
            name="busqueda"
            onClick={(e) => {
              refRazaSelect.current.value !== "DEFAULT" &&
                setRazasValue(e, refRazaSelect.current.value);
              setPaginado(1);
              refRazaTemperamentos.current.value = "DEFAULT";
              refOrdenamientos.current.value = "DEFAULT";
            }}
          >
            Apply Filter
          </button>
        </div>

        <div className="home__formulario__ordenamientos">
          <label>Temperaments</label>
          <select
            defaultValue={"DEFAULT"}
            name="temperamentos"
            ref={refRazaTemperamentos}
          >
            <option value="DEFAULT" disabled>
              Choose one option
            </option>
            {datosTemperamentos?.map((x, i) => (
              <option key={i} value={x}>
                {x}
              </option>
            ))}
          </select>
          <button
            className="boton boton-home"
            name="busquedaTemperamentos"
            onClick={(e) => {
              refRazaTemperamentos.current.value !== "DEFAULT" &&
                setRazasValue(e, refRazaTemperamentos.current.value);
              setPaginado(1);
              refRazaSelect.current.value = "DEFAULT";
              refOrdenamientos.current.value = "DEFAULT";
            }}
          >
            Apply Filter
          </button>
        </div>
        <div style={{ marginTop: "5rem" }}>
          <FaSortAmountDownAlt style={{ color: "white" }} />
          <span> ORDER BY</span>
        </div>
        <div className="home__formulario__ordenamientos">
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
              Choose one option
            </option>
            <option value="Name A-Z">Name A-Z</option>
            <option value="Name Z-A">Name Z-A</option>
            <option value="Peso Mayor">Peso Mayor</option>
            <option value="Peso Menor">Peso Menor</option>
          </select>
          <button
            className="boton boton-home"
            ref={refSelect}
            onClick={(e) => {
              refOrdenamientos.current.value !== "DEFAULT" &&
                setRazasValue(e, refOrdenamientos.current.value);
              setPaginado(1);
              refRazaSelect.current.value = "DEFAULT";
              refRazaTemperamentos.current.value = "DEFAULT";
            }}
          >
            Apply Order
          </button>
        </div>
      </div>
      <div className="home__render">
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
      <div className=" paginado">
        <span style={{ color: "black", fontWeight: "bold" }}>
          {" "}
          {`PAGE ${paginado}`}
        </span>
        {paginado !== 1 && (
          <button
            className="boton boton--paginado"
            onClick={() => paginaAnterior()}
          >
            Previous
          </button>
        )}

        <button
          className="boton boton--paginado"
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
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
