/**
 * @author: Gabriel de Freitas Santos Sabio
 * @date: 13/07/2023
 * @desc: methods for fetching mysql data
*/

const Error = function(params) {
    
    this.code     = params.code;
    this.message  = params.message;
    this.response = params.response;
    this.location = params.location;
    this.param    = params.param;
    this.value    = params.value;

}

module.exports = Error;