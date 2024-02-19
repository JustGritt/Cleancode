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

        if('should return 404 if user does not exist', async () => {
            const response = await server.get(`/users/999999`) 
            expect(response.status).toBe(404);
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

        it('should return 400 if user data is invalid', async () => {
            const userData = {
                email: 'test+4@example.com',
                firstname: 'User 4',
                lastname: 'User 4',
            }
            const response = await server.post('/register').send(userData);
            expect(response.status).toBe(400);

        });
    });
    describe('POST /login', () => {
        it('should login a user', async () => {
            const userData = {
                email: 'test+1@example.com',
                password: '12345678'
            }

            const response = await server.post('/login').send(userData);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.objectContaining({ token: expect.any(String) }));
        });

        it('should return 401 if user data is invalid', async () => {
            const data = {
                email: 'test@example.com',
                password: 'pokemon1234'
            }
            const response = await server.post('/login').send(data);
            expect(response.status).toBe(401);
        });
    })

});