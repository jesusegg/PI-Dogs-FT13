//function validate() {

export const validateInputText = function (
  refInputTexto,
  datosNuevo,
  setError,
  error
) {
  if (refInputTexto.current.value) {
    const busqueda = datosNuevo?.find((x) => x === refInputTexto.current.value);
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
};
export const validateInputPeso = function (
  refpesoMin,
  refpesoMax,
  setError,
  error
) {
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
};

export const validateInputAltura = function (
  refAlturaMin,
  refAlturaMax,
  setError,
  error
) {
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
};
export const validateInputTemperamentos = function (
  refTemperamentos,
  temperamentos,
  setTemperamentos
) {
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
};
