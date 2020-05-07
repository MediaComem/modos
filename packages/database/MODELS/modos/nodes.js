/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nodes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    lat: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    lon: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    osmid: {
      type: DataTypes.BIGINT,
      allowNull: false,
      unique: true
    },
    highway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    data_source: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'osm'
    },
    geom: {
      type: DataTypes.ENUM(),
      allowNull: false
    },
    uuid: {
      type: DataTypes.UUIDV4,
      allowNull: false,
      unique: true
    }
  }, {
    tableName: 'nodes'
  });
};
