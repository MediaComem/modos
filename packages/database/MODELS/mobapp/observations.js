/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('observations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    _mobapp_id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    _mobapp_owner: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_description_obstacle: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_description_freetext: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    _mobapp_description_impact: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    _mobapp_location_latitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    _mobapp_location_longitude: {
      type: DataTypes.DOUBLE,
      allowNull: true
    },
    _mobapp_image_imageurl: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    geom: {
      type: DataTypes.ENUM(),
      allowNull: true
    }
  }, {
    tableName: 'observations'
  });
};
