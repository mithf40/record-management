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
  
  return User;
}
