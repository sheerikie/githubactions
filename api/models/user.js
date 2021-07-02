module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    name: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Must be a valid email address",
        }
      }
    },
    password: {
      type: Sequelize.STRING,
    },
    passwordResetToken: {
      type: Sequelize.STRING,
    }
  });
  return User;
};
