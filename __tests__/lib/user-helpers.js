const models = require('../../models');
const userHelpers = require('../../src/lib/user-helpers');

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

describe('userHelpers', () => {
  describe('should return error object', () => {
    test('when questionId is invalid', ((done) => {
      userHelpers.answer({
        questionId: -1,
        userId: 1,
        selectedAnswer: 'New Delhi',
      })
        .then(() => {
        })
        .catch((e) => {
          expect(e).toEqual({
            error: 'Question not found',
            message: 'Question id provided is invalid',
            statusCode: 404,
          });
          done();
        });
    }));

    test('when userName is invalid', ((done) => {
      userHelpers.answer({
        questionId: 1,
        userId: -1,
        selectedAnswer: 'New Delhi',
      })
        .then(() => {
        })
        .catch((e) => {
          expect(e).toEqual({
            error: 'User not found',
            message: 'userName provided is invalid',
            statusCode: 404,
          });
          done();
        });
    }));
  });
});
