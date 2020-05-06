/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('observations', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
      defaultValue: true
    },
    has_description: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    position: {
      type: DataTypes.ENUM(),
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'observations'
  });
};
