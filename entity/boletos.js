/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
*/

var Boletos = function(params) {
    this.id              = params.id;
    this.nome_sacado     = params.nome_sacado;
    this.id_lote         = params.id_lote;
    this.valor           = params.valor;
    this.linha_digitavel = params.linha_digitavel;
    this.ativo           = params.ativo;
}

module.exports = Boletos;