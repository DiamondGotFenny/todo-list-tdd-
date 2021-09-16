import './App.css';
import ToDoList from './components/To-do-list';
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [ErrorMsg, setErrorMsg] = useState(null);
  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      );
      const result = await response.json();
      setTodos(result.slice(0, 5));
    } catch (error) {
      setErrorMsg('Fetching Data Failed');
    }
  };

  const handleCheckboxChange = (id) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  useEffect(() => {
    fetchData();

    return () => {
      setTodos([]); //cleanup
      setErrorMsg(null);
    };
  }, []);

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      <form onSubmit={null}>
        <input type="text" placeholder="Enter Your New todo here" />
        <button type="submit">Add new todo</button>
      </form>
      {ErrorMsg && <h2 className="error">{ErrorMsg}</h2>}
      {todos.length === 0 && !ErrorMsg && <h2>No items</h2>}
      {todos.length > 0 && !ErrorMsg ? (
        <ToDoList
          todos={todos}
          onCheckboxChange={handleCheckboxChange}
          onDelete={handleDelete}
        />
      ) : (
        <h2>Loading...</h2>
      )}
    </div>
  );
}

export default App;
