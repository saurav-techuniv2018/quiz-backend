module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.addColumn('answers', 'userId', {
      type: Sequelize.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    }),
  down: queryInterface =>
    queryInterface.removeColumn('answers', 'userId'),
};
