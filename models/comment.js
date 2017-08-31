'use strict';
module.exports = function (sequelize, DataTypes) {
  var comment = sequelize.define('comment', {
    userId: DataTypes.INTEGER,
    postId: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    report: DataTypes.INTEGER,
    likes: DataTypes.INTEGER
  });
  comment.associate = function (models) {
    comment.belongsTo(models.user, { onDelete: 'NOACTION' });
    comment.belongsTo(models.post, { onDelete: 'NOACTION' });
    //comment.belongsTo(models.business);
  };
  return comment;
};