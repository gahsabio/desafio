/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
*/

var Lotes = function(params) {
    this.id       = params.id;
    this.nome     = params.nome;
    this.ativo    = params.ativo;
}

module.exports = Lotes;