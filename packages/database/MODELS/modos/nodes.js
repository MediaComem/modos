/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nodes', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 'nextval(nodes_id_seq::regclass)',
      unique: true
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
      allowNull: false
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
    }
  }, {
    tableName: 'nodes'
  });
};
