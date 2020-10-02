'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class follow extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  follow.init({
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'follow',
  });
  follow.associate = function(models) {
    follow.belongsTo(models.user, {
      foreignKey: 'my_id'
    });
    follow.belongsTo(models.user, {
      foreignKey: 'friend_id'
    });
  };
  return follow;
};