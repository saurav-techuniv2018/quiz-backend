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
                options: q.options,
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

module.exports = { login };
