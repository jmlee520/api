'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    userId: DataTypes.UUID,
    postId: DataTypes.UUID,
    messageId:DataTypes.UUID,
    businessId:DataTypes.UUID,
    comment: DataTypes.TEXT
  });

  comment.associate = function (models) {
    // associations can be defined here
        comment.belongsTo(models.user,{onDelete: 'NOACTION'});
        comment.belongsTo(models.post,{onDelete: 'NOACTION'});
        comment.belongsTo(models.message,{onDelete: 'SETNULL'}); 
        //comment.belongsTo(models.business);
    };

  return comment;
};