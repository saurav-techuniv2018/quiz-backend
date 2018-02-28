const models = require('../../../models');

module.exports = [
  {
    path: '/api/questions',
    method: 'GET',
    handler: (request, response) => {
      models.questions.findAll({
        include: [{
          model: models.options,
          as: 'options',
        }],
      })
        .then((questions) => {
          response({
            statusCode: 200,
            data: [
              ...questions.map(q => ({
                id: q.id,
                question: q.question,
                options: q.options.map(option => option.option),
              })),
            ],
          });
        })
        .catch(response);
    },
  },
];

