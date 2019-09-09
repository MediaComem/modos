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

    gender: DataTypes.STRING(1),

    helper: {
      type: DataTypes.ENUM,
      values: ['white cane', 'walker', 'wheelchair'],
      defaultValue: null
    },

    helperFrequency: {
      type: DataTypes.INTEGER,
      defaultValue: null
    },

    mobility: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    validate: {
      bothHelpersOrNone() {
        if ((this.helper === null) !== (this.helperFrequency === null)) {
          throw new Error('Helper frequency is required when a helper is specified');
        }
      }
    },
    sequelize
  });

  User.associate = function (models) {
    User.belongsToMany(models.event, { through: 'userEvent' });
    User.hasMany(models.observation);
  };

  return User;
};