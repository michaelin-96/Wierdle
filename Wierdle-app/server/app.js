var express = require('express');

require('dotenv').config();
const path = require("path");

// Router
var router = require('./routes.js');


var app = express();

// Set up listening port
app.set('port', 3000);

app.use(express.json());

app.use(express.static(path.join(__dirname, "../build")))

//Set up our routes
app.use('/wordle', router);

// If we are being run directly, run the server.
if(!module.parent) {
  app.listen(app.get('port'));
  console.log('Listening on', app.get('port'));
}