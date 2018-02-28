module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    userName: DataTypes.STRING,
    score: DataTypes.INTEGER,
  }, {});
  users.associate = (models) => {
    models.users.hasMany(models.answers, { as: 'answers' });
    models.answers.belongsTo(models.users);
  };
  return users;
};
