const supertest = require('supertest');

const models = require('../../../models');
const server = require('../../../src/server');

const route = '/api/answers';

const clean = () => models.users.destroy({
  truncate: true,
  restartIdentity: true,
  cascade: true,
})
  .then(() => models.options.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,

  }))
  .then(() => models.questions.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,

  }))
  .then(() => models.answers.destroy({
    truncate: true,
    restartIdentity: true,
    cascade: true,

  }));

beforeEach((done) => {
  models.users.create({
    userName: 'first',
  })
    .then(() =>
      models.questions.create(
        {
          question: 'test',
          correctAnswer: 'answer',
          options: [{ option: 'a' }, { option: 'b' }],
        },
        {
          include: [{ model: models.options, as: 'options' }],
        },
      ))
    .then(() => {
      done();
    });
});
afterEach(clean);

describe(`route POST ${route}`, () => {
  test('should return 200 statusCode', () =>
    supertest(server.listener)
      .post(route)
      .send({
        questionId: 1,
        userName: 'first',
        selectedAnswer: 'New Delhi',
      })
      .then((response) => {
        expect(response.body.statusCode).toBe(200);
      })
      .catch((e) => { throw e; }));

  test('should give 404 for GET method', () =>
    supertest(server.listener)
      .get(route)
      .then((response) => {
        expect(response.body.statusCode).toBe(404);
      })
      .catch((e) => { throw e; }));
});
