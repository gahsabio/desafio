/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
*/


var Message = require('../../entity/message.js');


//Cria construtor
function BoletosValidator() {

}


//Define as funções da classe
BoletosValidator.prototype.checkBody = (req) => {
    //req.sanitize('name').trim();
    
    var errors = []
    var message;

    if((req.method == "POST") || (req.method == "PUT")){
        if(req.body.nome_sacado == ""){
            const params = {
                code:     400,
                message:  'O nome do sacado deve ser informado',
                response: '',
                location: 'controller.validators.boletos',
                param:    'nome_sacado',
                value:    req.body.nome_sacado
            };

            message = new Message(params);
            errors.push(message);
        }

        if(req.body.id_lote == ""){
            const params = {
                code:     400,
                message:  'O lote deve ser informado',
                response: '',
                location: 'controller.validators.boletos',
                param:    'id_lote',
                value:    req.body.id_lote
            };

            message = new Message(params);
            errors.push(message);
        }
    }
    
    return errors;
}

//Module.exports é o objeto que será retornado pelo 'require', nesse caso é a função construtora
module.exports = BoletosValidator