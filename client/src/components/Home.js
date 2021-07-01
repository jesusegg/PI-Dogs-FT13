import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { findRazaLista } from "../ordenamientos/index";
import BuquedaRazaLista from "./BuquedaRazaLista";
import Ordenamientos from "./Ordenamientos";
import { FcSearch } from "react-icons/fc";
import { FaSortAmountDownAlt } from "react-icons/fa";
import { AiFillFunnelPlot } from "react-icons/ai";
import {
  getRazasPaginado,
  getTemperamentos,
  getDatosCompletos,
  getTemperamentosLista,
  clearTemperamentos,
  getOrdenamientos,
  clearOrdenamientos,
} from "../actions/index";

function Home() {
  const dispatch = useDispatch();
  const [razas, setRazas] = useState({
    ordenamientos: true,
    busqueda: false,
    busquedaTemperamentos: false,
  });
  const [paginado, setPaginado] = useState(1);
  const [ultimo, setUltimo] = useState(false);
  const refInput = useRef(null);
  const refRazaSelect = useRef(null);
  const refRazaTemperamentos = useRef(null);
  const refOrdenamientos = useRef(null);
  const refSelect = useRef(null);

  const datosOrdamientos = useSelector((state) => state.ordenamientos);
  const datos = useSelector((state) => state.datosCompletos);
  const datosPaginado = useSelector((state) => state.datosPaginado);
  const datosTemperamentos = useSelector((state) => state.temperamentos);
  const datosTemperamentoslista = useSelector(
    (state) => state.temperamentosLista
  );

  function setRazasValue(e, value) {
    setRazas({
      ordenamientos: false,
      busqueda: false,
      busquedaTemperamentos: false,

      [e.target.name]: value,
    });
  }
  function paginaSiguiente(data) {
    if (paginado < data.pageCount) {
      setPaginado(paginado + 1);
    }
    if (paginado === data.pageCount - 1) {
      setUltimo(true);
    }
  }
  function paginaAnterior() {
    if (paginado > 1) {
      setPaginado(paginado - 1);
      setUltimo(false);
    }
  }
  const resultadoRazaLista = findRazaLista(
    razas.busqueda === "Creadas por mi" ? datos : datosPaginado?.posts,
    razas.busqueda
  );

  useEffect(() => {
    dispatch(
      getOrdenamientos(
        `${refInput.current.value}`,
        `${paginado}`,
        `${
          refOrdenamientos.current.value === "Name A-Z"
            ? "Asc"
            : refOrdenamientos.current.value === "Name Z-A"
            ? "Des"
            : undefined
        }`,
        `${
          refOrdenamientos.current.value === "Peso Mayor"
            ? "Des"
            : refOrdenamientos.current.value === "Peso Menor"
            ? "Asc"
            : undefined
        }`
      )
    );
    razas.busqueda && dispatch(getDatosCompletos(`${paginado}`));

    dispatch(
      getTemperamentosLista(
        `${refRazaTemperamentos.current.value}`,
        `${paginado}`,
        `${
          refOrdenamientos.current.value === "Name A-Z"
            ? "Asc"
            : refOrdenamientos.current.value === "Name Z-A"
            ? "Des"
            : undefined
        }`,
        `${
          refOrdenamientos.current.value === "Peso Mayor"
            ? "Des"
            : refOrdenamientos.current.value === "Peso Menor"
            ? "Asc"
            : undefined
        }`
      )
    );

    dispatch(getRazasPaginado(`${paginado}`));
    dispatch(getTemperamentos());
    dispatch(getDatosCompletos());
    return () => {
      dispatch(clearTemperamentos());
      dispatch(clearOrdenamientos());
    };
  }, [dispatch, paginado, razas]);

  return (
    <div className="home">
      <div className="home__formulario">
        <div className="home__formulario__input">
          <input
            ref={refInput}
            type="text"
            placeholder="Search dogs by name"
            onChange={(e) => (refInput.current.value = e.target.value)}
          />
          <button
            className="boton-lupa"
            name="ordenamientos"
            onClick={() => {
              refInput.current.value &&
                setRazas({
                  ordenamientos: true,
                  busqueda: false,
                  busquedaTemperamentos: false,
                });
              refRazaTemperamentos.current.value = "DEFAULT";
              refOrdenamientos.current.value = "Name A-Z";
              refRazaSelect.current.value = "DEFAULT";
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
            <option value="Existentes">Breeds by Api</option>
            <option value="Creadas por mi">Created by me</option>
          </select>

          <button
            className="boton boton-home"
            name="busqueda"
            onClick={(e) => {
              refRazaSelect.current.value !== "DEFAULT" &&
                setRazasValue(e, refRazaSelect.current.value);
              setPaginado(1);
              refRazaTemperamentos.current.value = "DEFAULT";
              refOrdenamientos.current.value = "Name A-Z";
              refInput.current.value = "";
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
            onChange={(e) =>
              (refRazaTemperamentos.current.value = e.target.value)
            }
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
                setRazasValue(e, true);
              refInput.current.value = "";
              setPaginado(1);
              refOrdenamientos.current.value = "Name A-Z";
              refRazaSelect.current.value = "DEFAULT";
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
            onChange={() =>
              refInput.current.value
                ? (refSelect.current.name = "ordenamientos")
                : refRazaTemperamentos.current.value !== "DEFAULT"
                ? (refSelect.current.name = "busquedaTemperamentos")
                : (refSelect.current.name = "ordenamientos")
            }
          >
            <option value="DEFAULT" disabled>
              Choose one option
            </option>
            <option value="Name A-Z">Name A-Z</option>
            <option value="Name Z-A">Name Z-A</option>
            <option value="Peso Mayor">Weight &#8657;</option>
            <option value="Peso Menor">Weight &#8659;</option>
          </select>
          <button
            className="boton boton-home"
            ref={refSelect}
            onClick={(e) => {
              refOrdenamientos.current.value !== "DEFAULT" &&
                setRazasValue(e, refOrdenamientos.current.value);
              setPaginado(1);
            }}
          >
            Apply Order
          </button>
        </div>
      </div>
      <div className="home__render">
        {razas.busqueda && <BuquedaRazaLista data={resultadoRazaLista} />}
        {razas.busquedaTemperamentos && (
          <Ordenamientos datos={datosTemperamentoslista} />
        )}
        {razas.ordenamientos && <Ordenamientos datos={datosOrdamientos} />}
      </div>
      <div className=" paginado">
        <span style={{ color: "black", fontWeight: "bold" }}>
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
        {!ultimo && (
          <button
            className="boton boton--paginado"
            onClick={() =>
              paginaSiguiente(
                (razas.busqueda && datosPaginado) ||
                  (razas.busquedaTemperamentos && datosTemperamentoslista) ||
                  (razas.ordenamientos && datosOrdamientos)
              )
            }
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}

export default Home;
