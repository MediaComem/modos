/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osm_nodes', {
    ogc_fid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    y: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    x: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    osmid: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    highway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    geom: {
      type: DataTypes.ENUM(),
      allowNull: true
    }
  }, {
    tableName: 'osm_nodes'
  });
};
