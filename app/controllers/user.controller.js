const db = require('../config/db.config.js');
const User = db.user;
 
// Save FormData - User to MySQL
exports.save = (req, res) => {
  console.log('Post a Patient: ' + JSON.stringify(req.body));
  
  User.create({
    fullname: req.body.fullname,
    ethaddr: req.body.ethaddr,
    contact_info: req.body.contact_info,
    address: req.body.address
  },{
    attributes: {include: ['fullname', 'ethaddr', 'contact_info', 'address']}
  }).then(user => {
    res.send(user);
  })
};
 
// Fetch all Users
exports.findAll = (req, res) => {
  console.log("Get All Customers");
  User.findAll({
    attributes: {include: ['id', 'fullname', 'ethaddr', 'contact_info', 'address']}
  }).then(users => {
     res.send(users);
  });
};
