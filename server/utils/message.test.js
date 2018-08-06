var chai = require('chai');
var expect = chai.expect;    // Using Expect style
var should = chai.should();

var {generateMessage} = require('./message');

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