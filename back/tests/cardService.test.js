const { createServer  } = require('./testGlobalSetup');
const cardsService  = require('../services/card');

const server = createServer();

describe('Cards API', () => {  
    describe('GET /cards', () => {
        it('should retrieve all cards by array of tags', async () => {
           //create a new user
            const newUser = await server.post('/register').send({
                "email": "test@example.com",
                "password": "password",
            });
            const data = await server.post('/login').send({
                "email": "test@example.com",
                "password": "password",
            });
            const response = await server.get('/cards?tags=tag1,tag2').set('Authorization', `Bearer ${data.body.token}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.any(Array));
        });
    });
});