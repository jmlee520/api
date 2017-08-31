const JWT = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    { post } = require('../models'),
    { JWT_SECRET } = require('../config/secret');

//Dev
const faker = require('faker');

module.exports = {
    search: (req, res) => {

        //req.params
        //req.query
        

        if (req.query.state) {
            post.find({ where: { state: req.query.state } }).then(posts => { res.json(posts) });
        } else if (req.query.availability) {
            post.find({ where: { availability: true } }).then(posts => { res.json(posts) });
        }
        if (req.query.userid) {
            post.find({ where: { userId: req.query.userid } }).then(posts => { res.json(posts) });
        } else {

            post.findAll().then(posts => { res.json(posts) });

        }


    },
    createPost: (req, res) => {
//req.body        
//req.user
//var userId = req.user.id
var businessId = null;
if(req.user.isBusiness){
    business.find({where:{userId:req.user.id}}).then(business=>{ businessId = business.id});
}
        post.create({
            
           
            userId: req.body.userId,
            businessId: req.body.businessId,
            availability: req.body.availability,
            available_from: req.body.available_from,
            available_to: req.body.available_to,
            desc: req.body.desc,
            property_type: req.body.property_type,
            room_type: req.body.room_type,
            for: req.body.for,
            address_1: req.body.address_1,
            address_2: req.body.address_2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            country: req.body.country,
            deposit: req.body.deposit,
            price: req.body.price,
            gender: req.body.gender,
            edu: req.body.edu,
            floor_level: req.body.floor_level,
            utility: req.body.utility,
            internet: req.body.internet,
            furnished: req.body.furnished,
            bathroom: req.body.bathroom,
            trans: req.body.trans,
            lease_type: req.body.lease_type,
            property_area: req.body.property_area,
            no_rooms: req.body.no_rooms,
            no_bathrooms: req.body.no_bathrooms,
            garage: req.body.garage,
            con_smoking: req.body.con_smoking,
            con_pet: req.body.con_pet,
            con_cook: req.body.con_cook,
            con_parking: req.body.con_parking,
            con_meal: req.body.con_meal,
            ac: req.body.ac,
            rules: req.body.rules,
            likes: req.body.likes,
            report: req.body.report,
            local_services:req.body.local_services,
            local_business: req.body.local_business,
            loca_amenities: req.body.loca_amenities,
            pictures: req.body.pictures,
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent()
        }).then(function (user) {

            res.json(user);

        }).catch(function (error) {

            res.send('error');

        });


    },
    editPost: (req, res) => {
        post.create({
            
           
            //userId: req.body.userId, should not be able to edit
            //businessId: req.body.businessId, should not be able to edit
            availability: req.body.availability,
            available_from: req.body.available_from,
            available_to: req.body.available_to,
            desc: req.body.desc,
            property_type: req.body.property_type,
            room_type: req.body.room_type,
            for: req.body.for,
            address_1: req.body.address_1,
            address_2: req.body.address_2,
            city: req.body.city,
            state: req.body.state,
            zipcode: req.body.zipcode,
            country: req.body.country,
            deposit: req.body.deposit,
            price: req.body.price,
            gender: req.body.gender,
            edu: req.body.edu,
            floor_level: req.body.floor_level,
            utility: req.body.utility,
            internet: req.body.internet,
            furnished: req.body.furnished,
            bathroom: req.body.bathroom,
            trans: req.body.trans,
            lease_type: req.body.lease_type,
            property_area: req.body.property_area,
            no_rooms: req.body.no_rooms,
            no_bathrooms: req.body.no_bathrooms,
            garage: req.body.garage,
            con_smoking: req.body.con_smoking,
            con_pet: req.body.con_pet,
            con_cook: req.body.con_cook,
            con_parking: req.body.con_parking,
            con_meal: req.body.con_meal,
            ac: req.body.ac,
            rules: req.body.rules,
            likes: req.body.likes,
            report: req.body.report,
            local_services:req.body.local_services,
            local_business: req.body.local_business,
            loca_amenities: req.body.loca_amenities,
            pictures: req.body.pictures,
            //createdAt: faker.date.recent(), keeping original date when it was first created
            updatedAt: faker.date.recent()
        }).then(function (user) {

            res.json(user);

        }).catch(function (error) {

            res.send('error');

        });
    },
    deletePost: (req, res) => {
        post.destroy({where:{userId:req.params.id},cascade:true});
    }

};
