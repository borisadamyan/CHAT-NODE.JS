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

 /* socket.emit('newEmail', {
      from: 'boramos@ya.ru',
      text: 'Hello it is me',
      creatAt: 123
  });*/

  socket.emit('newMessage', {
    from: 'user1',
    text:'hello Im user1 ',
    createdAt: new Date().getTime()
  });

 /* socket.on('createEmail', (newEmail) => {
    console.log('createEmail', newEmail)
  });*/


  socket.on('createMessage', (newMessage) => {
    console.log('New Message', newMessage)
  });


  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });

});

server.listen(port, () => {
  console.log(`Started on port ${port}`);
});
