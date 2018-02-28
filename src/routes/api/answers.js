const userHelpers = require('../../lib/user-helpers');

module.exports = [
  {
    path: '/api/answers',
    method: 'POST',
    handler: (request, response) => {
      userHelpers.answer({
        userName: request.payload.userName,
        questionId: request.payload.questionId,
        selectedAnswer: request.payload.selectedAnswer,
      })
        .then(() => response({
          statusCode: 200,
        }))
        .catch(response);
    },
  },
];

