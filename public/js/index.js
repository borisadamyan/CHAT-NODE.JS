var socket = io();

socket.on('connect', function ()  {
  console.log('Connected to Server');
});
socket.on('disconnect', function () {
  console.log('Disconnected from Server');
});


socket.on('newMessage', function (message) {
  console.log(message);
  var li = $('<li></li>');
  li.text(`${message.from}: ${message.text}`);
  $('#messages').append(li);
});

  socket.on('newLocationMessage', function (message) {
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current Location</a>');
    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
  });

 $('#message-form').on('submit', function (e) {
   e.preventDefault();
   socket.emit('createMessage', {
     from:'User',
     text: $('[name=message]').val()
   }, function () {

   });
 });

 var locationButton = $('#send-location');
  locationButton.on('click', function () {
   if(!navigator.geolocation){
     return alert('Geolocation not supported by your browser');
   }
   navigator.geolocation.getCurrentPosition(function (position){
     socket.emit('createLocation', {
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
     });
   }, function (err) {
     alert('Unable to fetch location');
   })
 });