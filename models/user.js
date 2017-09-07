'use strict';
module.exports = function(sequelize, DataTypes) {
  var user = sequelize.define('user', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    ip: DataTypes.STRING,
    phone: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    isBusiness: DataTypes.BOOLEAN,
    allowance: DataTypes.INTEGER,
    isAdmin: DataTypes.BOOLEAN,
  });

  user.associate = function (models) {
    // associations can be defined here
        user.hasMany(models.post,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
        user.hasMany(models.comment,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
        user.hasMany(models.message,{onDelete: 'CASCADE',onUpdate:'CASCADE'});//this makes query include userId field in message select query
        user.hasOne(models.business,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
    };
    
  return user;
};


