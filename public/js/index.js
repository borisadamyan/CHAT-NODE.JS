var socket = io();
socket.on('updateRoomsList', function (rooms) {
  var ol = $('<ol></ol>');
  rooms.forEach(function (room) {
      ol.append($('<li></li>').text(room.name));
  });
  $('#rooms').html(ol);
  console.log('ROOMS', rooms);
});

$(document).on('click', '#rooms ol li', function () {
  var roomName = $(this).html();
  var messageTextbox = $('[name=room]');
  messageTextbox.val(roomName);
});
