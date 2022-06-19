import { createServer } from 'http';
import { validate as validateId } from 'uuid';
import { 
  getRequestBody, 
  urlUsersApi, 
  getOkResponseCustomization, 
  getErrorResponseCustomization 
} from './helpers';
import { Controller } from './controller';
import { 
  DbError, 
  FieldRequiredError, 
  INVALID_ENDPOINT_MESSAGE, 
  INVALID_ID_MESSAGE, 
  SERVER_SIDE_ERROR_MESSAGE 
} from './custom-errors';
import { UserDTO } from './types';
import 'dotenv/config';

const userController = new Controller<UserDTO>('users');

export const server = createServer(async (req, res) => {
  const setOkResponseParams = getOkResponseCustomization(res);
  const setErrorResponseParams = getErrorResponseCustomization(res);
  
  try {
    if (req.url === urlUsersApi) {
      if (req.method === 'GET') {
        const users = await userController.getAll();
  
        setOkResponseParams(200, users);
        return;
      }
  
      if (req.method === 'POST') {
        const body = await getRequestBody(req);
        const user = await userController.create(body);
  
        setOkResponseParams(201, user);
        return;
      }
    }
  
    if (req.url.startsWith(`${urlUsersApi}/`)) {
      const userId = req.url.replace(`${urlUsersApi}/`, '');
      
      if (!validateId(userId)) {
        setErrorResponseParams(400, INVALID_ID_MESSAGE);
        return;
      }
  
      if (req.method === 'GET') {
        const user = await userController.getOne(userId);
  
        setOkResponseParams(200, user);
        return;
      }
  
      if (req.method === 'PUT') {
        const body = await getRequestBody(req);
        const user = await userController.update(userId, body);
        
        setOkResponseParams(200, user);
        return;
      }
  
      if (req.method === 'DELETE') {
        await userController.delete(userId);
  
        res.statusCode = 204;
        res.end();
        return;
      }
    }

    setErrorResponseParams(404, INVALID_ENDPOINT_MESSAGE);
  } catch(err) {
    if (err instanceof DbError) {
      setErrorResponseParams(404, err.message);
      return;
    }

    if (err instanceof FieldRequiredError) {
      setErrorResponseParams(400, err.message);
      return;
    }

    console.error(err);
    setErrorResponseParams(500, SERVER_SIDE_ERROR_MESSAGE);
  }
});

server.on('request', (req) => {
  console.log(`${new Date().toLocaleString()} [${req.method}]: ${req.url}`);
});

server.listen(process.env.PORT, () => {
  console.log(`Server started. Port: ${process.env.PORT}. Pid: ${process.pid}`);
});

process.on('SIGINT', () => {
  process.exit();
});