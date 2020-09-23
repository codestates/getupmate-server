'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feed extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  feed.init({
    text: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'feed',
  });
  feed.associate = function(models) {
    feed.belongsTo(models.user, {
      foreignKey: 'feed_id'
    });
    feed.hasOne(models.alarm, {
      foreignKey: 'alarm_id'
    });
    feed.hasOne(models.mission, {
      foreignKey: 'mission_id'
    });
  };
  return feed;
};