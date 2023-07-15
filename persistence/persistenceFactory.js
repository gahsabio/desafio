/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data

var globals    = require('../models/global.js');
var persistence;
var DataBase   = require('../models/database.js');
var dataBase   = new DataBase();
var Message    = require('../entity/message.js');

function PersistenceFactory() {

    this.getPersistence = 
    function (classe) {    
          return new Promise(function (resolve, reject) {
              console.log ('========================================');
              console.log ('persistenceFactory ' + classe);
              console.log ('========================================');
            
              if   (globals.dataBaseType == 1) {                    
                    Persistence = require('./relational/' + classe + '.js');
                    persistence = new Persistence();
                    resolve(persistence);
                  }
              else if   (globals.dataBaseType == 2) {
                        /*firebase ainda não possui o model personagem*/
                        Persistence = require('./firebase/' + classe + '.js');          
                        persistence = new Persistence();
                        resolve(persistence);
                  }
                   else {
                        const params = {
                            code:     500,
                            message:  'Banco de dados inexistente',
                            response: '',
                            location: 'persistence.persistenceFactory.getPersistence',
                            param:    'dataBaseType',
                            value:    dataBaseType
                        };

                        var message = new Message(params);
                        reject(message);
                   }
        }); 
    };

    /*
    this.getPersistence()
        .then((data) => {
            persistence = data;
        });
    */
        
    // get all objects data 
    this.getAll = function (classe) {
        return new Promise((resolve, reject) => {
            this.getPersistence(classe)
            .then ((data) => { persistence = data})
            .catch(function ( erro ) { reject(erro); } );    

            dataBase.getDataBase(globals.dataBaseType)
            .then((db) => {
                persistence.getAll(db)
                .then  ((data) => {
                    resolve(data);
                })
                .catch ((erro) => { 
                    const params = {
                        code:     500,
                        message:  'Erro ao buscar todos os objetos (' + classe + ')',
                        response: erro,
                        location: 'persistence.persistenceFactory.getAll',
                        param:    '',
                        value:    ''
                    };

                    var message = new Message(params);
                    reject(message);
                })
            })
            .catch (function ( erro ) { reject(erro); } )
        });
    }; // this.getAll = function (classe) {


    //   get object by id
    this.getById = function (id, classe) {
        return new Promise((resolve, reject) => {
            this.getPersistence(classe)
            .then ((data) => { persistence = data})
            .catch(function ( erro ) { reject(erro); } );    

            dataBase.getDataBase(globals.dataBaseType)
            .then((db) => {
                persistence.getById(db, id)
                .then  ((data) => {
                    let retorno;
                    data.forEach(object => {
                        retorno = object;
                    }) 
                    if (retorno) {
                        resolve(data);
                    }
                    else {
                        const params = {
                            code:     400,
                            message:  'Objeto não encontrado para o id informado',
                            response: '',
                            location: 'persistence.persistenceFactory.getById (' + classe + ')',
                            param:    'id',
                            value:    id
                        };

                        var message = new Message(params);
                        reject(message);
                    }
                }) 
                .catch ((erro) => { 
                    const params = {
                        code:     500,
                        message:  'Erro ao buscar objeto por id',
                        response: erro,
                        location: 'persistence.persistenceFactory.getById (' + classe + ')',
                        param:    'id',
                        value:    id
                    };

                    const message = new Message(params);
                    reject(message);
                })
            })
            .catch (function ( erro ) { reject(erro); } )
        });
    }; // fim this.getById = function (id, classe) {


    // get object by name
    this.getByName = function (nome, classe) {
        return new Promise((resolve, reject) => {
            this.getPersistence(classe)
            .then ((data) => { persistence = data})
            .catch(function ( erro ) { reject(erro); } );    

            dataBase.getDataBase(globals.dataBaseType)
            .then((db) => {
                persistence.getByName(db, nome)
                .then  ((data) => {
                    let retorno;
                    data.forEach(object => {
                        retorno = object;
                    }) 
                    if (retorno) {
                        resolve(data);
                    }
                    else {
                        const params = {
                            code:     400,
                            message:  'Objeto não encontrado para o nome informado',
                            response: '',
                            location: 'persistence.persisteceFactory.getByName',
                            param:    'nome',
                            value:    nome
                        };

                        var message = new Message(params);
                        reject(message);
                    }
                }) 
                .catch ((erro) => { 
                    const params = {
                        code:     500,
                        message:  'Erro ao buscar objeto por nome',
                        response: erro,
                        location: 'persistence.persistenceFactory.getByName',
                        param:    'nome',
                        value:    nome
                    };

                    var message = new Message(params);
                    reject(message);
                })
            })
            .catch (function ( erro ) { reject(erro); } )
        });
    }; // fim this.getByName


    // // get object by idiomaId
    // this.getByIdioma = function (idiomaId, classe) {
    //     return new Promise((resolve, reject) => {
    //         this.getPersistence(classe)
    //         .then ((data) => { persistence = data})
    //         .catch(function ( erro ) { reject(erro); } );    

    //         dataBase.getDataBase(globals.dataBaseType)
    //         .then((db) => {
    //             console.log('PERSISTENCEFACTORY ' + idiomaId);
    //             persistence.getByIdioma(db, idiomaId)
    //             .then  ((data) => {
    //                 let retorno;
    //                 data.forEach(object => {
    //                     retorno = object;
    //                 }) 
    //                 if (retorno) {
    //                     resolve(data);
    //                 }
    //                 else {
    //                     const params = {
    //                         code:     400,
    //                         message:  'Objeto não encontrado para o idioma informado',
    //                         response: '',
    //                         location: 'persistence.persistenceFactory.getByIdioma (' + classe + ')',
    //                         param:    'idiomaId',
    //                         value:    idiomaId
    //                     };

    //                     var message = new Message(params);
    //                     reject(message);
    //                 }
    //             }) 
    //             .catch ((erro) => { 
    //                 const params = {
    //                     code:     500,
    //                     message:  'Erro ao buscar objeto por idioma',
    //                     response: erro,
    //                     location: 'persistence.persistenceFactory.getByIdioma (' + classe + ')',
    //                     param:    'idiomaId',
    //                     value:    idiomaId
    //                 };

    //                 const message = new Message(params);
    //                 reject(message);
    //             })
    //         })
    //         .catch (function ( erro ) { reject(erro); } )
    //     });
    // }; // fim this.getByIdioma = function (idiomaId, classe) {


    // get quantity object by id
    this.getQttById = function (id, classe) {
        return new Promise((resolve, reject) => {
            this.getPersistence(classe)
            .then ((data) => { persistence = data})
            .catch(function ( erro ) { reject(erro); } );    
    
            dataBase.getDataBase(globals.dataBaseType)
            .then((db) => {    
                persistence.getQttById(db, id)
                .then  ((data)  =>        { resolve(data); } )
                .catch (function ( erro ) { reject (erro); } )
            })
            .catch (function ( erro ) { reject(erro); } )
        });
    }; // fim this.getQttById
   

    // get quantity object by name
    this.getQttByName = function (nome, id, classe) {
        return new Promise((resolve, reject) => {
            this.getPersistence(classe)
            .then ((data) => { persistence = data})
            .catch(function ( erro ) { reject(erro); } );    

            dataBase.getDataBase(globals.dataBaseType)
            .then((db) => {    
                persistence.getQttByName(db, nome, id)
                .then  ((data)  =>        { resolve(data); } )
                .catch (function ( erro ) { reject (erro); } )
            })
            .catch (function ( erro ) { reject(erro); } )
        });
    }; // fim this.getQttByName
   

    // // get quantity object by idiomaId
    // this.getQttByIdioma = function (idiomaId, id, classe) {
    //     return new Promise((resolve, reject) => {
    //         this.getPersistence(classe)
    //         .then ((data) => { persistence = data})
    //         .catch(function ( erro ) { reject(erro); } );    

    //         dataBase.getDataBase(globals.dataBaseType)
    //         .then((db) => {    
    //             persistence.getQttByIdioma(db, idiomaId, id)
    //             .then  ((data)  =>        { resolve(data); } )
    //             .catch (function ( erro ) { reject (erro); } )
    //         })
    //         .catch (function ( erro ) { reject(erro); } )
    //     });
    // }; // fim this.getQttByIdioma


     // verify is object by name exists
     this.isNameInUse = function (nome, id, classe) {
         return new Promise((resolve, reject) => {
             this.getPersistence(classe)
             .then ((data) => { persistence = data})
             .catch(function ( erro ) { reject(erro); } );    

             dataBase.getDataBase(globals.dataBaseType)
             .then((db) => {
                 persistence.isNameInUse(db, nome, id)
                 .then((data)  =>         { resolve(data); })
                 .catch(function ( erro ) { reject (erro); })
             })
             .catch (function ( erro ) { reject(erro); } )
         });// fim do promise
      }; // fim this.isNameInUse


    // // verify is object by idiomaId exists
    // this.isIdiomaInUse = function (idiomaId, id, classe) {
    //     return new Promise((resolve, reject) => {
    //         this.getPersistence(classe)
    //         .then ((data) => { persistence = data})
    //         .catch(function ( erro ) { reject(erro); } );    

    //         dataBase.getDataBase(globals.dataBaseType)
    //         .then((db) => {
    //             persistence.isIdiomaInUse(db, idiomaId, id)
    //             .then((data)  =>         { resolve(data); })
    //             .catch(function ( erro ) { reject (erro); })
    //         })
    //         .catch (function ( erro ) { reject(erro); } )
    //     });// fim do promise
    //  }; // fim this.isIdiomaInUse


    this.add = function (object, classe) {
        return new Promise((resolve, reject) => {
            this.getPersistence(classe)
            .then ((data) => { persistence = data})
            .catch(function ( erro ) { reject(erro); } );    
            
            dataBase.getDataBase(globals.dataBaseType)
            .then((db) => {    
                persistence.add(db, object)
                .then  ((data)  =>        { resolve(data); } )
                .catch (function ( erro ) { reject (erro); } )
            })
            .catch (function ( erro ) { reject(erro); } )
        });
    }; // this.add = function (object, res) {


    // this.update = function (object, classe) {
    //     return new Promise((resolve, reject) => {
    //         this.getPersistence(classe)
    //         .then ((data) => { persistence = data})
    //         .catch(function ( erro ) { reject(erro); } );    
            
    //         dataBase.getDataBase(globals.dataBaseType)
    //         .then((db) => {    
    //             persistence.update(db, object)
    //             .then  ((data)  =>        { resolve(data); } )
    //             .catch (function ( erro ) { reject (erro); } )
    //         })
    //         .catch (function ( erro ) { reject(erro); } )
    //     });
    // }; // this.update = function (object, res) {


    // this.deleteById = function (id, classe) {
    //     return new Promise((resolve, reject) => {
    //         this.getPersistence(classe)
    //         .then ((data) => { persistence = data})
    //         .catch(function ( erro ) { reject(erro); } );    

    //         dataBase.getDataBase(globals.dataBaseType)
    //         .then((db) => {    
    //             persistence.deleteById(db, id)
    //             .then  ((data)  =>        { resolve(data); } )
    //             .catch (function ( erro ) { reject (erro); } )
    //         })
    //         .catch (function ( erro ) { reject(erro); } )
    //     });
    // }; // this.deleteById = function (id, classe) {

}

module.exports = PersistenceFactory;
