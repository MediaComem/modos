/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('edges', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    source: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    target: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    key: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    osmid: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    wplos: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '1.0'
    },
    plos: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '1.0'
    },
    avg_obstacle: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '1.0'
    },
    avg_curb_ramps: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '1.0'
    },
    avg_crosswalks: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '1.0'
    },
    avg_coatings: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '1.0'
    },
    avg_slopes: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '1.0'
    },
    avg_widths: {
      type: DataTypes.REAL,
      allowNull: false,
      defaultValue: '1.0'
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    length: {
      type: DataTypes.REAL,
      allowNull: true
    },
    width: {
      type: DataTypes.REAL,
      allowNull: true
    },
    surface: {
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
    lit: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tactile_paving: {
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
    sidewalk: {
      type: DataTypes.STRING,
      allowNull: true
    },
    footway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    foot: {
      type: DataTypes.STRING,
      allowNull: true
    },
    kerb: {
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
    highway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    access: {
      type: DataTypes.STRING,
      allowNull: true
    },
    oneway: {
      type: DataTypes.STRING,
      allowNull: true
    },
    service: {
      type: DataTypes.STRING,
      allowNull: true
    },
    maxspeed: {
      type: DataTypes.STRING,
      allowNull: true
    },
    noexit: {
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
    bridge: {
      type: DataTypes.STRING,
      allowNull: true
    },
    tunnel: {
      type: DataTypes.STRING,
      allowNull: true
    },
    layer: {
      type: DataTypes.STRING,
      allowNull: true
    },
    vehicle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    motor_vehicle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    motorcycle: {
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
    data_source: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'osm'
    },
    uuid: {
      type: DataTypes.UUIDV4,
      allowNull: false
    },
    geom: {
      type: DataTypes.ENUM(),
      allowNull: false
    }
  }, {
    tableName: 'edges'
  });
};
