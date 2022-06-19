import * as request from 'supertest';
import { server } from './server';
import { db } from './controller';
import { v4 as uuidv4 } from 'uuid';
import { ENTITY_NOT_FOUND_MESSAGE, FIELD_REQUIRED_MESSAGE, INVALID_ENDPOINT_MESSAGE, INVALID_ID_MESSAGE } from './custom-errors';
 
describe('API:', () => {
  describe('Users:', () => {
    const testedServer = request(server);
    const userId = uuidv4();

    beforeAll(() => {
      console.log = jest.fn();
    });

    beforeEach(() => {
      db.users = [
        {
          id: userId,
          name: 'John',
          age: 30,
          hobbies: ['hobby']
        }
      ];
    });

    afterEach(() => {
      db.users = [];
    });

    afterAll(() => {
      server.close();
    });

    describe('GET all users', () => {
      test('200', async () => {
        const res = await testedServer
          .get('/api/users');

        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBe(1);
      });
    });

    describe('GET one user', () => {
      test('200', async () => {
        const res = await testedServer
          .get(`/api/users/${userId}`);
  
        expect(res.statusCode).toBe(200);
        expect(res.body.id).toBe(userId);
      });
  
      test('400', async () => {
        const res = await testedServer
          .get('/api/users/12345');
  
        expect(res.statusCode).toBe(400);
        expect(res.text).toBe(INVALID_ID_MESSAGE);
      });

      test('404', async () => {
        const res = await testedServer
          .get(`/api/users/${uuidv4()}`);
  
        expect(res.statusCode).toBe(404);
        expect(res.text).toBe(ENTITY_NOT_FOUND_MESSAGE);
      });
    });

    describe('POST user', () => {
      test('201', async () => {
        const newUserBody = {
          name: 'Jack',
          age: 20,
          hobbies: ['some hobby']
        };

        const res = await testedServer
          .post('/api/users')
          .send(newUserBody);

        expect(res.statusCode).toBe(201);
        expect(res.body.name).toBe(newUserBody.name);  
      });

      test('400', async () => {
        const newUserBody = {
          age: 20,
          hobbies: ['some hobby']
        };

        const res = await testedServer
          .post('/api/users')
          .send(newUserBody);

        expect(res.statusCode).toBe(400);
        expect(res.text).toBe(FIELD_REQUIRED_MESSAGE);
      });
    });

    describe('PUT user', () => {
      const bodyForUpdate = {
        name: 'Jack',
        age: 20,
        hobbies: ['some hobby']
      };
      
      test('200', async () => {
        const res = await testedServer
          .put(`/api/users/${userId}`)
          .send(bodyForUpdate);

        expect(res.statusCode).toBe(200);
        expect(res.body.name).toBe(bodyForUpdate.name);
      });

      test('400', async () => {
        const res = await testedServer
          .put('/api/users/12345')
          .send(bodyForUpdate);

        expect(res.statusCode).toBe(400);
        expect(res.text).toBe(INVALID_ID_MESSAGE);
      });

      test('404', async () => {
        const res = await testedServer
          .put(`/api/users/${uuidv4()}`)
          .send(bodyForUpdate);

        expect(res.statusCode).toBe(404);
        expect(res.text).toBe(ENTITY_NOT_FOUND_MESSAGE);
      });
    });

    describe('DELETE user', () => {
      test('204', async () => {
        const res = await testedServer
          .delete(`/api/users/${userId}`);

        expect(res.statusCode).toBe(204);
      });

      test('400', async () => {
        const res = await testedServer
          .delete('/api/users/12345');

        expect(res.statusCode).toBe(400);
        expect(res.text).toBe(INVALID_ID_MESSAGE);
      });

      test('404', async () => {
        const res = await testedServer
          .delete(`/api/users/${uuidv4()}`);

        expect(res.statusCode).toBe(404);
        expect(res.text).toBe(ENTITY_NOT_FOUND_MESSAGE);
      });
    });
  });

  test('Invalid endpoint', async () => {
    const res = await request(server)
      .get('/api/invalid_users');
    
    expect(res.statusCode).toBe(404);
    expect(res.text).toBe(INVALID_ENDPOINT_MESSAGE);  
  });
});