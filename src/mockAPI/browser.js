//mock a api service for development

import { setupWorker } from 'msw';
import { handlers } from './server-handler';

// This configures a Service Worker with the given request handlers.

export const worker = setupWorker(...handlers);
