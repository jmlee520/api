'use strict';
module.exports = function (sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    ip: DataTypes.STRING,
    phone: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    isBusiness: DataTypes.BOOLEAN,
    allowance: DataTypes.INTEGER
  });
  user.associate = function (models) {
    user.hasMany(models.post, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    user.hasMany(models.comment, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
    user.hasOne(models.business, { onDelete: 'CASCADE', onUpdate: 'CASCADE' });
  };
  return user;
};