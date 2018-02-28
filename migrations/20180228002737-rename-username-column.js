module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.removeColumn('users', 'username')
      .then(() => queryInterface.addColumn('users', 'userName', {
        type: Sequelize.STRING,
      }))
      .then(() => queryInterface.addConstraint('users', ['userName'], {
        type: 'unique',
        name: 'unique_username',
      })),
  down: (queryInterface, Sequelize) =>
    queryInterface.removeConstraint('users', 'unique_username')
      .then(() => queryInterface.removeColumn('users', 'userName'))
      .then(() => queryInterface.addColumn('users', 'username', {
        type: Sequelize.STRING,
      })),
};
