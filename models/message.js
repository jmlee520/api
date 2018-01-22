'use strict';
module.exports = function(sequelize, DataTypes) {
  var message = sequelize.define('message', {
    senderId: DataTypes.UUID,
    receiverId: DataTypes.UUID,
    postId: DataTypes.UUID,
    businessId: DataTypes.UUID
  });

  message.associate = function (models) {
    message.belongsTo(models.user,{onDelete: 'NOACTION'});
    message.belongsTo(models.post,{onDelete: 'NOACTION'});
    message.belongsTo(models.business,{onDelete: 'NOACTION'});
    message.belongsTo(models.comment,{onDelete: 'NOACTION'}); //this cause query to include commentId when selecting
};
  return message;
};

//images field => [{photo:{thumbNail:"a",midSize:"",original:"url here"},{photo:{thumbNail:"a"},{photo:{thumbNail:"a"}]

//simplopers.support@gmail.com
//simplopers.help@gmail.com
//simploprs@gmail.com - facebook account
//simplopers.com? 12/year

//google developer account
//facebook developer account