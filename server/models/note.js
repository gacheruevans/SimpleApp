'use strict';

module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  });

  Notes.associate = (models) => {
    // Create user model association with notes model. 
    Notes.belongsTo(models.Users, {
      foreignKey: 'userId',
      onDelete: 'CASCADE'
    });
  };
  return Notes;
};