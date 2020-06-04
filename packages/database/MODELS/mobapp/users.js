/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
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
    _mobapp_pseudonym: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_email: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_passwordhash: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_events: {
      type: "ARRAY",
      allowNull: true
    },
    _mobapp_age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    _mobapp_gender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_helper: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_helperfrequency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_mobility: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    tableName: 'users'
  });
};
