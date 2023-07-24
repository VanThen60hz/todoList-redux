import React, { useState } from "react";
import { Input, Button } from "antd";

const TodoForm = ({ addTodo }) => {
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleInputChange = (e) => {
    setNewTodoTitle(e.target.value);
  };

  const handleAddTodo = () => {
    if (newTodoTitle.trim() !== "") {
      addTodo(newTodoTitle);
      setNewTodoTitle("");
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Input
        value={newTodoTitle}
        onChange={handleInputChange}
        placeholder="Enter new todo title"
      />

      <Button
        onClick={handleAddTodo}
        type="primary"
        style={{ marginLeft: "10px" }}
      >
        Add Todo
      </Button>
    </div>
  );
};

export default TodoForm;
