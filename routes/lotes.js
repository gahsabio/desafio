/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: custom route for fetching data
*/

var   Controller = require('../controller/controllerFactory');
var   Geral      = require('../function/geral.js');
var   geral      = new Geral();

module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {
        //custom route for fetching data
        const controller = new Controller();
        

        // adding route for object, here app is express instance which provide use
        // get method for handling get request from http server. 
        app.get('/rest/lotes/getAll', function (req, res) {
            controller.getAll(res, geral.getClasse(req.url));
        });

 
        // here we gets id from request and passing to it object method.
        app.get('/rest/lotes/getById/:id/', function (req, res) {
            controller.getById(req.params.id, res, geral.getClasse(req.url));
        });


        // here we gets name from request and passing to it object method.
        app.get('/rest/lotes/getByName/:nome/', function (req, res) {
            controller.getByName(req.params.nome, res, geral.getClasse(req.url));
        });


        app.post('/rest/lotes/add', function (req, res) {
            controller.add(req, res, geral.getClasse(req.url));
        });

    }

};