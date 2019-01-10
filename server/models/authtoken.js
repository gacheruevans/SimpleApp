'use strict';
module.exports = (sequelize, DataTypes) => {
  const AuthToken = sequelize.define('AuthToken', {
    token: {
      type: DataTypes.STRING,
      allowNull: false
    }
    
  });
  AuthToken.associate = (models) => {
    // Link Auth token and users model
      AuthToken.belongsTo(models.Users)
  };

  // Generates a random 15 character token & associates it with a user
  AuthToken.generate = async function(userId) {
    if (!userId) {
      throw new Error('AuthToken requires a user ID')
    }

    let token = '';

    const possibleCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' +
      'abcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 15; i++) {
      token += possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
    }

    return AuthToken.create({ token, userId })
  }

  return AuthToken;
};