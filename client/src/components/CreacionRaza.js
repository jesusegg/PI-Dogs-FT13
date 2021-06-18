import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemperamentos, postRaza } from "../actions/index";

function CreacionRaza() {
  const dispatch = useDispatch();
  const refInputTexto = useRef(null);
  const refpesoMin = useRef(null);
  const refpesoMax = useRef(null);
  const refAlturaMin = useRef(null);
  const refAlturaMax = useRef(null);
  const refAñosDeVida = useRef(null);
  const refTemperamentos = useRef(null);
  const refSubmit = useRef(null);

  const [temperamentos, setTemperamentos] = useState([]);
  const [error, setError] = useState({
    inputTexto: false,
    pesoGeneral: false,
    alturaGeneral: false,
    input: false,
  });

  const datosTemperamentos = useSelector((state) => state.temperamentos);
  let datos = useSelector((state) => state.datosCompletos);
  let datosNuevo = datos?.map((x) => x.nombre);

  function validate() {
    if (refInputTexto.current.value) {
      const busqueda = datosNuevo?.find(
        (x) => x === refInputTexto.current.value
      );
      if (busqueda) {
        setError({
          ...error,
          inputTexto: true,
        });
      } else {
        setError({
          ...error,
          inputTexto: false,
        });
      }
    }
    if (refpesoMin.current.value && refpesoMax.current.value) {
      if (refpesoMin.current.value > refpesoMax.current.value) {
        setError({
          ...error,
          pesoGeneral: true,
        });
      } else {
        setError({
          ...error,
          pesoGeneral: false,
        });
      }
    }
    if (refAlturaMin.current.value) {
      if (refAlturaMin.current.value < 20 || refAlturaMin.current.value > 85) {
        setError({
          ...error,
          alturaMin: true,
        });
      } else {
        setError({
          ...error,
          alturaMin: false,
        });
      }
    }
    if (refAlturaMin.current.value && refAlturaMax.current.value) {
      if (refAlturaMin.current.value > refAlturaMax.current.value) {
        setError({
          ...error,
          alturaGeneral: true,
        });
      } else {
        setError({
          ...error,
          alturaGeneral: false,
        });
      }
    }
    if (refTemperamentos.current.value !== "DEFAULT") {
      if (temperamentos.length > 4) {
        return;
      } else {
        if (!temperamentos.includes(refTemperamentos.current.value)) {
          setTemperamentos([
            ...temperamentos,
            ` ${refTemperamentos.current.value}`,
          ]);
          refTemperamentos.current.value = "DEFAULT";
        }
      }
    }
  }
  let datosImagen = datos?.map((x) => x.imagen);
  const random = Math.random() * 260;
  datosImagen = datosImagen?.slice(random, random + 1);

  function borrar(valor) {
    setTemperamentos(temperamentos.filter((x) => x !== valor));
  }
  function submit(e) {
    e.preventDefault();
    if (error.pesoGeneral || error.temperamentos || error.alturaGeneral) {
      setError({
        ...error,
        input: true,
      });
      return;
    } else {
      setError({
        ...error,
        input: false,
      });
      dispatch(
        postRaza({
          nombre: refInputTexto.current.value,
          peso: `${refpesoMin.current.value} - ${refpesoMax.current.value}`,
          altura: `${refAlturaMin.current.value} - ${refAlturaMax.current.value}`,
          años_de_vida: `${refAñosDeVida.current.value} years`,
          imagen: datosImagen && datosImagen[0],
          temperamentos: temperamentos,
        })
      );
      [
        refpesoMax.current.value,
        refpesoMin.current.value,
        refAlturaMin.current.value,
        refAlturaMax.current.value,
        refAñosDeVida.current.value,
      ] = "";
      refInputTexto.current.value = "";
      setTemperamentos([]);
    }
  }

  useEffect(() => {
    dispatch(getTemperamentos());
    // return () => {
    //     cleanup
    // }
  }, [dispatch]);
  return (
    <div>
      <form>
        <label>Nombre de la raza</label>
        <input ref={refInputTexto} type="text" onChange={() => validate()} />
        {error.inputTexto && <p>raza ya existe en la base de datos</p>}
        <label>Peso(Kg):</label>
        <input
          ref={refpesoMin}
          type="number"
          min="1"
          max="80"
          onChange={() => validate()}
        />
        <label>Min</label>
        <input
          ref={refpesoMax}
          type="number"
          min="2"
          max="80"
          onChange={() => validate()}
        />
        <label>Max</label>
        <label>Altura(Cm):</label>
        <input
          ref={refAlturaMin}
          type="number"
          min="20"
          max="85"
          onChange={() => validate()}
        />
        <label>Min</label>
        <input
          ref={refAlturaMax}
          type="number"
          min="21"
          max="85"
          onChange={() => validate()}
        />
        <label>Max</label>
        <label>Esperanza de vida promedio(Años)</label>
        <input
          ref={refAñosDeVida}
          type="number"
          min="5"
          max="20"
          onChange={() => validate()}
        />
        <label>Temperamentos</label>

        <select ref={refTemperamentos} defaultValue={"DEFAULT"}>
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
          onClick={(e) => {
            e.preventDefault();
            validate();
          }}
        >
          Add
        </button>
        <input ref={refSubmit} type="submit" onClick={(e) => submit(e)} />
      </form>
      {temperamentos?.map((x, i) => (
        <div key={i}>
          <p>{x}</p>
          <button onClick={() => borrar(x)}>x</button>
        </div>
      ))}
      {error.input && <p>Completar todos los campos correctamente</p>}
    </div>
  );
}

export default CreacionRaza;