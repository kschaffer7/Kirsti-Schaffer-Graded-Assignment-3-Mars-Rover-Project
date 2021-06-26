const assert = require('assert');
const Command = require('../command.js');

describe("Command class", function() {
// Test 1
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    assert.throws(
      function() {
        new Command();
      },
      {
        message: 'Command type required.'
      }
    );
  });
// Test 2
  it("constructor sets command type", function() {
    let command = new Command("throw shoe", 7);
    assert.strictEqual(command.commandType, "throw shoe");
  });
// Test 3
  it("constructor sets a value passed in as the 2nd argument", function() {
    let command = new Command("throw shoe", 7);
    assert.strictEqual(command.value, 7);
  });

});