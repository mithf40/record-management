const db = require('../config/db.config.js');
const User = db.user;
const register = db.register;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
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

exports.register_user = (req, res) => {
  console.log("Registering new patient");
  register.create({
    reg_addr: req.body.reg_addr,
    contract_addr: req.body.contract_addr
  },{
    attributes: {include: ['reg_addr', 'contract_addr']}
  }).then(new_user => {
    console.log(new_user);
    res.send(new_user);
  });
};

// exports.get_contract = (req, res) => {
//   console.log("getting contract_addr");
//   register.findAll({
//     where: {
//       reg_addr: 
//     }
//   })
// };