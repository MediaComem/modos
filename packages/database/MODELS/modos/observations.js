/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('observations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
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
    },
    has_image: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    has_description: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    position: {
      type: DataTypes.ENUM(),
      allowNull: false
    },
    in_range: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
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
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: sequelize.fn('now')
    }
  }, {
    tableName: 'observations'
  });
};
