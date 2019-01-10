'use strict';

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

    // Calls username and password
    Users.authenticate = ( username, password) => {

      const user = Users.findOne({ where: { username } });

      // Compares password with from the one retrieved in the db and the one passed in by user
      if (bcrypt.compareSync(password, user.password)) {
        return user.authorize();
      }

      throw new Error('invalid password');
    }

    // Accesses the User model prototype. 
    Users.prototype.authorize = () => {
      const AuthToken  = sequelize.models;
      const user = this

      // Create a new auth token associated to this user
      const authToken = AuthToken.generate(this.id);

      // addAuthToken is a method which is made for any 'hasMany' relationships
      user.addAuthToken(authToken);

      return { user, authToken }
    };


    Users.prototype.logout = (token) => {

      // Destroy the auth token record that matches the passed token
      sequelize.models.AuthToken.destroy({ where: { token } });
    };

  return Users;
};