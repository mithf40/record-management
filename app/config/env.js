const env = {
  database: 'testdb',
  username: 'root',
  password: 'abcd1234',
  host: 'localhost',
  // port: '',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
 
module.exports = env;
