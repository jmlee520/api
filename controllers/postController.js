const JWT = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    { post } = require('../models'),
    { JWT_SECRET } = require('../config/secret');

//Dev
const faker = require('faker');

module.exports = {
    readPost: (req, res) => {

        //req.params ex) :id
        //req.query  ex) ?key=value&key=value      
        
        // for pagination
        let limit = 10;   // number of records per page
        let offset = 0;

        //by region
        let wheres = {};
        let orders = [];
        
        //wheres
        req.params.region ? wheres.region = req.params.region : null
        req.query.availability ? wheres.availability = req.query.availability : null
        req.query.property_type ? wheres.property_type = req.query.property_type : null
        req.query.room_type ? wheres.room_type = req.query.room_type : null
        req.query.for ? wheres.for = req.query.for : null
        req.query.city ? wheres.city = req.query.city : null
        //req.query.state ? wheres.state = req.query.state : null //since it will have region at first place
        req.query.zipcode ? wheres.zipcode = req.query.zipcode : null
        req.query.gender ? wheres.gender = req.query.gender : null
        req.query.lease_type ? wheres.lease_type = req.query.lease_type : null
        req.query.con_smoking ? wheres.con_smoking = req.query.con_smoking : null
        req.query.con_pet ? wheres.con_pet = req.query.con_pet : null
        req.query.con_parking ? wheres.con_parking = req.query.con_parking : null

        //order by
        //by default put cheapest first //needs to be done in client
        if(req.query.price){
            let array = [];
            array.push('price');
            array.push(req.query.price);//DESC or ASC(default)
            orders.push(array);
        }
        if(req.query.newest){
            let array = [];
            array.push('createdAt');
            array.push('DESC');
            orders.push(array);
        }
        if(req.query.likes){
            let array = [];
            array.push('likes');
            array.push('DESC');
            orders.push(array);
        }

        //pagination
        post.findAndCountAll({
            where:wheres
        })
        .then((data) => {
          let page = req.params.page;      // page number
          let pages = Math.ceil(data.count / limit);
              offset = limit * (page - 1);
          post.findAll({
            attributes: ['id', 'price', 'desc', 'availability','region','state'],
            where:wheres,
            limit: limit,
            offset: offset,
            order:orders
            //$sort: { id: 1 }
          })
          .then((posts) => {
            res.status(200).json({'result': posts, 'count': data.count, 'pages': pages});
          });

          //reset
          wheres = {};
          orders = [];


        })
        .catch(function (error) {
              res.status(500).send('Internal Server Error');
          });


    },
    createPost: (req, res) => {
//req.body        
//req.user - passportjs stores passed obj in req.user
//var userId = req.user.id
var businessId = null;
if(req.user.isBusiness){
    business.find({where:{userId:req.user.id}}).then(business=>{ businessId = business.id});
}
        post.create({
            
           
            userId: req.body.userId,
            businessId: businessId,
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
            pictures: req.body.pictures, //currently this is json type field,instead of storing json, this can have lookup table
            createdAt: new Date().getTime(),
            updatedAt: new Date().getTime()
        }).then(function (user) {

            res.json(user);

        }).catch(function (error) {

            res.status(500).send('Internal Server Error');

        });


    },
    updatePost: (req, res) => {
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
            //createdAt: keeping original date when it was first created
            updatedAt: new Date().getTime()
        }).then(function (user) {

            res.status(200).json(user);

        }).catch(function (error) {

            res.status(500).send('Internal Server Error'+error);

        });
    },
    uploadPhoto: (req, res) => {
       
    },
    deletePost: (req, res) => {
        post.destroy({where:{userId:req.params.id},cascade:true});
    },
    readDetailPost: (req, res) => {
        post.findById(req.params.postid).then((post)=>{
            res.status(200).json(post);
        }).catch((error)=>{
            res.status(500).send('Internal Server Error'+ error);
        })
     },
    //testing purpose
     all:(req,res)=>{
         post.findAll().then((posts)=>{
             res.json(posts);
         })
     }

};
