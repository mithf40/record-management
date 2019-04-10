module.exports = function(app) {
 
  var express = require("express");
  var router = express.Router();
  
    const users = require('../controllers/user.controller.js');
  
  var path = __basedir + '/static/';
  
  router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
  });
  
  app.get('/', (req,res) => {
    res.sendFile(path + "record.html");
  });
 
    // Save a User to MySQL
    app.post('/api/users/save', users.save);
 
    // Retrieve all Users
    app.get('/api/users/all', users.findAll);
  
  app.use("/",router);
 
  // app.use("*", (req,res) => {
  //   res.sendFile(path + "404.html");
  // });
}
