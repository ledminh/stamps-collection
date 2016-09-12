var express = require('express');
var app = express();
var passport = require('passport');


//MONGOOSE
var data = require('./server/mongoose');

//CONFIGURE
require('./server/configure')(express, app, passport, data);

//SETTING ROUTE
require('./server/routes')(express, app, passport, data);

app.listen(8080);

console.log("App is listenning on PORT", 8080);
