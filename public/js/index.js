var socket = io();
socket.on('updateRoomsList', function (rooms) {
  var ol = $('<ol></ol>');
  rooms.forEach(function (room) {
      ol.append($('<li></li>').text(room.name));
  });
  $('#rooms').html(ol);
  console.log('ROOMS', rooms);
});