const supertest = require('supertest');

const server = require('../../../../src/server');
const models = require('../../../../models');
const userHelpers = require('../../../../src/lib/user-helpers');

const route = '/api/users/login';

beforeEach(done =>
  models.users.destroy({
    truncate: true,
    restartIdentity: true,
  })
    .then(() => {
      models.users.create({
        userName: 'first',
      });
      done();
    }));

afterEach(() => models.users.destroy({
  truncate: true,
  restartIdentity: true,
}));

describe('route` /api/users/login', () => {
  test('should return 200 statusCode', () =>
    supertest(server.listener)
      .post(route)
      .send({ userName: 'first-user' })
      .then((response) => { expect(response.body.statusCode).toBe(200); })
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
