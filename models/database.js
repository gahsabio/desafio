/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for define database

 * dataBaseType
 * 1 - MySQL
 * 2 - Firebase
 */


function DataBase() {
   
    this.getDataBase = 
    function (dataBaseType) {    
        return new Promise(function (resolve, reject) {
              console.log('database.js dataBaseType = ' + dataBaseType);
              if   (dataBaseType == 1) {
                    var database  = require('../models/relational/db.js');
                    resolve(database);
                  }
              else if   (dataBaseType == 2) {
                          var database = require('../models/firebase/db.js');
                          resolve(database);
                  }
                   else {
                        // Testar depois que alterar todas as chamadas a getDataBase
                        var params = {
                            code:     500,
                            message:  'Banco de dados inexistente',
                            response: '',
                            location: 'models.database.getDataBase',
                            param:    'dataBaseType',
                            value:    dataBaseType
                        };

                        var Message = require('../entity/message.js');
                        var message = new Message(params);
                        reject(message);
                   }
        }); // fim return new Promise(function (resolve, reject) {
    }; // fim function 
    
}
   
module.exports = DataBase;
   