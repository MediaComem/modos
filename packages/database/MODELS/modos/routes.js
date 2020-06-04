/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('routes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    route_wplos: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '1.0'
    },
    route_plos: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '1.0'
    },
    geom: {
      type: DataTypes.ENUM(),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    }
  }, {
    tableName: 'routes'
  });
};
