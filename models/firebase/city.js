/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: methods for fetching mysql data
*/

'use strict'

module.exports = (ref) => {  
    
    var City = ref.child("cities");
 
    return City;

};