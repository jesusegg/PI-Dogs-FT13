import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsTrash } from "react-icons/bs";
import {
  getDatosCompletos,
  getTemperamentos,
  postRaza,
} from "../actions/index";

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
  console.log(refInputTexto.current?.value); //5465651316

  const [temperamentos, setTemperamentos] = useState([]);
  const [formularioValido, setFormularioValido] = useState(false);
  const [error, setError] = useState({
    inputTexto: false,
    pesoGeneral: false,
    alturaGeneral: false,
    temp: false,
    input: false,
  });

  const datosTemperamentos = useSelector((state) => state.temperamentos);
  let datos = useSelector((state) => state.datosCompletos);
  let datosNuevo = datos?.map((x) => x.nombre);
  //console.log(temperamentos); //545465464666

  if (error.temp || formularioValido) {
    setTimeout(() => {
      setFormularioValido(false);
      setError({
        ...error,
        temp: false,
      });
    }, 2000);
  }

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
        if (!temperamentos.includes(` ${refTemperamentos.current?.value}`)) {
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
  const random = Math.random() * 180;
  datosImagen = datosImagen?.slice(random, random + 1);

  function borrar(valor) {
    setTemperamentos(temperamentos.filter((x) => x !== valor));
  }
  function submit(e) {
    e.preventDefault();

    if (
      error.input ||
      error.pesoGeneral ||
      error.temperamentos ||
      error.alturaGeneral ||
      error.temp
    ) {
      setTemperamentos([]);
      setFormularioValido(!formularioValido);
      setError({
        ...error,
        input: true,
      });

      return;
    } else {
      //setFormularioValido(!formularioValido);
      if (
        refInputTexto.current.value &&
        refpesoMin.current.value &&
        refpesoMax.current.value &&
        refAlturaMin.current.value &&
        refAlturaMax.current.value
      ) {
        alert("Dog breed created correctly");
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
  }

  useEffect(() => {
    dispatch(getDatosCompletos());
    dispatch(getTemperamentos());
    // return () => {
    //     cleanup
    // }
  }, [dispatch]);
  return (
    <div className="creacionRaza">
      <div>
        <h1 style={{ color: "black" }}>Create your dog</h1>
        <form className="contenedor__form">
          <div className="contenedor__1">
            <label>Name or breed: </label>
            <input
              ref={refInputTexto}
              type="text"
              onChange={() => validate()}
            />
            {error.inputTexto && (
              <p className="error_input_creacion">
                *This dog already exists. Try again!
              </p>
            )}
          </div>
          <div className="contenedor__2">
            <label>Weight (Kg):</label>
            <input
              className={error.pesoGeneral ? "error_input" : "nada"}
              ref={refpesoMin}
              type="number"
              min="1"
              max="80"
              onClick={() => validate()}
              // onChange={() => validate()}
            />
            <label>Min</label>
            <input
              className={error.pesoGeneral ? "error_input" : "nada"}
              ref={refpesoMax}
              type="number"
              min="2"
              max="80"
              onClick={() => validate()}
              //onChange={() => validate()}
            />
            <label>Max</label>
          </div>
          <div className="contenedor__3">
            <label>Height (Cm):</label>
            <input
              className={error.alturaGeneral ? "error_input" : "nada"}
              ref={refAlturaMin}
              type="number"
              min="20"
              max="85"
              onChange={() => validate()}
            />
            <label>Min</label>
            <input
              className={error.alturaGeneral ? "error_input" : "nada"}
              ref={refAlturaMax}
              type="number"
              min="21"
              max="85"
              onChange={() => validate()}
            />
            <label>Max</label>
          </div>
          <div className="contenedor__4">
            <label>Average life span (years):</label>
            <input
              ref={refAñosDeVida}
              type="number"
              min="5"
              max="20"
              onChange={() => validate()}
            />
          </div>
          <div className="contenedor__5">
            <label>Temperaments:</label>

            <select ref={refTemperamentos} defaultValue={"DEFAULT"}>
              <option value="DEFAULT" disabled>
                Choose an option
              </option>
              {datosTemperamentos?.map((x, i) => (
                <option key={i} value={x}>
                  {x}
                </option>
              ))}
            </select>
            <button
              className="boton boton__add"
              onClick={(e) => {
                e.preventDefault();
                validate();
              }}
            >
              Add
            </button>
            <p className="error_input_creacion texto__temperamentos">
              *Add up to 5 temperaments
            </p>
            {temperamentos?.map((x, i) => (
              <div className="array_temperamentos" key={i}>
                <p>{x}</p>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    borrar(x);
                  }}
                >
                  <BsTrash />
                </button>
              </div>
            ))}
            {
              <p className={!error.temp ? "display_none" : "nada"}>
                You must choose at least one temperament
              </p>
            }
            {formularioValido && (
              <p>Please check again. You must fill the form correctly </p>
            )}
          </div>
          <input
            className="contenedor__submit boton"
            ref={refSubmit}
            value="Create my dog"
            type="submit"
            onClick={(e) => {
              submit(e);
              !temperamentos.length
                ? setError({
                    ...error,
                    temp: true,
                  })
                : setError({
                    ...error,
                    temp: false,
                  });
            }}
          />
        </form>
      </div>
    </div>
  );
}

export default CreacionRaza;
