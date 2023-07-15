/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: establish Mysql Connection.
*/
// establish Mysql Connection.

function MySQLConnect() {

  this.Sequelize = require('sequelize');

  this.pool      = null;
  
  // Init MySql Connection Pool
  this.init      = function() {

    this.pool = new this.Sequelize('xxxxxx', 'xxxxxx', 'xxxxxx', {
      host:    'xxxxxx.com.br',
      dialect: 'mysql',

    // this.pool = new this.Sequelize('audire', 'audire', 'Audire@2022', {
    //   host:    '10.102.50.55',
    //   dialect: 'mysql',
      logging: false,
      define: {
        timestamps: false
      },
      pool: {
        max: 10,
        min: 2,
        acquire: 30000,
        idle: 10000
      },
    
      // http://docs.sequelizejs.com/manual/tutorial/querying.html#operators
      // deprecated
      // operatorsAliases: false
    });

    this.pool
      .authenticate()
      .then(() => {
        console.log('Connection with MySQL has been established successfully.');
      })
      .catch(err => {
        console.error('Unable to connect to the database MySQL:', err);
      });

  };

}

module.exports = new MySQLConnect();