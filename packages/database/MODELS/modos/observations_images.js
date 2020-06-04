/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('observations_images', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    observation_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'observations',
        key: 'id'
      },
      unique: true
    },
    image_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'images',
        key: 'id'
      }
    }
  }, {
    tableName: 'observations_images'
  });
};
