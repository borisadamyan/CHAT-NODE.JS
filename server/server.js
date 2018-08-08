const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const  publicPath = path.join(__dirname, '../public'); //
const {Users} = require('./utils/users');
const {Rooms} = require('./utils/rooms');
const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
var io = socketIO(server);
var users = new Users();
var rooms = new Rooms();

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
      return callback('Name and Room name are required')
    }
    rooms.addRoom(params.room);
    io.emit('updateRoomsList', rooms.getRoomsList(params.room));

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));



    socket.emit('newMessage', generateMessage('Admin', 'Welcome to Chat App'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));
    callback()
  });


  socket.on('createMessage', (newMessage, callback) => {
    var user = users.getUser(socket.id);
    if(user && isRealString(newMessage.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
    }
    callback();
    /*socket.broadcast.emit('newMessage', {
      from: newMessage.from,
      text: newMessage.text,
      createdAt: new Date().getTime()
    });*/
  });
  socket.on('createLocation', (coords) => {
    var user = users.getUser(socket.id);
    if(user){
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });


  socket.on('disconnect', (params, callback) => {
    var user = users.removeUser(socket.id);
    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));


      rooms.removeRoom(user.room);
      console.log('User', user.room);
      io.emit('updateRoomsList', rooms.getRoomsList());
    }
    console.log('User was disconnected');
  });

});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
