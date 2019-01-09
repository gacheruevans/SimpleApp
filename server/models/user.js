'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('Users', {
    username:{
        type: DataTypes.STRING,
        allowNull: false
    }, 
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
  });

  User.associate = (models) => {
    // associations can be defined here
    User.hasMany(models.Notes, {
      foreignKey: 'userId',
      as: 'Notes'
    })
  };
  return User;
};