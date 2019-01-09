'use strict';
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    password: { 
        type: DataTypes.STRING,
        allowNull: false
    }
  });

  Users.associate = (models) => {
    // Association User model to Notes model via foreignkey
    Users.hasMany(models.Notes, {
      foreignKey: 'userId',
      as: 'noteItems'
    }),
    Users.hasMany(models.AuthToken);
  };
  return Users;
};