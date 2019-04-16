module.exports = (sequelize, Sequelize) => {
  const records = sequelize.define('records', {
    fullname: {
      type: Sequelize.STRING
    },
    record_name: {
      type: Sequelize.STRING
    },
    pat_addr: {
    	type: Sequelize.STRING
    },
    doc_addr: {
    	type: Sequelize.STRING
    },
    note: {
      type: Sequelize.STRING
    },
    record_addr: {
      type: Sequelize.STRING

    } 
  });
  const register = sequelize.define('register',{
    reg_addr: {
      type: Sequelize.STRING
    },
    contract_addr: {
      type: Sequelize.STRING
    }
  })
  const tables = {};
  tables.register = register;
  tables.records =  records;
  return tables;
}
