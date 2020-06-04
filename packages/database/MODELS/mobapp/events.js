/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('events', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    _mobapp_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    _mobapp_title: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_owner: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_password: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_observations: {
      type: "ARRAY",
      allowNull: true
    },
    _mobapp_beginning: {
      type: DataTypes.DATE,
      allowNull: true
    },
    _mobapp_ending: {
      type: DataTypes.DATE,
      allowNull: true
    },
    _mobapp_objective: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_numberofimages: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    _mobapp_createdat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    _mobapp_updatedat: {
      type: DataTypes.DATE,
      allowNull: true
    },
    _mobapp__v: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'events'
  });
};
