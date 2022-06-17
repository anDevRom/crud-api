import {IncomingMessage, ServerResponse} from 'http';

export const urlUsersApi = '/api/users';

export const getOkResponseCustomization = (res: ServerResponse) => {
  return <T>(statusCode: number, data: T) => {
    res.statusCode = statusCode;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(data));
    res.end();
  };
};

export const getErrorResponseCustomization = (res: ServerResponse) => {
  return (statusCode: number, errorMessage: string) => {
    res.statusCode = statusCode;
    res.write(errorMessage);
    res.end();
  };
};

export const getRequestBody = async (req: IncomingMessage) => {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  return JSON.parse(Buffer.concat(buffers).toString());
};