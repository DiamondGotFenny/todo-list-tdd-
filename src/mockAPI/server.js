import { setupServer } from 'msw/node';
import { handlers } from './server-handler';

const server = setupServer(...handlers);

export default server;
