module.exports = (sequelize, DataTypes) => {
  const answers = sequelize.define('answers', {
    selectedAnswer: DataTypes.STRING,
  }, {});
  answers.associate = (models) => {
    models.answers.belongsTo(models.questions, { as: 'question' });
    models.answers.belongsTo(models.users, { as: 'user' });
  };
  return answers;
};
