const db = require('../config/db.config.js');
const records = db.records;
const register = db.register;

const Sequelize = require('sequelize');
const Op = Sequelize.Op;
// Save FormData - User to MySQL
exports.save = (req, res) => {
  console.log('Saving Record: ' + JSON.stringify(req.body));
  // console.log(req.body);
  
  records.create({
    fullname: req.body.fullname,
    record_name: req.body.record_name,
    pat_addr: req.body.pat_addr,
    doc_addr: req.body.doc_addr,
    note: req.body.note,
    record_addr: req.body.record_addr
  },{
    attributes: {include: ['fullname', 'record_name', 'pat_addr', 'doc_addr', 'note', 'record_addr']}
  }).then(record => {
    res.send(record);
  })
};
 
// Fetch all Users
exports.findAll = (req, res) => {
  console.log("Get All patients");
  // console.log(req.query);
  records.findAll({
    attributes: {include: ['id', 'fullname', 'record_name', 'pat_addr', 'doc_addr', 'note']}
  }).then(record => {
     res.send(record);
  });
};

//Fetch all records of a user
exports.findSelected = (req, res) => {
  console.log("Get all records of a user");
  records.findAll({
    where : {pat_addr : req.query.patient}
  }).then(users => {
    // console.log(users);
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
    // console.log("registered "+new_user);
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

exports.find_record_addr = (req, res) => {
  records.findAll({
    attributes: {include: ['fullname', 'record_name', 'pat_addr', 'doc_addr', 'note', 'record_addr']},
    where: {record_name: req.query.record_name}
  }).then(rec => {
    console.log("record found "+rec);
    res.send(rec);
  });
};