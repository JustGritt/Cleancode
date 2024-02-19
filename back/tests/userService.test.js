const supertest = require('supertest');
const { createServer  } = require('./testGlobalSetup');
const userService  = require('../services/user');


describe('User API', () => {
    describe('GET /users', () => {
      it('should retrieve all users', async () => {
        const server = createServer(); 
        const response = await server.get('/users') 
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
      });
    });
});