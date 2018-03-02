const models = require('../../../../models');

module.exports = [
  {
    path: '/api/users/top/{count}',
    method: 'GET',
    handler: (request, response) => {
      models.users.findAll({
        limit: Number(request.params.count),
        where: {
          score: {
            $ne: null,
          },
        },
        order: [['score', 'DESC']],
        attributes: ['userName', 'score'],
      })
        .then(users => response({
          statusCode: 200,
          data: users,
        }));
    },
  },
];
