import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import ToDoList from './To-do-list';
import mockData from '../mockData/mockData';

beforeAll(() => jest.spyOn(window, 'fetch'));

afterEach(cleanup);

describe('todo list test', () => {
  test('should show the to do title', async () => {
    render(<ToDoList todos={mockData} />);
    const listItems = await screen.findAllByRole('listitem');
    expect(listItems.length).toBe(mockData.length);
    mockData.forEach((d) =>
      expect(screen.getByText(d.title)).toBeInTheDocument()
    );
  });
});
