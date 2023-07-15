/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
*/


var Message = require('../../entity/message.js');


//Cria construtor
function ValidatorFactory() {

}


//Define as funções da classe
ValidatorFactory.prototype.checkBody = (req) => {
    //req.sanitize('name').trim();
    
    var errors = []
    var message;

    var Geral       = require('../../function/geral.js');
    var geral       = new Geral();

    if((req.method == "POST") || (req.method == "PUT")){
        if(!req.body){
            const params = {
                code:     400,
                message:  'Body must not be null',
                response: '',
                location: 'controller.validators.validatorFactory',
                param:    'body',
                value:    req.body
            };

            message = new Message(params);
            errors.push(message);
        }
    }
    

    // *************************************************
    // Validação do id
    // *************************************************
    if((req.method == "PUT") || (req.method == "DELETE")){
        var id = 0;
        if(req.method == "PUT") 
             id = req.body.id;
        else id = req.params.id;

        var erro = geral.validateInteger(id);
        switch (erro) {
            case 1: {
                const params = {
                    code:     400,
                    message:  'O id deve ser informado',
                    response: '',
                    location: 'controller.validators.validatorFactory',
                    param:    'id',
                    value:    id
                };
        
                message = new Message(params);
                errors.push(message);
    
                break;
            }
            case 2: {
                const params = {
                    code:     400,
                    message:  'O id deve conter somente número',
                    response: '',
                    location: 'controller.validators.validatorFactory',
                    param:    'id',
                    value:    id
                };
    
                message = new Message(params);
                errors.push(message);
    
                break;
            }
            case 3: {
                const params = {
                    code:     400,
                    message:  'O id deve ser um inteiro',
                    response: '',
                    location: 'controller.validators.validatorFactory',
                    param:    'id',
                    value:    id
                };
    
                message = new Message(params);
                errors.push(message);
    
                break;
            }
        } // fim switch (erro) {
    } // fim if((req.method == "PUT") || (req.method == "DELETE")){    
    
    return errors;
}

//Module.exports é o objeto que será retornado pelo 'require', nesse caso é a função construtora
module.exports = ValidatorFactory