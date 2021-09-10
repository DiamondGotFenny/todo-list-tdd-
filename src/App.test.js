import {
  render,
  screen,
  cleanup,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';

afterEach(cleanup);
test('renders h1 title element', () => {
  render(<App />);

  //const h1Element = screen.getByText('My To-Do List');
  const h1Element = document.querySelector('h1');
  expect(h1Element).toBeInTheDocument();
  expect(h1Element.textContent).toBe('My To-Do List');
});

describe('render TodoList Component', () => {
  test('ToDoList Component exist', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/loading/i));
    const todoListElement = document.querySelector('ul');
    expect(todoListElement).toBeInTheDocument();
  });
});
