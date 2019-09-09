'use strict';

module.exports = (sequelize, DataTypes) => {

  const Description = sequelize.define('description', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    obstacle: {
      type: DataTypes.ENUM,
      values: ['sidewalk', 'crosswalk', 'pavement', 'slope', 'accessibility', 'other'],
      allowNull: false
    },

    freeText: DataTypes.STRING,

    impact: {
      type: DataTypes.INTEGER,
      allowNull: false
    }

  }, {});

  Description.associate = function (models) {
    Description.belongsTo(models.observation);
  };

  return Description;
};
