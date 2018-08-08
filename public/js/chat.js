var socket = io();

function scrollToBottom () {
  //selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');
  //heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();
  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    console.log('scroll');
    messages.scrollTop(scrollHeight);
  }
}


socket.on('connect', function ()  {
  console.log('Connected to Server');
  var params = jQuery.deparam(window.location.search);
  socket.emit('join', params, function (err) {
    if(err){
      alert(err);
      window.location.href = '/';
    }else {
      console.log('No error');
    }
  });
});

socket.on('updateUserList', function (users) {
  var ol = $('<ol></ol>');
  users.forEach(function (user) {
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
  console.log(users);
});

socket.on('disconnect', function () {
  console.log('Disconnected from Server');
});


socket.on('newMessage', function (message) {
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formatedTime
  });
  $('#messages').append(html);
  scrollToBottom();
  /*console.log(message);
  var formatedTime = moment(message.createdAt).format('h:mm a');
  var li = $('<li></li>');
  li.text(`${message.from} ${formatedTime}: ${message.text}`);
  $('#messages').append(li);*/
});

  socket.on('newLocationMessage', function (message) {
    var formatedTime = moment(message.createdAt).format('h:mm a');
    var locationTemplate = $('#location-message-template').html();
    var html = Mustache.render(locationTemplate, {
      from: message.from,
      url: message.url,
      createdAt: formatedTime
    });
    $('#messages').append(html);
    scrollToBottom();
    /*var li = $('<li></li>');
    var a = $('<a target="_blank">My current Location</a>');
    li.text(`${message.from} ${formatedTime}: `);
    a.attr('href', message.url);
    li.append(a);
    $('#messages').append(li);*/
  });

 $('#message-form').on('submit', function (e) {
   e.preventDefault();
   var messageTextbox = $('[name=message]');
   socket.emit('createMessage', {
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