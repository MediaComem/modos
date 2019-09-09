'use strict';

module.exports = (sequelize, DataTypes) => {

  const Profile = sequelize.define('profile', {

    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
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
  },
    {
      validate: {
        bothHelpersOrNone() {
          if ((this.helper === null) !== (this.helperFrequency === null)) {
            throw new Error('Helper frequency is required when a helper is specified');
          }
        }
      },
      sequelize
    });

  Profile.associate = function (models) {
    Profile.belongsTo(models.user);
  };

  return Profile;
};
