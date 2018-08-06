var socket = io();

socket.on('connect', function ()  {
  console.log('Connected to Server');
 /* socket.emit('createEmail', {
    to: 'jane@goo.com',
    text: 'Hello it is clinet'
  });*/
  socket.emit('createMessage', {
    from: 'user 2',
    text: ' hello Im user2'
  })
});
socket.on('disconnect', function () {
  console.log('Disconnected from Server');
});

/*socket.on('newEmail', function (email) {
  console.log('New Email', email);
});*/

socket.on('newMessage', function (message) {
  console.log(message);
});