// solo para exportar reducer y ser usado por store
const initialState = {};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    // Aca va tu codigo;

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

    case "GET_PAGINADO_DES":
      return {
        ...state,
        datosPaginadoDes: payload,
      };
    case "GET_PESO_MAYOR":
      return {
        ...state,
        datosPesoMayor: payload,
      };
    case "GET_PESO_MENOR":
      return {
        ...state,
        datosPesoMenor: payload,
      };

    case "GET_RAZA_PERROS":
      return {
        ...state,
        datosBusquedaRazas: payload,
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

    case "POST_RAZA":
      return {
        ...state,
        razasCreadas: payload,
      };
    //peso asc, peso desc, lista desc, busqueda temp
    // case "REMOVE_MOVIE_FAVORITE":
    //   return {
    //     ...state,
    //     moviesFavourites: state.moviesFavourites.filter(
    //       (movie) => movie.id !== payload.id
    //     ),
    //   };

    default:
      return state;
  }
};

export default reducer;
