/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data


var Message = require('../../entity/message.js');


function LotesPersistence() {
    // get all objects data 
    this.getAll = function (db) {
        return new Promise((resolve, reject) => {
            db.lotes
            .findAll({
                    include: [ {model: db.boletos,          as: "boletosPorLote" }
                    ],
                    // Add order conditions here....
                    order: [['nome', 'ASC']]  
            })
            .then(object => { resolve(object); }) // fim do then
            .catch(
                function ( erro ) {
                    const params = {
                        code:     500,
                        message:  'Erro ao buscar todos os lotes',
                        response: erro,
                        location: 'persistence.relational.lotes.getAll',
                        param:    '',
                        value:    ''
                    };

                    var message = new Message(params);
                    reject(message);
                }
            ); // fim do catch
        }); // Closing of Promise block
    }; // this.getAll = function (db) {


    // get object by id
    this.getById = function (db, id) {
        // get id as parameter to passing into query and return filter data
        return new Promise((resolve, reject) => {
            db.lotes
            .findAll({where: {id: id},
                      include: [{model: db.boletos,          as: "boletosPorLote"}
                      ] 
            })
            .then(object => { resolve(object); }) // fim do then
            .catch(
                function ( erro ) {
                    const params = {
                        code:     500,
                        message:  'Erro ao buscar lote por id',
                        response: erro,
                        location: 'persistence.relational.lotes.getById',
                        param:    'id',
                        value:    id
                    };

                    var message = new Message(params);
                    reject(message);
                }
            ); // fim do catch
        }); // Closing of Promise block
    }; // this.getById = function (db, id) {
    
    
    // get object by name
    this.getByName = function (db, nome) {
        // get id as parameter to passing into query and return filter data
        return new Promise((resolve, reject) => {
            db.lotes
            .findAll({where: {nome: nome},
                      include: [{model: db.boletos,          as: "boletosPorLote"}
                      ]
            })
            .then( (object) => { resolve(object); }) // fim do then
            .catch(
                function ( erro ) {
                    const params = {
                        code:     500,
                        message:  'Erro ao buscar lote por nome',
                        response: erro,
                        location: 'persistence.relational.lotes.getByName',
                        param:    'nome',
                        value:    nome
                    };

                    var message = new Message(params);
                    reject(message);
                }
            ); // fim do catch
        }); // Closing of Promise block
    }; // this.getByName = function (db, nome) {


    // get quantity object by id
    this.getQttById = function (db, id) {
        return new Promise((resolve, reject) => {
            db.lotes
            .count({ where: { id: id } })
            .then((qtt) => { resolve(qtt); }) // fim do then
            .catch(
                function ( erro ) {
                    const params = {
                        code:     500,
                        message:  'Erro ao buscar quantidade de lotes por id',
                        response: erro,
                        location: 'persistence.relational.lotes.getQttById',
                        param:    'id',
                        value:    id
                    };

                    var message = new Message(params);
                    reject(message);
                }
            );// fim do catch
        }); // Closing of Promise block
    }; // fim this.getQttById


    // get quantity object by name
    this.getQttByName = function (db, nome, id) {
        return new Promise((resolve, reject) => {
            const { Op } = require("sequelize");
            db.lotes
            .count({ where: { 
                            nome: nome,
                            id: { [Op.ne]: id }
                            /*
                            // Exemplo de or
                            [Op.or]: [ { id: { [Op.ne]: id }}, 
                                       { id: null }
                                     ]
                            */
            } })
            .then((qtt) => { resolve(qtt); } ) // fim do then
            .catch(
                function ( erro ) {
                    const params = {
                        code:     500,
                        message:  'Erro ao buscar quantidade de lote por nome',
                        response: erro,
                        location: 'persistence.relational.lotes.getQttByName',
                        param:    'nome',
                        value:    nome
                    };

                    var message = new Message(params);
                    reject(message);
                }
            ); // fim do catch
        }); // Closing of Promise block
    }; // fim this.getQttByName


    // verify is object by name exists
    this.isNameInUse = function (db, nome, id) {
        return new Promise((resolve, reject) => {
            var isNameInUse = false;

            this.getQttByName(db, nome, id)
            .then((qtt) => {
                    if   (qtt == 0)
                         isNameInUse = false;
                    else isNameInUse = true;

                    resolve(isNameInUse);
            }) // fim do then
            .catch(function ( erro ) { reject (erro); }) // fim to catch
        });   // Closing of Promise block
    }; // fim this.isNameInUse

    
    this.add = function (db, object) {
        // get object as parameter to passing into query and return filter data
        return new Promise((resolve, reject) => { 
            db.lotes
            .create(object) 
            .then(function (addedRecord) {
                var params = {
                    code:     201,
                    message:  'OK',
                    response: 'Lote incluído com sucesso',
                    location: 'persistence.relational.lotes.add',
                    param:    'lotes',
                    value:    object
                };

                var message = new Message(params);
                resolve(message);
            })
            .catch(function (err) {
                    var params = {
                        code:     500,
                        message:  'Erro ao incluir lote',
                        response: err,
                        location: 'persistence.relational.lotes.add',
                        param:    'lotes',
                        value:    object
                    };

                    var message = new Message(params);
                    reject(message);
            });
        }); // Closing of Promise block
    }; // this.add = function (db, object) {

}

module.exports = LotesPersistence;