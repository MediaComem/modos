/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('internimages', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
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
    tableName: 'internimages'
  });
};
