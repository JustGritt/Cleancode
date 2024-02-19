const supertest = require('supertest');
const { createServer  } = require('./testGlobalSetup');
const userService  = require('../services/user');


describe('User API', () => {
    const server = createServer(); 
    describe('GET /users', () => {
      it('should retrieve all users', async () => {
        const response = await server.get('/users') 
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Array));
      });
    });
    describe('GET /users/:id', () => {
        it('should retrieve a user', async () => {
            const user = await userService.create({
                email: 'test@example.com', 
                firstname: 'User 1', 
                lastname: 'User 1',
                password: '12345678',
            });
            const response = await server.get(`/users/${user.id}`) 
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({ id: user.id }));
        });
    });
    describe('POST /register', () => {
        it('should create a user', async () => {
            const userData = {
                email: 'test+1@example.com', 
                firstname: 'User 1', 
                lastname: 'User 1',
                password: '12345678',
            } 
            
            const response = await server.post('/register').send(userData);

        expect(response.status).toBe(201);
        expect(response.body).toEqual(expect.objectContaining({ email: userData.email }));
        });
    });
});