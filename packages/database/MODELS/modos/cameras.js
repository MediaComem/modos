/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cameras', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    cam_make: {
      type: DataTypes.STRING,
      allowNull: false
    },
    cam_mm_sensor_w: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.0'
    },
    cam_mm_sensor_h: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.0'
    },
    cam_um_sensor_pitch_w: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.0'
    },
    cam_um_sensor_pitch_h: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.0'
    },
    cam_d1: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.0'
    },
    cam_d2: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.0'
    },
    cam_d3: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.0'
    },
    cam_d4: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.0'
    },
    cam_d5: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.0'
    }
  }, {
    tableName: 'cameras'
  });
};
