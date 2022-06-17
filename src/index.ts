import { createServer } from 'http';
import { getRequestBody, urlUsersApi } from './helpers';
import { Controller } from './db';

const userController = new Controller('users');

const server = createServer(async (req, res) => {
  if (req.url === urlUsersApi) {
    
    if (req.method === 'GET') {
      const users = await userController.getAll();

      res.write(users);
      res.end();
    }
  }

  if (req.url.startsWith(`${urlUsersApi}/`)) {
    const userId = req.url.replace(`${urlUsersApi}/`, '');
    
    if (req.method === 'GET') {
      const user = await userController.getOne(userId);

      res.write(user);
      res.end();
    }

    if (req.method === 'PUT') {
      const body = await getRequestBody(req);
      const user = await userController.update(userId, body);
      
      res.write(user);
      res.end();
    }
  }
});

server.listen(8080, () => {
  console.log('Server started on port 8080');
});