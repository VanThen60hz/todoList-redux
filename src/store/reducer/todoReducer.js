// todoReducer.js
const initialState = {
  todos: [],
};

export const TODO_TYPES = {
  GET_TODOS: "GET_TODOS",
  CREATE_TODOS: "CREATE_TODOS",
  UPDATE_TODO: "UPDATE_TODO",
  DELETE_TODO: "DELETE_TODO",
  TOGGLE_COMPLETED: "TOGGLE_COMPLETED",
};

const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case TODO_TYPES.GET_TODOS:
      return {
        ...state,
        todos: action.payload,
      };

    case TODO_TYPES.CREATE_TODOS:
      console.log(action);
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };

    case TODO_TYPES.UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, ...action.payload } : todo
        ),
      };

    case TODO_TYPES.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    case TODO_TYPES.TOGGLE_COMPLETED:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: action.payload }
            : todo
        ),
      };

    default:
      return state;
  }
};

export default todoReducer;
