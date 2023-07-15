/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
*/
//methods for fetching mysql data


var Message = require('../../entity/message.js');


function BoletosPersistence() {
    // get all objects data 
    this.getAll = function (db) {
        return new Promise((resolve, reject) => {
            db.boletos
            .findAll({
                    //attributes: { exclude: ['id_lote'] },
                    include: [{model: db.lotes}],
                    // Add order conditions here....
                    order: [['nome_sacado', 'ASC']]  
            })
            .then(object => { resolve(object); }) // fim do then
            .catch(
                function ( erro ) {
                    const params = {
                        code:     500,
                        message:  'Erro ao buscar todos os boletos',
                        response: erro,
                        location: 'persistence.relational.boletos.getAll',
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
            db.boletos
            .findAll({where: {id: id} ,
                      attributes: { exclude: ['id_lote'] },
                      include:    [{ model: db.lotes }]
            })
            .then(object => { resolve(object); }) // fim do then
            .catch(
                function ( erro ) {
                    const params = {
                        code:     500,
                        message:  'Erro ao buscar boleto por id',
                        response: erro,
                        location: 'persistence.relational.boletos.getById',
                        param:    'id',
                        value:    id
                    };

                    var message = new Message(params);
                    reject(message);
                }
            ); // fim do catch
        }); // Closing of Promise block
    }; // this.getById = function (db, id) {


    // get quantity object by id
    this.getQttById = function (db, id) {
        return new Promise((resolve, reject) => {
            db.boletos
            .count({ where: { id: id } })
            .then((qtt) => { resolve(qtt); }) // fim do then
            .catch(
                function ( erro ) {
                    const params = {
                        code:     500,
                        message:  'Erro ao buscar quantidade de boletos por id',
                        response: erro,
                        location: 'persistence.relational.boletos.getQttById',
                        param:    'id',
                        value:    id
                    };

                    var message = new Message(params);
                    reject(message);
                }
            );// fim do catch
        }); // Closing of Promise block
    }; // fim this.getQttById



    // get quantity object by linha digitável
    this.getQttByName = function (db, nome, id) {
        return new Promise((resolve, reject) => {
            const { Op } = require("sequelize");
            db.boletos
            .count({ where: { 
                            linha_digitavel: nome,
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
                        message:  'Erro ao buscar quantidade de boleto por linha digitável',
                        response: erro,
                        location: 'persistence.relational.boletos.getQttByName',
                        param:    'linha_digitavel',
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
            db.boletos
            .create(object) 
            .then(function (addedRecord) {
                var params = {
                    code:     201,
                    message:  'OK',
                    response: 'Boleto incluído com sucesso',
                    location: 'persistence.relational.boletos.add',
                    param:    'boletos',
                    value:    object
                };

                var message = new Message(params);
                resolve(message);
            })
            .catch(function (err) {
                    var params = {
                        code:     500,
                        message:  'Erro ao incluir boleto',
                        response: err,
                        location: 'persistence.relational.boletos.add',
                        param:    'boletos',
                        value:    object
                    };

                    var message = new Message(params);
                    reject(message);
            });
        }); // Closing of Promise block
    }; // this.add = function (db, object) {

}

module.exports = BoletosPersistence;