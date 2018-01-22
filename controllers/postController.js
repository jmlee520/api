const JWT = require('jsonwebtoken'),
    bcrypt = require('bcrypt'),
    { post, user } = require('../models'),
    { JWT_SECRET } = require('../config/secret'),
    jimp = require('jimp'),
    formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    client = require('../config/redis');

//Dev
const faker = require('faker');

var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};


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
        if (req.query.price) {
            let array = [];
            array.push('price');
            array.push(req.query.price);//DESC or ASC(default)
            orders.push(array);
        }
        if (req.query.newest) {
            let array = [];
            array.push('createdAt');
            array.push('DESC');
            orders.push(array);
        }
        if (req.query.likes) {
            let array = [];
            array.push('likes');
            array.push('DESC');
            orders.push(array);
        }

        //pagination
        post.findAndCountAll({
            where: wheres
        })
            .then((data) => {
                let page = req.params.page;      // page number
                let pages = Math.ceil(data.count / limit);
                offset = limit * (page - 1);
                post.findAll({
                    attributes: ['id', 'price', 'desc', 'availability', 'region', 'state', 'userId'],//TODO - include user object by include
                    where: wheres,
                    limit: limit,
                    offset: offset,
                    order: orders,
                    include: [{
                        model: user
                    }]
                    //$sort: { id: 1 }
                })
                    .then((posts) => {
                        res.status(200).json({ 'result': posts, 'count': data.count, 'pages': pages });
                    }).catch(function (error) {
                        res.send(error);
                    });

                //reset
                wheres = {};
                orders = [];

            })
            .catch(function (error) {
                res.send(error);
                //  res.status(500).send('Internal Server Error');
            });


    },
    createPost: (req, res) => {
        //req.body        
        //req.user - passportjs stores passed obj in req.user
        //var userId = req.user.id
        var businessId = null;
        if (req.user.isBusiness) {
            business.find({ where: { userId: req.user.id } }).then(business => { businessId = business.id });
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
            local_services: req.body.local_services,
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
            local_services: req.body.local_services,
            local_business: req.body.local_business,
            loca_amenities: req.body.loca_amenities,
            pictures: req.body.pictures,
            //createdAt: keeping original date when it was first created
            updatedAt: new Date().getTime()
        }).then(function (user) {

            res.status(200).json(user);

        }).catch(function (error) {

            res.status(500).send('Internal Server Error' + error);

        });
    },
    upload: (req, res) => {


        if (path.join(__dirname, '../uploads/' + req.params.postid)) deleteFolderRecursive(path.join(__dirname, '../uploads/' + req.params.postid));
        fs.mkdirSync(path.join(__dirname, '../uploads/' + req.params.postid));
        //fs.mkdirSync(path.join(__dirname,'../uploads/'+req.params.userid+'s3'));
        var form = new formidable.IncomingForm();

        form.uploadDir = './uploads/' + req.params.postid;
        form.keepExtensions = true;
        form.maxFieldsSize = 3 * 1024 * 1024; // 3mb
        form.multiples = true;

        form.parse(req, (err, fields, files) => {
            if (err) {
                res.json({
                    result: 'failed',
                    data: {},
                    message: `cannot upload images Error: ${err}`
                });
            }

            var isTypeValid = false;

            for (var i = 0; i < files.images.length; i++) {
                var file = files.images;
                //console.log(file[i].type);
                if (file[i].type == jimp.MIME_BMP || file[i].type == jimp.MIME_JPEG || file[i].type == jimp.MIME_PNG) {
                    isTypeValid = true;
                    console.log('validation passed')
                } else {
                    console.log("file type not supported");
                    res.send('file not supported');
                    deleteFolderRecursive(path.join(__dirname, '../uploads/' + req.params.postid));
                    isTypeValid = false;
                    break;
                }

            };

            if (isTypeValid) {
                var imagesArray = fs.readdirSync(path.join(__dirname, '../uploads/' + req.params.postid));
                console.log("imagesArray ");

                

                // let imagesProcessed = 0;
                imagesArray.forEach(function (images, index, array) {
                    
                    
                    jimp.read(path.join(__dirname, '../uploads/' + req.params.postid + '/' + images), function (err, image) {
                        if (err) {
                            console.log('error occured: image processing' + err);
                            deleteFolderRecursive(path.join(__dirname, '../uploads/' + req.params.postid));
                        }
                        else {
                            image.resize(100, 100).quality(70).write(path.join(__dirname, '../uploads/' + req.params.postid + '/s3/' + req.params.postid + '_sm_' + index + '.jpg'));
                            image.resize(200, 200).quality(70).write(path.join(__dirname, '../uploads/' + req.params.postid + '/s3/' + req.params.postid + '_md_' + index + '.jpg'));
                            image.resize(300, 300).quality(70).write(path.join(__dirname, '../uploads/' + req.params.postid + '/s3/' + req.params.postid + '_lg_' + index + '.jpg'));
                            console.log('image processing');
                            //imagesProcessed++; 
                        }

                        if (index === array.length - 1) {
                            var imageToS3 = fs.readdirSync(path.join(__dirname, '../uploads/' + req.params.postid + '/s3'));
                            imageToS3.forEach(function (image, index, array) {
                                //console.log(image);
                                //console.log(image.split('.')[0].slice(-4));//[0].slice(0,-5));
                                
                                
                                  client.hset(req.params.postid, image.split('.')[0].slice(-4), image);

                                  if (index === array.length - 1) {
                                      client.hgetall(req.params.postid,function(err, result){
                                          console.log(result);
                                         res.json(result);
                                      });
                                  }
                                
                            });

                        }
                    }).then((res)=>{

                    //resize images
                    
                    
                      return data;  
                    }).then((passedData)=>{
                        //s3
                        //for loop

                    }).catch((err)=>{
                        console.log(err);
                    });

                });


                //res.json(files);
                console.log('delete folder');
            }
        });
  
    },
    deletePost: (req, res) => {
        post.destroy({ where: { userId: req.params.id }, cascade: true });    
    },
    readDetailPost: (req, res) => {
        post.findById(req.params.postid).then((post) => {
            res.status(200).json(post);
        }).catch((error) => {
            res.status(500).send('Internal Server Error' + error);
        })
    },
    views: (req, res) => {
        //increase per request
    },
    //testing purpose
    all: (req, res) => {
        post.findAll({
            include: [{
                model: user

            }]
        }).then((posts) => {
            res.json(posts);
        })
    }


};
