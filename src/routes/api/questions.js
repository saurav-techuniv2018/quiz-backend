const models = require('../../../models');

module.exports = [
  {
    path: '/api/questions',
    method: 'POST',
    handler: (request, response) => {
      Promise.all([models.users.find({
        where: { userName: request.payload.userName },
        include: [
          {
            model: models.answers,
            as: 'answers',
            include: [
              {
                model: models.questions,
                as: 'question',
              },
            ],
          }],
      }),
      models.questions.findAll({
        include: [{
          model: models.options,
          as: 'options',
        }],
      }),
      ])
        .then(([user, allQuestions]) => {
          const questions = [
            ...allQuestions.map(q => ({
              id: q.id,
              question: q.question,
              options: q.options.map(option => option.option),
            })),
          ];

          for (let i = 0; i < user.answers.length; i += 1) {
            const index = questions.findIndex(p => p.id === user.answers[i].questionId);
            if (index !== -1) {
              questions[index].selectedAnswer = user.answers[i].selectedAnswer;
            }
          }

          response({
            statusCode: 200,
            data: questions,
          });
        })
        .catch(response);
    },
  },
];

