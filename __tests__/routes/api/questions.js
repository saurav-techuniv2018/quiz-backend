const supertest = require('supertest');
const server = require('../../../src/server');

const route = '/api/questions';

describe(`route GET ${route}`, () => {
  test('should return a Promise', () =>
    supertest(server.listener)
      .get(route)
      .then((response) => {
        expect(response.body.statusCode).toBe(200);
      })
      .catch((e) => { throw e; }));

  test('should give 404 for POST method', () =>
    supertest(server.listener)
      .post(route)
      .then((response) => {
        expect(response.body.statusCode).toBe(404);
      })
      .catch((e) => { throw e; }));

  test('should return an array of questions with options', () =>
    supertest(server.listener)
      .get(route)
      .then((response) => {
        if (response.body.data.length > 0) {
          expect(response.body.data[0]).toEqual(expect.objectContaining({
            id: expect.any(Number),
            question: expect.any(String),
            options: expect.any(Array),
          }));
        }
      })
      .catch((e) => { throw e; }));
});
