export const validate = function (
  error,
  setError,
  refInputTexto,
  datos,
  refpesoMax,
  refpesoMin,
  refAlturaMax,
  refAlturaMin,
  refAñosDeVida
) {
  if (refInputTexto.current.value) {
    const busqueda = datos.find((x) => x === refInputTexto.current.value);
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
  if (refpesoMin.current.value) {
    if (refpesoMin.current.value > 80) {
      setError({
        ...error,
        pesoMin: true,
      });
    } else {
      setError({
        ...error,
        pesoMin: false,
      });
    }
  }
  if (refpesoMax.current.value) {
    if (refpesoMax.current.value > 80) {
      setError({
        ...error,
        pesoMax: true,
      });
    } else {
      setError({
        ...error,
        pesoMax: false,
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
  if (refAlturaMax.current.value) {
    if (refAlturaMax.current.value < 21 || refAlturaMax.current.value > 85) {
      setError({
        ...error,
        alturaMax: true,
      });
    } else {
      setError({
        ...error,
        alturaMax: false,
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
  if (refAñosDeVida.current.value) {
    if (refAñosDeVida.current.value < 5 || refAñosDeVida.current.value > 20) {
      setError({
        ...error,
        añosDeVida: true,
      });
    } else {
      setError({
        ...error,
        añosDeVida: false,
      });
    }
  }
};
