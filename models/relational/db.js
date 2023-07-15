/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
 * Extraído de https://lorenstewart.me/2016/09/12/sequelize-table-associations-joins/
*/

'use strict'

//methods for fetching mysql data
const mysql     = require('../../connections/mysql/MySQLConnect');

// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db     = {};
db.Sequelize = mysql.Sequelize;
db.mysql     = mysql;

// initialize database connection
db.mysql.init();

//Models/tables

db.lotes             = require('./lotes.js')(db.mysql,           db.Sequelize);                   

db.boletos           = require('./boletos.js')(db.mysql,           db.Sequelize);

db.lotes.hasMany             (db.boletos,           {as:         'boletosPorLote', 
                                                     foreignKey: 'id_lote'});     

db.boletos.belongsTo           (db.lotes,            {foreignKey: 'id_lote',
                                                      targetKey:  'id'});                         
// False não altera as tabelas no banco de dados
db.mysql.pool.sync({alter:false});

module.exports = db;
