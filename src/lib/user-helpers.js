const externalApiHelpers = require('../lib/external-api-helpers');
const models = require('../../models');

const login = user => new Promise((resolve, reject) => {
  models.questions.count()
    .then((count) => {
      if (count === 0) {
        return externalApiHelpers.getQuestionsHelper()
          .then((questions) => {
            const questionRows = questions.map(q => models.questions.create(
              {
                question: q.question,
                correctAnswer: q.correctAnswer,
                options: q.options.map(option => ({ option })),
              },
              {
                include: [{
                  model: models.options,
                  as: 'options',
                }],
              },
            ));
            return Promise.all(questionRows);
          });
      }
      return Promise.resolve();
    })
    .then(() =>
      models.users.findOrCreate({
        where: { userName: user.userName },
      }))
    .then(([userRow]) => resolve(userRow))
    .catch(reject);
});

const answer = userChoice => new Promise((resolve, reject) => {
  const questionPromise = models.questions.find({
    where: {
      id: userChoice.questionId,
    },
  });
  const userPromise = models.users.find({
    where: {
      userName: userChoice.userName,
    },
  });

  Promise.all([questionPromise, userPromise])
    .then(([question, user]) => {
      if (question === null) {
        reject({
          error: 'Question not found',
          statusCode: 404,
          message: 'Question id provided is invalid',
        });
      }

      if (user === null) {
        reject({
          error: 'User not found',
          statusCode: 404,
          message: 'userName provided is invalid',
        });
      }

      return models.answers.findOrCreate({
        where: {
          questionId: question.id,
          userId: user.id,
        },
      });
    })
    .then(([answerRow]) => answerRow.updateAttributes({
      selectedAnswer: userChoice.selectedAnswer,
    }))
    .then(resolve)
    .catch(reject);
});

const score = userName => new Promise((resolve, reject) => {
  const userPromise = models.users.find({
    where: {
      userName,
    },
  });

  const questionsPromise = models.questions.findAll();

  Promise.all([userPromise, questionsPromise])
    .then(([user, questions]) => {
      if (user === null) {
        return reject({
          error: 'User not found',
          statusCode: 404,
          message: 'userName provided is invalid',
        });
      }

      return Promise.all([models.answers.findAll({
        where: {
          userId: user.id,
        },
        include: [{
          model: models.questions,
          as: 'question',
        }],
      }), Promise.resolve(questions)]);
    })
    .then(([userAnswers, questions]) => {
      if (userAnswers.length !== questions.length) {
        reject({
          error: 'Quiz is incomplete',
          statusCode: 400,
          message: 'Complete the quiz and repeat the request',
        });
      }

      const correctAnswers = userAnswers.filter(a => a.selectedAnswer === a.question.correctAnswer);

      resolve(correctAnswers.length);
    });
});

module.exports = { login, answer, score };
