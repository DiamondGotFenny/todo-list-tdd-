import './App.css';
import ToDoList from './components/To-do-list';
import React, { useState, useEffect } from 'react';

function App() {
  const [todos, setTodos] = useState([]);
  const [ErrorMsg, setErrorMsg] = useState(null);
  const [inputNewTodo, setInputNewTodo] = useState('');
  const [AddFailMsg, setAddFailMsg] = useState(null);
  const [loading, setLoading] = useState(false);

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

  const handleAddNewTodo = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (inputNewTodo.trim() === '') {
      setAddFailMsg('Please enter a todo');
      setLoading(false);
    }
    const newTodo = {
      id: Math.floor(Math.random() * 10000) + 1,
      userId: 1,
      title: inputNewTodo,
      completed: false,
    };
    try {
      const response = await fetch(
        'https://jsonplaceholder.typicode.com/todos',
        {
          method: 'POST',
          body: JSON.stringify(newTodo),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        }
      );
      //the jsonplaceholder will not throw error unlees you specify
      if (!response.ok) {
        throw new Error('Failed to add new todo');
      }
      const result = await response.json();

      result.id = newTodo.id;

      setTodos([...todos, result]);
      setLoading(false);
      setInputNewTodo('');
    } catch (error) {
      setAddFailMsg('Adding New Todo Failed');
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/todos'
        );
        const result = await response.json();
        setLoading(false);
        setTodos(result.slice(0, 5));
      } catch (error) {
        setErrorMsg('Fetching Data Failed');
        setLoading(false);
      }
    };
    fetchData();
    return () => {
      setLoading(false);
      setTodos([]);
    };
  }, []);

  return (
    <div className="App">
      <h1>My To-Do List</h1>
      {AddFailMsg && <p className="error-msg">{AddFailMsg}</p>}
      <form onSubmit={handleAddNewTodo}>
        <input
          type="text"
          placeholder="Enter Your New todo here"
          onChange={(e) => setInputNewTodo(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          Add new todo
        </button>
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
