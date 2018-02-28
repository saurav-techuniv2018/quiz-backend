const userHelpers = require('../../../lib/user-helpers');

module.exports = [
  {
    path: '/api/users/score',
    method: 'POST',
    handler: (request, response) => {
      userHelpers.score(request.payload.userName)
        .then(result => response({
          statusCode: 200,
          data: {
            score: result.score,
            total: result.total,
          },
        }))
        .catch(response);
    },
  },
];
