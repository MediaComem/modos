/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('event_observations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    event_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: 'events',
        key: '_mobapp_id'
      },
      unique: true
    },
    observation_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: 'observations',
        key: '_mobapp_id'
      }
    }
  }, {
    tableName: 'event_observations'
  });
};
