/**
 * @author: Gabriel de Freitas Santos Sábio
 * @date: 12/07/2023
 * @desc: Creating server using express.js
 * 
*/
var   express                     = require('express');
var   bodyparser                  = require('body-parser');
var   validator                   = require("express-validator");

var   routeLotes                  = require('./routes/lotes');
var   routeBoletos                = require('./routes/boletos');

// creating server instance
var   app                         = express();


// parsing JSON
app.use(bodyparser.json());

app.use(bodyparser.urlencoded({ extended : true}));

routeLotes.configure(app);
routeBoletos.configure(app);

//const port = 8001;
const port = process.env.PORT;

// Exemplo 01
const path = require('path');
app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'));
})

// listening application on port 8001
var server = app.listen(port, function(){
    console.log('Server Listening on port ' + server.address().port);
});
