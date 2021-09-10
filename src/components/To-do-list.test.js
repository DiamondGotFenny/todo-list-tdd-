import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToDoList from './To-do-list';
import mockData from '../mockData/mockData';
afterEach(cleanup);

test('renders ul', () => {
  render(<ToDoList todos={mockData} />);
  const ulElement = document.querySelector('ul');
  expect(ulElement).toBeInTheDocument();
});
describe('todo list test', () => {
  test('should show the to do title in li', () => {
    render(<ToDoList todos={mockData} />);
    mockData.forEach((todo) => {
      const todoTitle = screen.getByText(todo.title);
      expect(todoTitle).toBeInTheDocument();
    });
  });
});
