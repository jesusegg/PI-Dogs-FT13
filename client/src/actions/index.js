//trae todo del backend
export function getDatosCompletos(pagina) {
  return function (dispatch) {
    return fetch("http://localhost:3001/?page=" + pagina)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_DATOS_COMPLETOS", payload: json }); //no
      });
  };
}

//estado de paginado principal a-z
export function getRazasPaginado(page) {
  return function (dispatch) {
    return fetch("http://localhost:3001/dogs/?page=" + page) //no
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_RAZAS_PAGINADO", payload: json });
      });
  };
}

//estado de detalle de perro
export function getRazaDetail(id) {
  return function (dispatch) {
    return fetch("http://localhost:3001/dogs/" + id) //no
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_RAZA_DETAIL", payload: json });
      });
  };
}
export function cleardetalle() {
  return {
    type: "GET_RAZA_DETAIL",
    payload: undefined,
  };
}

//estado de temperamentos lista
export function getTemperamentosLista(busqueda, page, sort, peso) {
  //no
  //nuevo ordenamiento
  return function (dispatch) {
    return fetch(
      `http://localhost:3001/temperament/?busqueda=${busqueda}&page=${page}&peso=${peso}&listado=${sort}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_TEMPERAMENTOS_LISTA", payload: json });
      });
  };
}

export function clearTemperamentos() {
  return {
    type: "GET_TEMPERAMENTOS_LISTA",
    payload: undefined,
  };
}

//estado de temperamentos
export function getTemperamentos() {
  //no
  return function (dispatch) {
    return fetch("http://localhost:3001/temperament")
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_TEMPERAMENTOS", payload: json });
      });
  };
}

export function getOrdenamientos(raza, page, listado, peso) {
  //no
  console.log(raza, "redux");
  return function (dispatch) {
    return fetch(
      `http://localhost:3001/dogs/?page=${page}&${
        raza !== undefined ? `raza=${raza}` : "nada"
      }&listado=${listado}&peso=${peso}`
    )
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_ORDENAMIENTOS", payload: json });
      });
  };
}
export function clearOrdenamientos() {
  return {
    type: "GET_ORDENAMIENTOS",
    payload: undefined,
  };
}

//estado de crear perro
export function postRaza(data) {
  //no
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
//http://localhost:3001/dogs/?page=1&raza=bull&listado=Des&peso=Asc

// const nextPage = () => {
//   if (videogames.length < currentPage + 15) {
//       setCurrentPage(currentPage)
//   } else {
//       setCurrentPage(currentPage + 15)
//   }
// }

// const prevPage = () => {
//   if (currentPage < 14) {
//       setCurrentPage(0)
//   } else {
//       setCurrentPage(currentPage - 15)
//   }
// }

// const filteredGames = () => {
//   return videogames.slice(currentPage, currentPage + 15)
// }
// {videogames ? filteredGames().map((e) => {
//           return (
//                   <NavLink to={`/videogames/${e.id}`} key={e.id}>
//                       <Card
//                           name={e.name}
//                           image={e.image}
//                           genre={e.genre}
//                           key={e.id} />
//                   </NavLink>
//                   )
//               })
