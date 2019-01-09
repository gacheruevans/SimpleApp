'use strict';

module.exports = (sequelize, DataTypes) => {

  const NoteItem = sequelize.define('Note', {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type :DataTypes.TEXT,
      allowNull: false
    }
  });

  Note.associate = function(models) {
    // associations can be defined here
  };
  return NoteItem;
};