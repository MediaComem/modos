'use strict';

module.exports = (sequelize, DataTypes) => {

  const Event = sequelize.define('event', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    password: DataTypes.STRING,

    beginning: {
      type: DataTypes.DATE,
      allowNull: false
    },

    ending: {
      type: DataTypes.DATE,
      allowNull: false
    },

    objective: {
      type: DataTypes.STRING,
      allowNull: false
    },

    numberOfImages: DataTypes.INTEGER

  }, {});

  Event.associate = function (models) {
    Event.belongsTo(models.user);
    Event.belongsToMany(models.user, { through: 'userEvent' });
    Event.hasMany(models.observation);
  };

  return Event;
};