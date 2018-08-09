class Rooms{
  constructor(){
    this.rooms = [];
  }
  addRoom(name){
    var existRooms =  this.getRoomsList(name);
    var room = {name};
    this.rooms.push(room);
    return room;
  }
  removeRoom(name){
    var room =  this.getRoomsList();
    if(room){
      this.rooms = this.rooms.filter((room) =>  room.name !== name)
    }
    console.log(name);
    console.log('Remove User from', this.rooms);
    console.log('Remove User', room);
    return room;
  }
  getRoomName(name){
    return this.rooms.filter((room) =>  room.name === name)[0];
  }
  getRoomsList(){
     return this.rooms;
  }
}



module.exports = {Rooms};