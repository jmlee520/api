'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key: 'id'
        },
        allowNull:false,
        unique:false
      },
      postId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'posts',
          key: 'id'
        },
        onUpdate:'CASCADE',
        onDelete: 'CASCADE',
        allowNull:false,
        unique:true
      },
      comment: {
        type: Sequelize.TEXT
      },
      report: {
        type: Sequelize.INTEGER
      },
      likes: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('comments');
  }
};