import {IncomingMessage} from 'http';

export const urlUsersApi = '/api/users';

export const getRequestBody = async (req: IncomingMessage) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  return JSON.parse(Buffer.concat(buffers).toString());
};