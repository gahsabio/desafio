/**
 * @author: Gabriel de Freitas Santos Sabio
 * @date: 13/07/2023
 * @desc: methods for get class from url
*/


function Geral() {
    // Formato da URL: /rest/classe/metodo
    // Obter a classe a partir da url chamada
    this.getClasse = 
        function (url) {
            const  palavras = url.split('/');
            const  classe  = palavras[2]; // a segunda posição contem o nome da classe
            return classe;
        }

    // Formato da URL: /rest/classe/metodo
    // Obter o método a partir da url chamada
    this.getMetodo = 
        function (url) {
            const  palavras = url.split('/');
            const  metodo  = palavras[3]; // a terceira posição contem o nome do método
            return metodo;
    }

    // Validação para atributo que deve conter numero inteiro
    // Retorno
    // 1: não foi informado
    // 2: não é um número
    // 3: não é um inteiro
    this.validateInteger = 
        function (id) {
            var erro    = 0;
            var regraNumero = /^[0-9\.]+$/;

            if(id == ""){
                erro = 1;
            }
            else {
                if (!id.match(regraNumero)) {
                    erro = 2;
                }
                else {
                    // não entendi. Pra mim tinha que ser4 negação
                    if (Number.isInteger(id)) {
                        erro = 3;
                    }    
                }
            }

            return erro;
    }

}
   
module.exports = Geral;