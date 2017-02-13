//server.js
'use strict'
//first we import our dependencies…
var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var bodyParser = require('body-parser');
var Service = require('./model/services');
var Lodge = require('./model/lodges');
var Item = require('./model/items');
//and create our instances
var app = express();
var router = express.Router();
//set our port to either a predetermined port number if you have set 
//it up, or 3001
var port = process.env.API_PORT || 3001;
var mongo_url = 'mongodb://localhost:27017/mern-starter';

//db config -- REPLACE USERNAME/PASSWORD WITH YOUR OWN FROM MLAB!
mongoose.connect(mongo_url, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
  // feed some dummy data in DB.
  // dummyData();
});

//now we should configure the API to use bodyParser and look for 
//JSON data in the request body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/img", express.static(path.join(__dirname, 'img')));
//app.use(express.static(path.resolve(__dirname, './img')));
//app.use('/img', express.static(__dirname + '/img'));
//To prevent errors from Cross Origin Resource Sharing, we will set 
//our headers to allow CORS with middleware like so:
app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent services
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
//now we can set the route path & initialize the API
router.get('/', function(req, res) {
 res.json({ message: 'API Initialized!'});
});

//// SERVICES

//adding the /services route to our /api router
router.route('/services')
    //retrieve all services from the database
    .get(function(req, res) {
    //looks at our service Schema
        Service.find(function(err, services) {
            if (err)
            res.send(err);
            //responds with a json object of our database services.
            res.json(services)
        });
    })
    //post new service to the database
    .post(function(req, res) {
        var service = new Service();
        //body parser lets us use the req.body
        service.title = req.body.title;
        service.description = req.body.description;
        service.image = req.body.image,
        service.module = req.body.module,
        service.type = req.body.type,
        service.save(function(err) {
            if (err)
            res.send(err);
            res.json({ message: 'Service successfully added!' });
        });
 });

 router.route('/services/:module')
  .get(function(req, res){
    Service.find({module: req.params.module}, function(err, services){
      if(err)
        res.send(err);
      res.json(services)
    });
  });

 //Adding a route to a specific service based on the database ID
router.route('/services/:service_id')
//The put method gives us the chance to update our service based on the ID passed to the route
  .put(function(req, res) {
    Service.findById(req.params.service_id, function(err, service) {
      if (err)
        res.send(err);
      //setting the new author and text to whatever was changed. If nothing was changed
      // we will not alter the field.
      (req.body.title) ? service.title = req.body.title : null;
      (req.body.description) ? service.description = req.body.description : null;
      (req.body.image) ? service.image = req.body.image : null;
      (req.body.module) ? service.module = req.body.module : null;
      (req.body.type) ? service.type = req.body.type : null;
      //save service
      service.save(function(err) {
        if (err)
          res.send(err);
        res.json({ message: 'Image has been updated' });
      });
    });
  })
  //delete method for removing a service from our database
  .delete(function(req, res) {
    //selects the service by its ID, then removes it.
    Service.remove({ _id: req.params.service_id }, function(err, service) {
      if (err)
        res.send(err);
      res.json({ message: 'Service has been deleted' })
    })
  });

/// items
//adding the /services route to our /api router
router.route('/items')
    .get(function(req, res) {
        Item.find(function(err, items) {
            if (err)
              res.send(err);
            res.json(items)
        });
    })
    //post new service to the database
    .post(function(req, res) {
        var item = new Item();
        //body parser lets us use the req.body
        item.type = req.body.type;
        item.save(function(err) {
            if (err)
              res.send(err);
            res.json({ message: 'Item successfully added!' });
        });
 });

/// items by type
router.route('/items/:type')
  .get(function(req, res){
    Item.findOne({type: req.params.type}, function(err, items){
      if(err)
        res.send(err);
      res.json(items)
    });
  });

//// POSTS
//adding the /posts route to our /api router
router.route('/lodges')
    //retrieve all posts from the database
    .get(function(req, res) {
    //looks at our posts Schema
        Lodge.find(function(err, lodges) {
            if (err)
            res.send(err);
            //responds with a json object of our database posts.
            res.json(lodges)
        });
    })
    //post new post to the database
    .post(function(req, res) {
        var post = new Lodge();
        //body parser lets us use the req.body
        post.name = req.body.name;
        post.level = req.body.level;
        post.persons = req.body.persons,
        post.gender = req.body.gender,
        post.mail = req.body.mail,
        post.date = req.body.date,
        post.save(function(err) {
            if (err)
            res.send(err);
            res.json({ message: 'Post successfully added!' });
        });
 });


//Use our router configuration when we call /api
app.use('/api', router);

//starts the server and listens for requests
app.listen(port, function() {
 console.log(`api running on port ${port}`);
});