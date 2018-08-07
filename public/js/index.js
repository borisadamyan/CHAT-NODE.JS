var socket = io();

socket.on('connect', function ()  {
  console.log('Connected to Server');
});
socket.on('disconnect', function () {
  console.log('Disconnected from Server');
});


socket.on('newMessage', function (message) {
  console.log(message);
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${message.from} ${formatedTime}: ${message.text}`);
  $('#messages').append(li);
});

  socket.on('newLocationMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var li = $('<li></li>');
    var a = $('<a target="_blank">My current Location</a>');
    li.text(`${message.from} ${formatedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);
  });

 $('#message-form').on('submit', function (e) {
   e.preventDefault();
   var messageTextbox = $('[name=message]');
   socket.emit('createMessage', {
     from:'User',
     text: messageTextbox.val()
   }, function () {
     messageTextbox.val('');
   });
 });

 var locationButton = $('#send-location');
  locationButton.on('click', function () {
   if(!navigator.geolocation){
     return alert('Geolocation not supported by your browser');
   }
   locationButton.attr('disabled', 'disabled').text('Sending location...');

   navigator.geolocation.getCurrentPosition(function (position){
     locationButton.removeAttr('disabled').text('Send location');
     socket.emit('createLocation', {
       latitude: position.coords.latitude,
       longitude: position.coords.longitude
     });
   }, function (err) {
     locationButton.removeAttr('disabled');
     alert('Unable to fetch location').text('Send location');
   })
 });