import './App.css';
import ToDoList from './components/To-do-list';
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await fetch(
        'https://jsonplaceholder.typicode.com/todos'
      ).then((response) => response.json());
      setTodos(result.slice(0, 5));
    }

    fetchData();
  }, []);
  return (
    <div className="App">
      <h1>My To-Do List</h1>
      {todos.length > 0 ? <ToDoList todos={todos} /> : <h2>Loading...</h2>}
    </div>
  );
}

export default App;
