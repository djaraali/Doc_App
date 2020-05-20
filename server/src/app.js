import 'babel-polyfill';
const express = require("express");
const app = express();

require('./loaders/dbconnect');
require('./loaders/modules')(app);
require('./loaders/cors')(app);

app.use('/static', express.static(__dirname + '../../files/'));

require('./loaders/routes')(app);
require('./loaders/errorHandling')(app);


module.exports = app;