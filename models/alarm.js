'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class alarm extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  alarm.init({
    time: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'alarm',
  });
  alarm.associate = function(models) {
    alarm.belongsTo(models.user, {
      foreignKey: 'user_id'
    });
    alarm.belongsTo(models.mission, {
      foreignKey: 'mission_id'
    });
    alarm.belongsTo(models.feed, {
      foreignKey: 'alarm_id'
    });
  };
  return alarm;
};