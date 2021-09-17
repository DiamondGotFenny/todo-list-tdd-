import {
  render,
  screen,
  fireEvent,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import App from './App';
import server from './mockAPI/server';
import { rest } from 'msw';

beforeAll(() => server.listen());

afterEach(() => server.resetHandlers());

afterAll(() => server.close());

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
  test('should render "No items" when no items', async () => {
    //server must be reset before render, or it will be overridden
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/todos',
        (_req, res, ctx) => {
          return res(ctx.json([]));
        }
      )
    );
    render(<App />);

    const noItemsText = await screen.findByText(/No items/i);
    expect(noItemsText).toBeInTheDocument();
  });
  test('should render "Fetching Data Failed', async () => {
    const testErrorMessage = 'Fetching Data Failed';
    server.use(
      rest.get(
        'https://jsonplaceholder.typicode.com/todos',
        (_req, res, ctx) => {
          return res(ctx.status(500), ctx.json({ message: testErrorMessage }));
        }
      )
    );
    render(<App />);
    const errorMessage = await screen.findByText(testErrorMessage);
    expect(errorMessage).toBeInTheDocument();
  });

  test('should render 5 list items', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    const listItem = await screen.findAllByRole('listitem');
    expect(listItem.length).toBe(5);
    expect(screen.getByText(/Eat breakfast/i)).toBeInTheDocument();
  });
  test('should have "completed" className after input checkbox is checked', async () => {
    render(<App />);
    const listItems = await screen.findAllByRole('listitem');
    const checkbox = listItems[0].querySelector('input[type="checkbox"]');
    checkbox.click();
    expect(checkbox.checked).toBe(true);
    expect(listItems[0]).toHaveClass('completed');
    checkbox.click();
    expect(checkbox.checked).toBe(false);
    expect(listItems[0]).not.toHaveClass('completed');
  });
  test('should remove todo item after remove button is clicked', async () => {
    render(<App />);
    const listItems = await screen.findAllByRole('listitem');
    const removeButton = listItems[0].querySelector('.removeButton');
    removeButton.click();
    expect(listItems[0]).not.toBeInTheDocument();
    const newlistItems = await screen.findAllByRole('listitem');
    expect(newlistItems).toHaveLength(4);
  });
});

describe('render AddTodo Component', () => {
  test('should have an AddTodo button', () => {
    render(<App />);
    const addTodoButton = screen.getByText(/Add new todo/i);
    expect(addTodoButton).toBeInTheDocument();
  });
  test('should have an text input for new todo content', () => {
    render(<App />);
    const textInput = screen.getByPlaceholderText(/Enter Your New todo here/i);
    expect(textInput).toBeInTheDocument();
  });
  test('should add new todo item when "Add new todo" button is clicked', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    const textInput = screen.getByPlaceholderText(/Enter Your New todo here/i);
    fireEvent.change(textInput, { target: { value: 'running' } });
    const addButton = screen.getByText(/Add new todo/i);
    addButton.click();
    expect(addButton).toBeDisabled();
    expect(await screen.findByText(/running/i)).toBeInTheDocument();
    expect(addButton).not.toBeDisabled();
  });
  test('should render error message "Please enter a todo" when "Add new todo" button is clicked and text is empty', async () => {
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    const textInput = screen.getByPlaceholderText(/Enter Your New todo here/i);
    fireEvent.change(textInput, { target: { value: '' } });
    const addButton = screen.getByText(/Add new todo/i);
    addButton.click();
    const testErrorMessage = 'Please enter a todo';
    const errorMessage = screen.getByText(testErrorMessage);
    expect(errorMessage).toBeInTheDocument();
  });
  test('should render error message "Adding New Todo Failed" when post new todo fail', async () => {
    server.use(
      rest.post(
        'https://jsonplaceholder.typicode.com/todos',
        (req, res, ctx) => {
          return res(
            ctx.status(500),
            ctx.json({ message: 'Adding New Todo Failed' })
          );
        }
      )
    );
    render(<App />);
    await waitForElementToBeRemoved(() => screen.getByText(/Loading.../i));
    const textInput = screen.getByPlaceholderText(/Enter Your New todo here/i);
    fireEvent.change(textInput, { target: { value: 'running' } });
    const addButton = screen.getByText(/Add new todo/i);
    addButton.click();
    expect(addButton).toBeDisabled();
    const errorMessage = await screen.findByText('Adding New Todo Failed');
    expect(errorMessage).toBeInTheDocument();
    expect(addButton).not.toBeDisabled();
  });
});
