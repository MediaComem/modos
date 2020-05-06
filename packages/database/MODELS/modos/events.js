/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('events', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    owner: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    beginning: {
      type: DataTypes.DATE,
      allowNull: true
    },
    ending: {
      type: DataTypes.DATE,
      allowNull: true
    },
    objective: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'events'
  });
};
