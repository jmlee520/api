'use strict';
module.exports = function(sequelize, DataTypes) {
  var business = sequelize.define('business', {
    userId: DataTypes.INTEGER,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    phone: DataTypes.STRING,
    fax: DataTypes.STRING,
    cell: DataTypes.STRING,
    desc: DataTypes.TEXT,
    business_name: DataTypes.STRING,
    business_type: DataTypes.STRING
  });

  business.associate = function (models) {
    business.belongsTo(models.user,{onDelete: 'NOACTION'});
    business.hasMany(models.post,{onDelete: 'SETNULL'});
    business.hasMany(models.message,{onDelete: 'CASCADE',onUpdate:'CASCADE'});

};

  return business;
};