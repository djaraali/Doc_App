require('dotenv').config();
const config = require('./config/config')
const http = require('http');
const app = require('./app');

const port = config.server.port || 3001;

const server = http.createServer(app);

server.listen(port, function(){
    console.log('Now listening for request on ' + port);
});