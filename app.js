//Production
const   express     = require('express'),
        bodyParser  = require('body-parser'),
        path        = require('path'),
        env         = require('./config/env');

const   app         = express();
const   PORT        = env.PORT;
const client = require('./config/redis');

//Development
const   volleyball  = require('volleyball');//server logger


//Import Routes
const   userRouters = require('./routes/userRouters')
        adminRouters = require('./routes/adminRouters'),
        commentRouters = require('./routes/commentRouters'),
        postRouters = require('./routes/postRouters');
        messageRouters = require('./routes/messageRouters');



// Middleware
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true})); //study more on this
//app.use(express.static(path.join(__dirname,'public')));


// Middleware-dev
app.use(volleyball); //delete when production env


//Routes
app.use('/users', userRouters);
app.use('/posts', postRouters);
app.use('/comments', commentRouters);
app.use('/messages',messageRouters);
app.use('/admin', adminRouters);


// Server
const server = app.listen(PORT, function(){
    console.log(`api running on port ${server.address().port}`);

});


