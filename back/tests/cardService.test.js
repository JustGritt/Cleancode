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
        it('should retrieve all cards if tags is undefined', async () => {
            const response = await server.get('/cards').set('Authorization', `Bearer ${Token}`);
            expect(response.status).toBe(200);
            expect(response.body).toEqual(expect.any(Array));
        });
    });

    describe('POST /cards', () => {
        it('should create a card', async () => {
            const response = await server.post('/cards').send({
                "question": "Test Question",
                "answer": "Test Answer",
                "tag": 'tags1'
            }).set('Authorization', `Bearer ${Token}`);
            expect(response.status).toBe(201);
            expect(response.body).toEqual(expect.objectContaining({ category: "FIRST" }));
        });

        it('should return 401 if no token is provided', async () => {
            const response = await server.post('/cards').send({
                "question": "Test Question",
                "answer": "Test Answer",
                "tag": 'tags1'
            });
            expect(response.status).toBe(401);
        });

        it('should return 422 if card data is invalid', async () => {
            const response = await server.post('/cards').send({
                "question": "Test Question",
                "tag": 'tags1'
            }).set('Authorization', `Bearer ${Token}`);
            expect(response.status).toBe(422);
        });
    });

    describe("Get next category", () => {   
        it('should return the next category', async () => {
            const newCard = await cardsService.create({
                question: "Test Question",
                answer: "Test Answer",
                tag: 'tags1'
            }, { id: 1 });
            const nextCategory = await cardsService.setNextCategory(newCard);
            console.log(nextCategory);
            expect(nextCategory.category).toBe("SECOND");
        });
    });
});