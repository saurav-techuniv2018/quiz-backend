const supertest = require('supertest');

const server = require('../../../../src/server');
const models = require('../../../../models');
const userHelpers = require('../../../../src/lib/user-helpers');

const route = '/api/users/login';

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

  }));

beforeEach((done) => {
  models.users.create({
    userName: 'first',
  })
    .then(() => { done(); });
});

afterEach(clean);

describe(`route ${route}`, () => {
  test('should return 200 statusCode', () =>
    supertest(server.listener)
      .post(route)
      .send({ userName: 'first-user' })
      .then((response) => { expect(response.body.statusCode).toBe(200); })
      .catch((e) => { throw e; }));

  test('should accept POST request', () =>
    supertest(server.listener)
      .get(route)
      .then((response) => { expect(response.body.statusCode).toBe(404); })
      .catch((e) => { throw e; }));

  test('should add new entry is user is not present', (done) => {
    userHelpers.login({ userName: 'second' })
      .then(() => models.users.count())
      .then((count) => {
        expect(count).toBe(2);
        done();
      })
      .catch((e) => { throw e; });
  });
});
