const userHelpers = require('../../../lib/user-helpers');

module.exports = [
  {
    path: '/api/users/score',
    method: 'POST',
    handler: (request, response) => {
      userHelpers.score(request.payload.userName)
        .then(score => response({
          statusCode: 200,
          score,
        }))
        .catch(response);
    },
  },
];
