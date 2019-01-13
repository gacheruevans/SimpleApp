'use strict';

module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('Users', {
    username:{
        type: DataTypes.STRING,
        unique: true, // sets the username to be unique
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
    });
  };
  return Users;
};