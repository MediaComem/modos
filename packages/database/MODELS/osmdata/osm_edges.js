/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('osm_edges', {
    ogc_fid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    u: {
      type: DataTypes.STRING,
      allowNull: true
    },
    v: {
      type: DataTypes.STRING,
      allowNull: true
    },
    key: {
      type: DataTypes.STRING,
      allowNull: true
    },
    osmid: {
      type: DataTypes.STRING,
      allowNull: true
    },
    highway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    oneway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    length: {
      type: DataTypes.STRING,
      allowNull: true
    },
    from: {
      type: DataTypes.STRING,
      allowNull: true
    },
    to: {
      type: DataTypes.STRING,
      allowNull: true
    },
    maxspeed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    surface: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bicycle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    cycleway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    access: {
      type: DataTypes.STRING,
      allowNull: true
    },
    foot: {
      type: DataTypes.STRING,
      allowNull: true
    },
    motor_vehicle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    width: {
      type: DataTypes.STRING,
      allowNull: true
    },
    service: {
      type: DataTypes.STRING,
      allowNull: true
    },
    incline: {
      type: DataTypes.STRING,
      allowNull: true
    },
    smoothness: {
      type: DataTypes.STRING,
      allowNull: true
    },
    crossing: {
      type: DataTypes.STRING,
      allowNull: true
    },
    footway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tactile_paving: {
      type: DataTypes.STRING,
      allowNull: true
    },
    horse: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tracktype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    motorcycle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vehicle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bridge: {
      type: DataTypes.STRING,
      allowNull: true
    },
    layer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    sidewalk: {
      type: DataTypes.STRING,
      allowNull: true
    },
    noexit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tunnel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    wheelchair: {
      type: DataTypes.STRING,
      allowNull: true
    },
    handrail: {
      type: DataTypes.STRING,
      allowNull: true
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    step_count: {
      type: DataTypes.STRING,
      allowNull: true
    },
    railway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    train: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kerb: {
      type: DataTypes.STRING,
      allowNull: true
    },
    geom: {
      type: DataTypes.ENUM(),
      allowNull: true
    }
  }, {
    tableName: 'osm_edges'
  });
};
