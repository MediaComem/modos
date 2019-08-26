'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const Observation = sequelize.define('observation', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    }
    
  }, {});
  
  Observation.associate = function(models) {

  };
  
  return Observation;
};