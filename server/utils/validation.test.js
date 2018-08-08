var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

const {isRealString} = require('./validation');

describe('is Real String', () => {
  it('should reject non string values',() => {
    var name = isRealString(1);
    expect(name).to.be.false;
  });
  it('should reject  string  with only spaces ',() => {
    var name = isRealString('  ');
    expect(name).to.be.false;
  })
  it('should allow  string  with non-space characters ',() => {
    var name = isRealString('hello world');
    expect(name).to.be.true;
  })
});

