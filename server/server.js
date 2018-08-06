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
/*
  socket.emit('newMessage', {
    from: 'user1',
    text:'hello Im user1 ',
    createdAt: new Date().getTime()
  });*/

  socket.emit('fromAdmin', {
    from: 'Admin',
    text: 'Welcome to Chat App'
  });
  socket.broadcast.emit('newUserJoin', {
    from: 'Admin',
    text: 'New User joined',
    createdAt: new Date().getTime()
  });

  socket.on('createMessage', (newMessage) => {
    console.log('New Message', newMessage);
    io.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });
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
