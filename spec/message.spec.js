const assert = require('assert');
const Message = require('../message.js');

describe("Message class", function() {
// Test 4
  it("throws error if a name is NOT passed into the constructor as the first parameter", function() {
    assert.throws(
      function() {
       new Message();
      },
      {
        message: 'Name required.'
      }
    );
  });
// Test 5
  it("constructor sets name", function() {
    let message = new Message("Coyote", []);
    assert.strictEqual(message.name, "Coyote");
  });
// Test 6  
  it("contains a commands array passed into the constructor as 2nd argument", function() {
    let message = new Message("Roadrunner", [50, 11, 95]);
    assert.deepStrictEqual(message.commands, [50, 11, 95]);
  });
});