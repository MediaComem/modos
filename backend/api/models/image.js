'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const Image = sequelize.define('image', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    imagePath: {
      type: DataTypes.STRING,
      allowNull: false
    },

    width: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    height: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    boundingBoxX: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    boundingBoxY: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    boundingBoxW: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    boundingBoxH: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
    
  }, {});
  
  Image.associate = function(models) {
      Image.belongsTo(models.observation);
  };
  
  return Image;
};