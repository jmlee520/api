'use strict';
module.exports = function(sequelize, DataTypes) {
  var business = sequelize.define('business', {
    userId: DataTypes.UUID,
    addressOne: DataTypes.STRING,
    addressOne: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    country: DataTypes.STRING,
    phone: DataTypes.STRING,
    fax: DataTypes.STRING,
    cell: DataTypes.STRING,
    desc: DataTypes.TEXT,
    businessName: DataTypes.STRING,
    businessType: DataTypes.STRING
  });

  business.associate = function (models) {
    business.belongsTo(models.user,{onDelete: 'NOACTION'});
    business.hasMany(models.post,{onDelete: 'SETNULL'});
    business.hasMany(models.message,{onDelete: 'CASCADE',onUpdate:'CASCADE'});

};

  return business;
};