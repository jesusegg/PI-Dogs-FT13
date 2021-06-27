// solo para exportar reducer y ser usado por store
const initialState = {};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case "GET_DATOS_COMPLETOS":
      return {
        ...state,
        datosCompletos: payload,
      };

    case "GET_RAZAS_PAGINADO":
      return {
        ...state,
        datosPaginado: payload,
      };

    case "GET_RAZA_DETAIL":
      return {
        ...state,
        detalleRaza: payload,
      };

    case "GET_TEMPERAMENTOS":
      return {
        ...state,
        temperamentos: payload.filter((x) => x.length > 0),
      };

    case "GET_TEMPERAMENTOS_LISTA":
      return {
        ...state,
        temperamentosLista: payload,
      };
    case "GET_ORDENAMIENTOS":
      return {
        ...state,
        ordenamientos: payload,
      };

    case "POST_RAZA":
      return {
        ...state,
        razasCreadas: payload,
      };

    default:
      return state;
  }
};

export default reducer;
