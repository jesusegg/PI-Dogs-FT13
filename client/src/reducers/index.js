// solo para exportar reducer y ser usado por store
const initialState = [];

const todos = (state = initialState, { type, payload }) => {
  switch (type) {
    // Aca va tu codigo;
    case "AddTodo":
      return [...state, payload];

    default:
      return state;
  }
};

export default todos;
