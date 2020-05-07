/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.ENUM(),
      allowNull: false,
      unique: true
    },
    gender: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    helper: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    helper_frequency: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    mobility: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    organization: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: 'private'
    },
    user_privileges: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'restricted'
    },
    googleid: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    facebookid: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    },
    letter: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    notifications: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    lang: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'FR'
    },
    is_validator: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    is_super_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    tableName: 'users'
  });
};
