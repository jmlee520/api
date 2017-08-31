API

Initial set up

- npm install --save express body-parser pg pg-hstore sequelize passport passport-local passport-jwt express-sessions(or client-sessions(only for cookie)) (bcrypt //faster(need environment configuration(seems window need more steps))  bcryptjs //slower) jsonwebtoken axio(ajax module) joi(validator)

- npm install --save-dev faker sequelize-cli (volleyball)or(morgan) bluebird  

sequelize-cli
- sequelize //this command will show options
- sequelize init

* strict sequence - order of model creation must be in this order(user->business->post->comment) due to foreign key relation

- sequelize model:create --name user --attributes email:string:unique,password:string,ip:string:unique,phone:string,firstname:string,lastname:string,isBusiness:boolean,allowance:integer

- sequelize model:create --name business --attributes userId:integer:notnull:unique,address_1:string,address_2:string,city:string,state:string,zipcode:string,phone:string,fax:string,cell:string,desc:text,business_name:string,business_type:string

- sequelize model:create --name post --attributes userId:integer:notnull,businessId:integer,region:string,availability:boolean,available_from:dateonly,available_to:dateonly,desc:text,property_type:string,room_type:string,for:string,address_1:string,address_2:string,city:string,state:string,zipcode:string,country:string,deposit:string,price:string,gender:string,edu:text,floor_level:string,utility:string,internet:string,furnished:string,bathroom:string,trans:string,lease_type:string,property_area:string,no_rooms:string,no_bathrooms:string,garage:boolean,con_smoking:boolean,con_pet:boolean,con_cook:boolean,con_parking:string,con_meal:string,ac:boolean,rules:text,likes:integer,report:integer,local_services:string,local_business:string,loca_amenities:string,pictures:JSON

- sequelize model:create --name comment --attributes userId:integer:notnull,postId:integer:notnull,comment:text,report:integer,likes:integer

//hold for creating region table
- sequelize model:create --name region --attributes name:string

Association 
- model files
    user

    user.associate = function (models) {
        user.hasMany(models.post,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
        user.hasMany(models.comment,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
        user.hasOne(models.business,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
    };

    comment

    comment.associate = function (models) {
        comment.belongsTo(models.user,{onDelete: 'NOACTION'});
        comment.belongsTo(models.post,{onDelete: 'NOACTION'});
        //comment.belongsTo(models.business);
    };

    business

    business.associate = function (models) {
        business.belongsTo(models.user,{onDelete: 'NOACTION'});
        business.hasMany(models.post,{onDelete: 'SETNULL'});
    };

    post

    post.associate = function (models) {
        post.belongsTo(models.user,{onDelete: 'NOACTION',onUpdate:'CASCADE'});
        post.belongsTo(models.business,{onDelete: 'SETNULL',onUpdate:'CASCADE'});
        post.hasMany(models.comment,{onDelete: 'CASCADE',onUpdate:'CASCADE'});
    };


//hold, this might need for future
    region
        region.belongsTo(models.post);

In model file to add association
auto generated function structure is not correct due to deprecated features by sequelize

//old way that will be included in your generated model file
module.exports = function(sequelize, DataTypes) {
  var nameofmodel = sequelize.define('nameofmodel', {
    ...model attributes
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return nameofmodel;
};
//The right way to set associations in model files
module.exports = function(sequelize, DataTypes) {
  var nameofmodel = sequelize.define('nameofmodel', {
    ...model attributes
  });
  
  nameofmodel.associate = function (models) {
    // associations can be defined here
  };
  return nameofmodel;
};

- migration files
  add references to theses fields

  business

      userId: {
        type: Sequelize.INTEGER,
        references:{
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
        allowNull:false,
        unique: true
      }

  post

      userId: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete: 'CASCADE',
        allowNull:false,
        unique:false
      },
      businessId: {
        type: Sequelize.INTEGER,
        references:{
          model:'businesses',
          key:'id'
        },
        onUpdate:'CASCADE',
        onDelete: 'CASCADE',
        allowNull:true,
        unique:true
      },
  
  comment

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


In migration file
To add array, manualy add column
there was an error due to array type error by sequelize, current picture field datatype changed to json from array.
another option is to create picture table

queryInterface.addColumn(
  'nameOfAnExistingTable',
  'nameOfTheNewAttribute',
  Sequelize.ARRAY(Sequelize.DECIMAL)
)

Seed

- sequelize seed:create --name nameOfSeed //this task is only necessary when seed is required


Migration
after model(and migrate) files created execute migration

- sequelize db:migrate


============================================================================================================
Folder structure

config
- all configuration files

controllers
- business logics

middleware
- factory,service,helper

migrations
- migration files

models
- model files

public
- may be deleted if not needed

routes
- router files connecting controller and middleware

seeders
- only for development

views
- future feature for CMS system for admin
- for admin view 

.gitignore
  node_modules
  seeders

===========================================================================================================
Modules
- Dependencies
    bcrypt(for production) bcryptjs(can be used for development)
    body-parser
    express
    jsonwebtoken
    passport
    passport-jwt
    passport-local
    pg
    pg-hstore
    sequelize
  
- devDependencies
    bluebird
    faker
    sequelize-cli
    volleyball

===========================================================================================================
TODO
- Server Side Pagination



===========================================================================================================
Sequelize Example Code

migrations/model1.js
model2Id: {
  type: Sequelize.INTEGER,
  references: {
    model: 'model2',
    key: 'id'
  },
},

models/model1.js
model1.associate = function (models) {
  model1.belongsTo(models.model2);
};

In migration file, references must be set (MANUALY) according to table relationship

migrations/project_order.js
module.exports = {
  up: function (queryInterface, Sequelize) {
    return queryInterface.createTable('product_orders',
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        productId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'products',
            key: 'id'
          },
          allowNull: false
        },
        orderId: {
          type: Sequelize.INTEGER,
          references: {
            model: 'orders',
            key: 'id'
          },
          allowNull: false
        }
        createdAt: Sequelize.DATE,
        updatedAt: Sequelize.DATE,
      }
  )},
down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable('product_orders')
  }
};

models/order.js
order.associate = function (models) {
  order.belongsToMany(models.product, { through: 'product_order', as: 'product' });
};
models/product.js
product.associate = function (models) {
  product.belongsToMany(models.order, { through: 'product_order', as: 'order' });
};