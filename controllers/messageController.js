const JWT = require('jsonwebtoken'),
bcrypt = require('bcrypt'),
{ message } = require('../models'),
{ JWT_SECRET } = require('../config/secret');

//Dev
const faker = require('faker');


module.exports = {
createComment: (req, res) => {


    message.create({

    }).then(function (message) {


    }).catch(function (error) {


    });


},

//issue note - when selecting message table, userId and commentId was automatically added to query by sequelize
//this was due to association in model
//message.belongsTo(models.comment,{onDelete: 'NOACTION'});  from message model
//user.hasMany(models.message,{onDelete: 'CASCADE',onUpdate:'CASCADE'}); from user model
//by delete these from model fixes the issue but there may be side affect
//so for now best approach is to select only availaable attributes instead of selecting all fields

//testing purpose
all:(req,res)=>{


    
    var wheres = {}
    var orders = [];
    
    req.query.sender ? wheres.sender = req.query.sender : null;
    req.query.receiver ? wheres.receiver = req.query.receiver : null;
    if(req.query.newest){
        let newest = [];
        newest.push('createdAt');
        newest.push('DESC');
        orders.push(newest);
    }
    message.findAll({
        attributes: ['id', 'sender', 'receiver', 'postId', 'businessId','createdAt'],
        where:wheres,
        order: orders
    }).then((messages)=>{
        
        
        res.json(messages);
    })
}

};




//https://stackoverflow.com/questions/9321225/using-dynamic-search-parameters-with-sequelize-js

//sample

/*
exports.select = function(req, res){
    console.log('=> GET | Obtener peliculas'.bold.get);
    db.Pelicula
            .findAndCountAll({
                limit : req.query.limit,
                offset : req.query.offset,
                where : req.query.p ? [req.query.p.KEY + " = ?", req.query.p.VAL] : null
            })
            .success(function(resp){
                console.log(JSON.stringify(resp.rows, null, 4).bold.get);
                res.json({peliculas : resp.rows, meta : { total : resp.count}});
            });
}

*/