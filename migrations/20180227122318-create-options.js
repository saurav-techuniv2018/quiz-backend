module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('options', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    option: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    questionId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'questions',
        key: 'id',
      },
    },
  }),
  down: queryInterface => queryInterface.dropTable('options'),
};
