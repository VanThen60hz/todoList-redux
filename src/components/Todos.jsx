import React, { useState, useEffect } from "react";
import { Table, Checkbox, Space, Modal, Input, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  getTodos,
  updateTodo,
  addTodo,
  deleteTodo,
} from "../store/action/todoAction";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);

  const [editingTodo, setEditingTodo] = useState(null);
  const [deletingTodo, setDeletingTodo] = useState(null);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  useEffect(() => {
    dispatch(getTodos());
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Completed",
      dataIndex: "completed",
      key: "completed",
      render: (completed, record) => (
        <Checkbox
          checked={completed}
          onChange={() => handleToggleCompleted(record.id, completed)}
        />
      ),
    },
    {
      title: "Actions",
      dataIndex: "id",
      key: "actions",
      render: (id, record) => (
        <Space>
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleAddTodo = (title) => {
    const newTodo = {
      title: title,
      completed: false,
    };

    // Dispatch the addTodo action to add the new todo to the Redux store and API
    dispatch(addTodo(newTodo));
  };

  const handleToggleCompleted = (id, completed) => {
    const updatedTodo = { completed: !completed };

    dispatch(updateTodo(id, updatedTodo));
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setNewTodoTitle(todo.title);
    setIsModalVisible(true);
  };

  const handleSaveTodo = () => {
    if (newTodoTitle.trim() !== "") {
      const updatedTodo = {
        ...editingTodo,
        title: newTodoTitle,
      };

      dispatch(updateTodo(updatedTodo.id, updatedTodo));

      setEditingTodo(null);
      setNewTodoTitle("");
      setIsModalVisible(false);
    }
  };

  const handleDelete = (id) => {
    setDeletingTodo(id);
    setIsDeleteModalVisible(true);
  };

  const handleConfirmDelete = () => {
    dispatch(deleteTodo(deletingTodo));
    setDeletingTodo(null);
    setIsDeleteModalVisible(false);
  };

  const handleCancelEdit = () => {
    setEditingTodo(null);
    setNewTodoTitle("");
    setIsModalVisible(false);
  };

  const handleCancelDelete = () => {
    setDeletingTodo(null);
    setIsDeleteModalVisible(false);
  };

  return (
    <>
      <h1>Todo List</h1>
      <TodoForm addTodo={handleAddTodo} />
      <Table dataSource={todos} columns={columns} rowKey="id" />
      <Modal
        title="Edit Todo"
        open={isModalVisible}
        onOk={handleSaveTodo}
        onCancel={handleCancelEdit}
      >
        <Input
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          placeholder="Enter new todo title"
        />
      </Modal>
      <Modal
        title="Confirm Delete"
        open={isDeleteModalVisible}
        onOk={handleConfirmDelete}
        onCancel={handleCancelDelete}
        okText="Delete"
        okButtonProps={{ danger: true }}
      >
        <p>Are you sure you want to delete this todo?</p>
      </Modal>
    </>
  );
};

export default TodoList;
