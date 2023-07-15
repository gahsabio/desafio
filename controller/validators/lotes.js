/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
*/


var Message = require('../../entity/message.js');


//Cria construtor
function LotesValidator() {

}


//Define as funções da classe
LotesValidator.prototype.checkBody = (req) => {
    //req.sanitize('name').trim();
    
    var errors = []
    var message;

    if((req.method == "POST") || (req.method == "PUT")){
        if(req.body.nome == ""){
            const params = {
                code:     400,
                message:  'O nome deve ser informado',
                response: '',
                location: 'controller.validators.lotes',
                param:    'nome',
                value:    req.body.nome
            };

            message = new Message(params);
            errors.push(message);
        }
    }
    
    return errors;
}

//Module.exports é o objeto que será retornado pelo 'require', nesse caso é a função construtora
module.exports = LotesValidator