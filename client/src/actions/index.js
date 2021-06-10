let todoId = 1;

export const addTodo = (payload) => {
  return {
    type: "AddTodo", // preba hw
    payload: {
      ...payload,
      status: "Todo",
      id: todoId++,
    },
  };
};

//estado de paginado
export function getRazasPaginado(page) {
  return function (dispatch) {
    return fetch("http://localhost:3001/dogs/?page=" + page)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_RAZAS_PAGINADO", payload: json });
      });
  };
}

//estado de grear perro
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

export function getRazaDetail(id) {
  return function (dispatch) {
    return fetch("http://http://localhost:3001/dogs/" + id)
      .then((response) => response.json())
      .then((json) => {
        dispatch({ type: "GET_RAZA_DETAIL", payload: json });
      });
  };
}

// export function getMovies(titulo) {
//   return function (dispatch) {
//     return fetch("http://www.omdbapi.com/?apikey=20dac387&s=" + titulo)
//       .then((response) => response.json())
//       .then((json) => {
//         dispatch({ type: "GET_MOVIES", payload: json });
//       });
//   };
// }
