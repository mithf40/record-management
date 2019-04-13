module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('user', {
    fullname: {
      type: Sequelize.STRING
    },
    ethaddr: {
      type: Sequelize.STRING
    },
    contact_info: {
    	type: Sequelize.STRING
    },
    address: {
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
  const tables = {}
  tables.register = register;
  tables.User =  User;
  return tables;
}
