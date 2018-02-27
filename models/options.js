module.exports = (sequelize, DataTypes) => {
  const options = sequelize.define('options', {
    option: DataTypes.STRING,
  }, {});
  options.associate = (models) => {
    models.options.belongsTo(models.questions, { as: 'question' });
  };
  return options;
};
