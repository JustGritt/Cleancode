const { connection } = require('../database');
const { database } = require('./testConfig');
const app = require('../server');
const fs = require('fs');
const supertest = require('supertest');

let server;

// Create a reusable instance of supertest
const createServer = () => supertest(app);

beforeAll(async () => {
  await connection.sync({ force: true });
  server = createServer();
});

afterAll(async () => {
  await connection.close();
});

// Delete the test database after all tests have run
afterAll((done) => {
  fs.unlink(database, (err) => {
    if (err) {
      console.error(err.message);
    }
    done();
  });
});

module.exports = { createServer };

