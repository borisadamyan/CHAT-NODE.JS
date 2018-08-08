const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const  publicPath = path.join(__dirname, '../public'); //

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);
app.use(express.static(publicPath)); // connect to public/chat.html

io.on('connection', (socket) => {
  console.log('New user connected');
/*
  socket.emit('newMessage', {
    from: 'user1',
    text:'hello Im user1 ',
    createdAt: new Date().getTime()
  });*/

  socket.on('join', (params, callback) => {
    console.log('New Params', params.name, params.room);
    if(!isRealString(params.name) || !isRealString(params.room)){
      callback('Name and Room name are required')
    }



    socket.join(params.room);
    //socket.leave(params.room);

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback()
  });


  socket.on('createMessage', (newMessage, callback) => {
    console.log('New Message', newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback();
    /*socket.broadcast.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });*/
  });
  socket.on('createLocation', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
  });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
