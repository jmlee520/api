'use strict';
module.exports = function(sequelize, DataTypes) {
  var post = sequelize.define('post', {
    userId: DataTypes.INTEGER,
    businessId: DataTypes.INTEGER,
    region: DataTypes.STRING,
    availability: DataTypes.BOOLEAN,
    available_from: DataTypes.DATEONLY,
    available_to: DataTypes.DATEONLY,
    desc: DataTypes.TEXT,
    property_type: DataTypes.STRING,
    room_type: DataTypes.STRING,
    for: DataTypes.STRING,
    address_1: DataTypes.STRING,
    address_2: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    country: DataTypes.STRING,
    deposit: DataTypes.STRING,
    price: DataTypes.STRING,
    gender: DataTypes.STRING,
    edu: DataTypes.TEXT,
    floor_level: DataTypes.STRING,
    utility: DataTypes.STRING,
    internet: DataTypes.STRING,
    furnished: DataTypes.STRING,
    bathroom: DataTypes.STRING,
    trans: DataTypes.STRING,
    lease_type: DataTypes.STRING,
    property_area: DataTypes.STRING,
    no_rooms: DataTypes.STRING,
    no_bathrooms: DataTypes.STRING,
    garage: DataTypes.BOOLEAN,
    con_smoking: DataTypes.BOOLEAN,
    con_pet: DataTypes.BOOLEAN,
    con_cook: DataTypes.BOOLEAN,
    con_parking: DataTypes.STRING,
    con_meal: DataTypes.STRING,
    ac: DataTypes.BOOLEAN,
    rules: DataTypes.TEXT,
    likes: DataTypes.INTEGER,
    report: DataTypes.INTEGER,
    local_services: DataTypes.STRING,
    local_business: DataTypes.STRING,
    loca_amenities: DataTypes.STRING,
    pictures: DataTypes.JSON
  });

  post.associate = function (models) {
    post.belongsTo(models.user,{onDelete: 'NOACTION',onUpdate:'CASCADE'});
    post.belongsTo(models.business,{onDelete: 'SETNULL',onUpdate:'CASCADE'});
    post.hasMany(models.comment,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
    post.hasMany(models.message,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
};


  return post;
};