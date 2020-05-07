/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('images', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    px_w: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    px_h: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    focal: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    uri: {
      type: DataTypes.STRING,
      allowNull: false
    },
    azim: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    tilt: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    roll: {
      type: DataTypes.DOUBLE,
      allowNull: false,
      defaultValue: '0.0'
    },
    data_source: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'mobapp'
    },
    license: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'copyright'
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'uploaded'
    },
    availability: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'privately-available'
    },
    eid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'edges',
        key: 'id'
      }
    },
    edist: {
      type: DataTypes.REAL,
      allowNull: false
    },
    snap_geom: {
      type: DataTypes.ENUM(),
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    cam_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'cameras',
        key: 'id'
      }
    },
    obs_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'observations',
        key: 'id'
      }
    },
    event_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'events',
        key: 'id'
      }
    }
  }, {
    tableName: 'images'
  });
};
