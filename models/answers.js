module.exports = (sequelize, DataTypes) => {
  const answers = sequelize.define('answers', {
    selectedAnswer: DataTypes.STRING,
  }, {});
  answers.associate = (models) => {
    models.answers.belongsTo(models.questions);
  };
  return answers;
};
