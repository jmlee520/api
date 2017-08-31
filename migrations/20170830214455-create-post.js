'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('posts', {
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
          key:'id'
        },
        onUpdate:'CAASCADE',
        onDelete: 'CAASCADE',
        allowNull:false,
        unique:false
      },
      businessId: {
        type: Sequelize.INTEGER,
        references:{
          model:'businesses',
          key:'id'
        },
        onUpdate:'CAASCADE',
        onDelete: 'CAASCADE',
        allowNull:true,
        unique:true
      },
      availability: {
        type: Sequelize.BOOLEAN
      },
      available_from: {
        type: Sequelize.DATEONLY
      },
      available_to: {
        type: Sequelize.DATEONLY
      },
      desc: {
        type: Sequelize.TEXT
      },
      property_type: {
        type: Sequelize.STRING
      },
      room_type: {
        type: Sequelize.STRING
      },
      for: {
        type: Sequelize.STRING
      },
      address_1: {
        type: Sequelize.STRING
      },
      address_2: {
        type: Sequelize.STRING
      },
      city: {
        type: Sequelize.STRING
      },
      state: {
        type: Sequelize.STRING
      },
      zipcode: {
        type: Sequelize.STRING
      },
      country: {
        type: Sequelize.STRING
      },
      deposit: {
        type: Sequelize.STRING
      },
      price: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.STRING
      },
      edu: {
        type: Sequelize.TEXT
      },
      floor_level: {
        type: Sequelize.STRING
      },
      utility: {
        type: Sequelize.STRING
      },
      internet: {
        type: Sequelize.STRING
      },
      furnished: {
        type: Sequelize.STRING
      },
      bathroom: {
        type: Sequelize.STRING
      },
      trans: {
        type: Sequelize.STRING
      },
      lease_type: {
        type: Sequelize.STRING
      },
      property_area: {
        type: Sequelize.STRING
      },
      no_rooms: {
        type: Sequelize.STRING
      },
      no_bathrooms: {
        type: Sequelize.STRING
      },
      garage: {
        type: Sequelize.BOOLEAN
      },
      con_smoking: {
        type: Sequelize.BOOLEAN
      },
      con_pet: {
        type: Sequelize.BOOLEAN
      },
      con_cook: {
        type: Sequelize.BOOLEAN
      },
      con_parking: {
        type: Sequelize.STRING
      },
      con_meal: {
        type: Sequelize.STRING
      },
      ac: {
        type: Sequelize.BOOLEAN
      },
      rules: {
        type: Sequelize.TEXT
      },
      likes: {
        type: Sequelize.INTEGER
      },
      report: {
        type: Sequelize.INTEGER
      },
      local_services: {
        type: Sequelize.STRING
      },
      local_business: {
        type: Sequelize.STRING
      },
      loca_amenities: {
        type: Sequelize.STRING
      },
      pictures: {
        type: Sequelize.JSON
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
    return queryInterface.dropTable('posts');
  }
};