/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
*/

'use strict'

module.exports = (ref) => {  
    
    var State = ref.child("states");
 
    return State;

};