const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage} = require('./utils/message');
const  publicPath = path.join(__dirname, '../public'); //

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);
app.use(express.static(publicPath)); // connect to public/index.html

io.on('connection', (socket) => {
  console.log('New user connected');
/*
  socket.emit('newMessage', {
    from: 'user1',
    text:'hello Im user1 ',
    createdAt: new Date().getTime()
  });*/

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

  socket.on('createMessage', (newMessage, callback) => {
    console.log('New Message', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback('This is from the server');
    /*socket.broadcast.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });*/
  });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
