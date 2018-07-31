const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const  publicPath = path.join(__dirname, '../public'); //

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);
app.use(express.static(publicPath)); // connect to public/index.html

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
