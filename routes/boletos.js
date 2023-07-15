/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: custom route for fetching data
*/

const ControllerClasse  = require('../controller/boletos');
const Controller        = require('../controller/controllerFactory');
var   Geral             = require('../function/geral.js');
var   geral             = new Geral();

module.exports = {
    //set up route configuration that will be handle by express server
    configure: function (app) {
        //custom route for fetching data
        const controllerClasse  = new ControllerClasse();
        const controller        = new Controller();


        // adding route for object, here app is express instance which provide use
        // get method for handling get request from http server.

        app.get('/rest/boletos/getAll', function (req, res) {
            controller.getAll(res, geral.getClasse(req.url));
        });

 
        // here we gets id from request and passing to it object method.
        app.get('/rest/boletos/getById/:id/', function (req, res) {
            controller.getById(req.params.id, res, geral.getClasse(req.url));
        });

        
        app.post('/rest/boletos/add', function (req, res) {
            controllerClasse.add(req, res, geral.getClasse(req.url));
        });


        // here we insert object from CSV.
        app.post('/rest/boletos/addCSV', function (req, res) {
            controllerClasse.addCSV(req, res, geral.getClasse(req.url));
        });
        

        // here we insert object from CSV.
        app.get('/rest/boletos/splitPDF', function (req, res) {
            controllerClasse.splitPDF(req);
        });


        app.get('/rest/boletos', function (req, res) {
            controllerClasse.print(req, res);
        });
    }

};