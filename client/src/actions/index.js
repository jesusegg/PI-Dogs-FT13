//trae todo del backend
export function getDatosCompletos(pagina) {
  return function (dispatch) {
    return fetch("http://localhost:3001/?page=" + pagina)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_DATOS_COMPLETOS", payload: json });
      });
  };
}

//estado de paginado principal a-z
export function getRazasPaginado(page) {
  return function (dispatch) {
    return fetch("http://localhost:3001/dogs/?page=" + page)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_RAZAS_PAGINADO", payload: json });
      });
  };
}

//estado de paginado principal z-a
export function getPaginadoDes(page) {
  return function (dispatch) {
    return fetch("http://localhost:3001/dogs?listado=Des&page=" + page)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_PAGINADO_DES", payload: json });
      });
  };
}

//estado de ordenado Peso Mayor
export function getPesoMayor(page) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/dogs/?page=${page}&peso=Des`) //peso = Asc
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_PESO_MAYOR", payload: json });
      });
  };
}

//estado de ordenado Peso menor
export function getPesoMenor(page) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/dogs/?page=${page}&peso=Asc`) //peso = Des
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_PESO_MENOR", payload: json });
      });
  };
}

//buscar por raza de perros
export function getRazaPerros(raza, pagina) {
  return function (dispatch) {
    return fetch(`http://localhost:3001/dogs/?raza=${raza}&page=${pagina}`)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_RAZA_PERROS", payload: json });
      });
  };
}

//estado de detalle de perro
export function getRazaDetail(id) {
  return function (dispatch) {
    return fetch("http://localhost:3001/dogs/" + id)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_RAZA_DETAIL", payload: json });
      });
  };
}

//estado de temperamentos lista
export function getTemperamentosLista(busqueda, page) {
  return function (dispatch) {
    return fetch(
      `http://localhost:3001/temperament/?busqueda=${busqueda}&page=` + page
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_TEMPERAMENTOS_LISTA", payload: json });
      });
  };
}

//estado de temperamentos
export function getTemperamentos() {
  return function (dispatch) {
    return fetch("http://localhost:3001/temperament")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_TEMPERAMENTOS", payload: json });
      });
  };
}

//estado de crear perro
export function postRaza(data) {
  return function (dispatch) {
    return fetch("http://localhost:3001/dog", {
      method: "POST", // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error("Error:", error))
      .then((json) => {
        dispatch({ type: "POST_RAZA", payload: json });
      });
  };
}
