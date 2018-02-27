module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define('users', {
    username: DataTypes.STRING,
    score: DataTypes.INTEGER,
  }, {});
  users.associate = function associate() {
    // associations can be defined here
  };
  return users;
};
