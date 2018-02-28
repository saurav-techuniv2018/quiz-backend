const userHelpers = require('../../../lib/user-helpers');

module.exports = [
  {
    path: '/api/users/login',
    method: 'POST',
    handler: (request, response) => {
      userHelpers.login({
        userName: request.payload.userName,
      })
        .then((user) => {
          response({
            statusCode: 200,
            data: {
              user: {
                userName: user.userName,
              },
            },
          });
        })
        .catch(response);
    },
  },
];
