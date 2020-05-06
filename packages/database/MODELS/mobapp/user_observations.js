/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_observations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: 'users',
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
    tableName: 'user_observations'
  });
};
