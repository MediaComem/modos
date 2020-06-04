/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('descriptions', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    class_label: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'ploscategories',
        key: 'id'
      }
    },
    text: {
      type: DataTypes.STRING,
      allowNull: true
    },
    obs_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'observations',
        key: 'id'
      }
    }
  }, {
    tableName: 'descriptions'
  });
};
