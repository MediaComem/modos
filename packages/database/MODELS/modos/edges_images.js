/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('edges_images', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    edge_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'edges',
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
    tableName: 'edges_images'
  });
};
