var socket = io();

socket.on('connect', function ()  {
  console.log('Connected to Server');

 /* socket.emit('createMessage', {
    from: 'user 2',
    text: ' hello Im user2'
  })*/
});
socket.on('disconnect', function () {
  console.log('Disconnected from Server');
});


socket.on('newMessage', function (message) {
  console.log(message);
});