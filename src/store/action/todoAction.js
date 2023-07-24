import axios from "axios";
import { TODO_TYPES } from "../reducer/todoReducer";

export const getTodos = () => async (dispatch) => {
  try {
    const res = await axios.get(
      "https://64bdea0c2320b36433c7e526.mockapi.io/todos"
    );

    dispatch({
      type: TODO_TYPES.GET_TODOS,
      payload: res.data,
    });
  } catch (error) {
    console.log("Error fetching todos:", error);
  }
};

export const updateTodo = (id, updatedTodo) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://64bdea0c2320b36433c7e526.mockapi.io/todos/${id}`,
      updatedTodo
    );

    const updatedTodoData = res.data;

    dispatch({
      type: TODO_TYPES.UPDATE_TODO,
      payload: updatedTodoData,
    });
  } catch (error) {
    console.error("Error updating todo:", error);
  }
};

export const addTodo = (newTodo) => async (dispatch) => {
  try {
    const res = await axios.post(
      "https://64bdea0c2320b36433c7e526.mockapi.io/todos",
      newTodo
    );
    const addedTodoData = res.data;

    dispatch({
      type: TODO_TYPES.CREATE_TODOS,
      payload: addedTodoData,
    });
  } catch (error) {
    console.error("Error adding todo:", error);
  }
};

export const deleteTodo = (id) => async (dispatch) => {
  console.log(`todo id - ${id}`);
  try {
    await axios.delete(
      `https://64bdea0c2320b36433c7e526.mockapi.io/todos/${id}`
    );

    dispatch({
      type: TODO_TYPES.DELETE_TODO,
      payload: id,
    });
  } catch (error) {
    console.error("Error deleting todo:", error);
  }
};

export const toggleCompleted = (id, completed) => async (dispatch) => {
  try {
    const res = await axios.put(
      `https://64bdea0c2320b36433c7e526.mockapi.io/todos/${id}`,
      { completed: !completed }
    );
    const updatedTodoData = res.data;

    dispatch({
      type: TODO_TYPES.TOGGLE_COMPLETED,
      payload: {
        id,
        completed: updatedTodoData.completed,
      },
    });
  } catch (error) {
    console.error("Error toggling todo completed status:", error);
  }
};
