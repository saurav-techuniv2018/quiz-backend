module.exports = (sequelize, DataTypes) => {
  const questions = sequelize.define('questions', {
    question: DataTypes.STRING,
    correctAnswer: DataTypes.STRING,
  }, {});
  questions.associate = (models) => {
    models.questions.hasMany(models.options);
  };
  return questions;
};
