/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ploscategories', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    category: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    weight: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '0.0'
    },
    time_weight: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '1.0'
    }
  }, {
    tableName: 'ploscategories'
  });
};
