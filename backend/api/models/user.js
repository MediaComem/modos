'use strict';

module.exports = (sequelize, DataTypes) => {
  
  const User = sequelize.define('user', {
    
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },

    pseudonym: {
      type: DataTypes.STRING,
      allowNull: false
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false
    },

    age: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

    gender: {
      type: DataTypes.STRING(1)
    },

    helper: {
      type: DataTypes.ENUM,
      values: [ 'white cane', 'walker', 'wheelchair' ]
    },

    helperFrequency: {
      type: DataTypes.INTEGER
    },

    mobility: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  
  User.associate = function(models) {
    User.belongsToMany(models.event, { through: 'userEvent' });
    User.hasMany(models.observation);
  };
  
  return User;
};