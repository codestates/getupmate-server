'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  user.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    photo: DataTypes.BLOB 
  }, {
    sequelize,
    modelName: 'user',
  });
  user.associate = function(models) {
    user.hasMany(models.alarm, {
      foreignKey: 'user_id'
    });
    user.hasMany(models.feed, {
      foreignKey: 'user_id'
    });
  };
  return user;
};