import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToDoList from './To-do-list';
import mockData from '../mockData/mockData';

afterEach(cleanup);
let temMockData = mockData;
const handleCheckboxChange = (id) => {
  const newTodos = mockData.map((todo) => {
    if (todo.id === id) {
      return { ...todo, completed: !todo.completed };
    }
    return todo;
  });
  temMockData = newTodos;
};
const handleDelete = (id) => {
  const newTodos = mockData.filter((todo) => todo.id !== id);
  temMockData = newTodos;
};
describe('todo list test', () => {
  test('should show the to do title', async () => {
    render(
      <ToDoList
        todos={mockData}
        onCheckboxChange={handleCheckboxChange}
        onDelete={handleDelete}
      />
    );
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems.length).toBe(mockData.length);
    mockData.forEach((d) =>
      expect(screen.getByText(d.title)).toBeInTheDocument()
    );
  });
  test('should have the input checkbox in each list item', () => {
    render(
      <ToDoList
        todos={mockData}
        onCheckboxChange={handleCheckboxChange}
        onDelete={handleDelete}
      />
    );
    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((li) => {
      expect(li.querySelector('input[type="checkbox"]')).toBeInTheDocument();
    });
  });
  test('should have the delete button in each list item', () => {
    render(
      <ToDoList
        todos={mockData}
        onCheckboxChange={handleCheckboxChange}
        onDelete={handleDelete}
      />
    );
    const listItems = screen.getAllByRole('listitem');
    listItems.forEach((li) => {
      expect(li.querySelector('.removeButton')).toBeInTheDocument();
    });
  });
});
