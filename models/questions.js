module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    question: DataTypes.STRING,
    correctAnswer: DataTypes.STRING,
  }, {});
  questions.associate = (models) => {
    questions.options = models.questions.hasMany(models.options, { as: 'options' });
  };
  return questions;
};
