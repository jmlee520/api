'use strict';
module.exports = function(sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    messageId:DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    report: DataTypes.INTEGER,
    likes: DataTypes.INTEGER
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