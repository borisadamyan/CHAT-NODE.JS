var chai = require('chai');
var expect = chai.expect;    // Using Expect style
var should = chai.should();

var {generateMessage, generateLocationMessage} = require('./message');

describe('generate message', () => {
  it('should generate correct message object', () => {
    var from = 'Jen';
    var text = 'Message';
    var message = generateMessage(from, text);

    expect(message.createdAt).to.be.a('number');
    expect(message).include({
      from,
      text
    });
  })
});
describe('generate Location message', () => {
  it('should generate correct Location object', () => {
    var url = 'https://www.google.com/maps?q=1,1';
    var from = 'Admin';
    var message = generateLocationMessage(from, 1, 1);

    expect(message.createdAt).to.be.a('number');
    expect(message).include({
      from,
      url
    });
  })
});