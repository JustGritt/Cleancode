const { createServer  } = require('./testGlobalSetup');
const cardsService  = require('../services/card');

const server = createServer();
let Token = '';

describe('Cards API', () => {  
    beforeAll(async () => {
        await server.post('/register').send({
            "email": "test@example.com",
            "password": "password",
        });
        const data = await server.post('/login').send({
            "email": "test@example.com",
            "password": "password",
        });
        Token = data.body.token;
    });
    describe('GET /cards', () => {
        it('should retrieve all cards by array of tags', async () => {
            const response = await server.get('/cards?tags=tag1,tag2').set('Authorization', `Bearer ${Token}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.any(Array));
        });
        it('should return 401 if no token is provided', async () => {
            const response = await server.get('/cards?tags=tag1,tag2');
            expect(response.status).toBe(401);
        });
    });
});