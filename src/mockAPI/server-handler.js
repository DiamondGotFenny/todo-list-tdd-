import mockData from '../mockData/mockData';
import { rest } from 'msw'; // msw supports graphql too!

const handlers = [
  rest.get('https://jsonplaceholder.typicode.com/todos', (req, res, ctx) => {
    return res(ctx.json(mockData));
  }),
];

export { handlers };
