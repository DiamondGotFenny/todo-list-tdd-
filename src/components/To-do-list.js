import React from 'react';
const ToDoList = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => {
        return <li key={todo.id}>{todo.title}</li>;
      })}
    </ul>
  );
};

export default ToDoList;
