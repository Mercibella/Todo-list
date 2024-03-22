import React, { useState } from 'react';
import './App.css'; // Import CSS file for styling

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editValue, setEditValue] = useState('');
  const [editId, setEditId] = useState(null);

  const addTodo = () => {
    if (!inputValue.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const editTodo = (id) => {
    const todoToEdit = todos.find(todo => todo.id === id);
    setEditValue(todoToEdit.text);
    setEditId(id);
  };

  const updateTodo = () => {
    if (!editValue.trim()) return;

    const updatedTodos = todos.map(todo => {
      if (todo.id === editId) {
        return {
          ...todo,
          text: editValue
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
    setEditValue('');
    setEditId(null);
  };

  const toggleTodoCompletion = (id) => {
    const updatedTodos = todos.map(todo => {
      if (todo.id === id) {
        return {
          ...todo,
          completed: !todo.completed
        };
      }
      return todo;
    });

    setTodos(updatedTodos);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="todo-container">
      <h1 className="todo-header">Todo List</h1>
      <div className="todo-input-container">
        <input 
          type="text" 
          value={inputValue} 
          onChange={(e) => setInputValue(e.target.value)} 
          placeholder="Add a new todo" 
          className="todo-input" 
        />
        <button onClick={addTodo} className="add-button">Add Todo</button>
      </div>
      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={`todo-item ${todo.completed ? 'completed' : ''}`}>
            <span 
              onClick={() => toggleTodoCompletion(todo.id)}
              className="todo-text"
            >
              {todo.text}
            </span>
            <div className="todo-buttons">
              <button onClick={() => editTodo(todo.id)} className="edit-button">Edit</button>
              <button onClick={() => removeTodo(todo.id)} className="remove-button">Remove</button>
            </div>
          </li>
        ))}
      </ul>
      {editId !== null && (
        <div className="edit-container">
          <input 
            type="text" 
            value={editValue} 
            onChange={(e) => setEditValue(e.target.value)} 
            className="edit-input" 
          />
          <button onClick={updateTodo} className="update-button">Update</button>
        </div>
      )}
    </div>
  );
}

export default TodoList;

