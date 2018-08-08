var expect = require('expect');
var chai = require('chai');
var should = chai.should();

const {Users} = require('./users');

describe('Users', () => {
  var users;
      beforeEach(() => {
      users = new Users();
      users.users= [
          {
            id: '1',
            name: 'name1',
            room: 'Node chat'
          },
        {
          id: '2',
          name: 'name2',
          room: 'Angular chat'
        },
        {
          id: '3',
          name: 'name3',
          room: 'Node chat'
        }]
    });


   it('should remove a user', () => {
      var userId = '1';
      var user = users.removeUser(userId);
     expect(user.id).toBe(userId);
     expect(users.users.length).toBe(2);
   });
  it('should not remove a user', () => {
    var userId = '99';
    var user = users.removeUser(userId);
    should.not.exist(user);
    expect(users.users.length).toBe(3);

  });

  it('should find a user', () => {
    var resUser = users.getUser('1');
    expect(resUser.id).toBe('1');
    });
  it('should not find a user', () => {
    var resUser = users.getUser('99');
    should.not.exist(resUser);
  });

  it('should add new user',() => {
    var users = new Users();
    var user = {
      id: 123,
      name: 'Boris',
      room: 'Office'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });
  it('should return names for node course', () => {
     var userList = users.getUserList('Node chat');
     expect(userList).toEqual(['name1', 'name3'])
  });
  it('should return names for Angular course', () => {
    var userList = users.getUserList('Angular chat');
    expect(userList).toEqual(['name2'])
  })
});