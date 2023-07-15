/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: custom route for fetching data
*/

Persistence  = require('../persistence/persistenceFactory.js');

function ControllerFactory() {

    var persistence = new Persistence();


    // get all objects data 
    this.getAll = function (res, classe) {
        persistence.getAll(classe)
        .then  ((data) => { res.send  (JSON.parse(JSON.stringify(data))); } ) 
        .catch ((erro) => { res.status(erro.code).send(JSON.parse(JSON.stringify(erro))); } )
    }; // fim this.getAll = function (res, classe) {


    // get object by id 
    this.getById = function (id, res, classe) {
        persistence.getById(id, classe)
        .then  ((data) => { res.send  (JSON.parse(JSON.stringify(data))); } ) 
        .catch ((erro) => { res.status(erro.code).send(JSON.parse(JSON.stringify(erro))); } )
    }; // fim this.getById = function (id, res, classe) 


    // get object by name 
    this.getByName = function (nome, res, classe) {
        nomeAux = nome;

        persistence.getByName(nomeAux.trim().toUpperCase(), classe)
        .then  ((data) => { res.send  (JSON.parse(JSON.stringify(data))); } ) 
        .catch ((erro) => { res.status(erro.code).send(JSON.parse(JSON.stringify(erro))); } )
    }; // fim this.getByName = function (nome, res, classe) {


    // get quantity of objects by id 
    this.getQttById = function (id, res, classe) {
        persistence.getQttById(id, classe)
        .then((qtt) => {
            res.json({ qtde: qtt });
            console.log("Qtde de objetos com o id " + id + ": " + qtt);
        })
        .catch((erro) => { res.status(erro.code).send(JSON.parse(JSON.stringify(erro))); } );
    }; // fim this.getQttById = function (id, res, classe) {


    // get quantity of objects by name 
    this.getQttByName = function (nome, id, res, classe) {
        nomeAux = nome;

        persistence.getQttByName(nomeAux.trim().toUpperCase(), id, classe)
        .then((qtt) => {
            res.json({ qtde: qtt });
            console.log("Qtde de objetos com o nome " + nome + " id " + id + ": " + qtt);
        })
        .catch((erro) => { res.status(erro.code).send(JSON.parse(JSON.stringify(erro))); } );
    }; // fim this.getQttByName = function (nome, id, res, classe) {


    // add one object
    this.add = function (req, res, classe) {
        var allErrors       = [];
        var validator       = new (require('./validators/validatorFactory.js'))();
        var validatorClasse = new (require('./validators/' + classe + '.js'))();

        var Message         = require('../entity/message.js');

        Promise.all([
            new Promise((resolve, reject)=>{
                var errors  = validator.checkBody(req);
                if(errors.length > 0){
                    allErrors.push(errors);
                    resolve();
                }         
                else resolve();
            }),

            new Promise((resolve, reject)=>{
                var errors  = validatorClasse.checkBody(req);
                if(errors.length > 0){
                    allErrors.push(errors);
                    resolve();
                }         
                else resolve();
            }),
            
            new Promise((resolve, reject)=>{
                persistence.isNameInUse(req.body.nome, 0, classe)
                .then((data) => {
                    if (data) {
                        const params = {
                            code:     400,
                            message:  'Nome já está em uso',
                            response: '',
                            location: 'controller.controllerFactory.add',
                            param:    'nome',
                            value:    req.body.nome
                        };
                
                        var message = new Message(params);
                        allErrors.push(message);

                        resolve();
                    }    
                    else resolve();
                }) // fim do then
                /*
                .catch((erro) => { res.status(erro.code).send(JSON.parse(JSON.stringify(erro))); } );
                */
                .catch((erro) => { reject(erro) } );
            })
        ]).then(()=>{
            if (allErrors.length > 0){
                res.status(400).send(allErrors);
            } 
            else {
                var params = {
                    nome:     req.body.nome.trim().toUpperCase()
                }

                var Entity = require('../entity/' + classe + '.js');
                var entity = new Entity(params);
    
                persistence.add(entity, classe)
                .then  ((data) => { res.send  (JSON.parse(JSON.stringify(data))); } ) 
                .catch ((erro) => { res.status(erro.code).send(JSON.parse(JSON.stringify(erro))); } )
            }
        })
        // Acho que esse catch deve mudar
        .catch(reason=>{
            console.warn('Failed!', reason, ' ', allErrors);
            res.status(400).send(allErrors);
        });
    }; // fim this.add = function (req, res, classe) {

}

module.exports = ControllerFactory;