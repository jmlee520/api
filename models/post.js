'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    userId: DataTypes.UUID,
    businessId: DataTypes.UUID,
    region: DataTypes.STRING,
    desc: DataTypes.TEXT,
    propertyType: DataTypes.STRING,
    roomType: DataTypes.STRING,
    for: DataTypes.STRING,
    addressOne: DataTypes.STRING,
    addressTwo: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipCode: DataTypes.STRING,
    country: DataTypes.STRING,
    deposit: DataTypes.STRING,
    price: DataTypes.STRING,
    leasePerMonth: DataTypes.STRING,
    leasePerDay: DataTypes.STRING,
    gender: DataTypes.STRING,
    edu: DataTypes.TEXT,
    floorLevel: DataTypes.STRING,
    utility: DataTypes.STRING,
    furnished: DataTypes.STRING,
    bathroom: DataTypes.STRING,
    trans: DataTypes.STRING,
    leaseType: DataTypes.STRING,
    propertyArea: DataTypes.STRING,
    noRooms: DataTypes.STRING,
    noBathrooms: DataTypes.STRING,
    garage: DataTypes.BOOLEAN,
    conSmoking: DataTypes.BOOLEAN,
    conPet: DataTypes.BOOLEAN,
    conCook: DataTypes.BOOLEAN,
    conParking: DataTypes.STRING,
    conMeal: DataTypes.STRING,
    ac: DataTypes.BOOLEAN,
    availability: DataTypes.BOOLEAN,
    availableFrom: DataTypes.DATEONLY,
    availableTo: DataTypes.DATEONLY,
    rules: DataTypes.TEXT,
    localServices: DataTypes.STRING,
    localBusiness: DataTypes.STRING,
    locaAmenities: DataTypes.STRING,
    images: DataTypes.ARRAY(DataTypes.STRING)
  });
//TODO - terms and condition privacy policy - value must be html wraped as string
//secure - we do not sell information, how we use user information
//term - age restriction
// 
  post.associate = function (models) {
    post.belongsTo(models.user,{onDelete: 'NOACTION',onUpdate:'CASCADE'});
    post.belongsTo(models.business,{onDelete: 'SETNULL',onUpdate:'CASCADE'});
    post.hasMany(models.comment,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
    post.hasMany(models.message,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
};


  return post;
};

//TODO - acl - total views

// post table - add views(field)

//DataTypes.ARRAY(DataTypes.STRING);