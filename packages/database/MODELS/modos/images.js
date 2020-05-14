/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('images', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    urn: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    uri: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    url: {
      type: DataTypes.TEXT,
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
    exif_image_width_px: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exif_image_height_px: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    exif_focal_length: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    exif_focal_length_35mm: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    exif_make: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    exif_model: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    exif_create_date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    exif_modify_date: {
      type: DataTypes.DATE,
      allowNull: true
    },
    gps_version_id: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    gps_longitude_ref: {
      type: DataTypes.CHAR,
      allowNull: false,
      defaultValue: 'N'
    },
    gps_longitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    gps_latitude_ref: {
      type: DataTypes.CHAR,
      allowNull: false,
      defaultValue: 'E'
    },
    gps_latitude: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    gps_altitude_ref: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    gps_altitude: {
      type: DataTypes.REAL,
      allowNull: false
    },
    gps_datestamp: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    gps_timestamp: {
      type: DataTypes.TIME,
      allowNull: true
    },
    gps_satellites: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    gps_measure_mode: {
      type: DataTypes.CHAR,
      allowNull: false,
      defaultValue: '3'
    },
    gps_dop: {
      type: DataTypes.REAL,
      allowNull: false
    },
    gps_img_direction_ref: {
      type: DataTypes.CHAR,
      allowNull: false
    },
    gps_img_direction: {
      type: DataTypes.DOUBLE,
      allowNull: false
    },
    gps_map_datum: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'WGS-84'
    },
    gps_processing_method: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'GPS'
    },
    gps_differential: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    gps_position_error: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: '50'
    },
    position: {
      type: DataTypes.ENUM(),
      allowNull: false
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
