import { render, screen, cleanup } from '@testing-library/react';
import App from './App';
import server from './mockAPI/server';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());
afterEach(() => {
  cleanup();
});

test('renders h1 title element', () => {
  render(<App />);
  const h1Element = screen.getByText('My To-Do List');
  expect(h1Element).toBeInTheDocument();
});

describe('render TodoList Component', () => {
  test('render App component', () => {
    render(<App />);
  });
  test('"Loading..." exists when fetching data', async () => {
    render(<App />);
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
  });
  test('render to do list item', async () => {
    render(<App />);
    expect(await screen.findByText(/Eat breakfast/i)).toBeInTheDocument();
  });
});
