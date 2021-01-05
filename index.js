const express = require('express');


const path = require('path');
require('dotenv').config();

const app = express();

// Servidor socket 

const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);

require('./sockets/socket');

//Publico

const publicPath = path.resolve( __dirname, 'public');
app.use( express.static(publicPath));

server.listen(process.env.PORT, (err) =>{
    if (err) throw new Error(err);
    console.log('Servidor en puerto ',process.env.PORT);
})