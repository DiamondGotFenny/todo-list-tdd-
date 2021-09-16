import React from 'react';
const ToDoList = ({ todos, onCheckboxChange, onDelete }) => {
  return (
    <ul aria-labelledby="todos-heading">
      {todos.map((todo) => {
        return (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onCheckboxChange(todo.id)}
            />
            {todo.title}
            <button
              type="button"
              className="removeButton"
              onClick={() => onDelete(todo.id)}
            >
              X
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default ToDoList;
