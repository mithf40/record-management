const db = require('../config/db.config.js');
const User = db.user;
const register = db.register;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// Save FormData - User to MySQL
exports.save = (req, res) => {
  console.log('Post a Patient: ' + JSON.stringify(req.body));
  // console.log(req.body);
  
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
  // console.log(req.query);
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

exports.findContractAddress = (req, res) => {
  console.log(req.query);
  console.log("I am alive!!");
  register.findAll({
    attributes : {include: ['contract_addr']},
    where: {
      reg_addr : req.query.pat_addr
    }
    }).then(users =>{
    console.log(users[0].contract_addr);
    res.send(users);
  });

};
