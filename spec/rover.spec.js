const assert = require('assert');
const Rover = require('../rover.js');
const Command = require('../command.js');
const Message = require('../message.js');

describe("Rover class", function() {
// Test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let rover = new Rover(50);
    assert.strictEqual(rover.position, 50);
    assert.strictEqual(rover.mode, 'NORMAL');
    assert.strictEqual(rover.generatorWatts, 110);
  });
// Test 8
  it("response returned by receiveMessage contains name of message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Hello', commands);
    let rover = new Rover(500);
    let response = rover.receiveMessage(message).message;
    assert.strictEqual(response, message.name);
  });
// Test 9  
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Hello', commands);
    let rover = new Rover(500);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results.length, 2);
  });
// Test 10
  it("responds correctly to status check command", function() {
    let commands = [new Command('STATUS_CHECK')];
    let message = new Message('Test status check command', commands);
    let rover = new Rover(87382098);
    let response = rover.receiveMessage(message).results;
    assert.strictEqual(response[0].roverStatus.mode, 'NORMAL');
    assert.strictEqual(response[0].roverStatus.generatorWatts, 110);
    assert.strictEqual(response[0].roverStatus.position, 87382098);
  });
// Test 11
  it("responds correctly to mode change command", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER')];
    let message = new Message('Test mode change command', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message).results;
    assert.strictEqual(rover.mode, 'LOW_POWER');
    assert.strictEqual(response[0].completed, true);
  });
// Test 12
  it("responds with false completed value when attempting to move in LOW_POWER mode", function() {
    let commands = [new Command('MODE_CHANGE', 'LOW_POWER'),new Command('MOVE', 87382098)];
    let message = new Message('Test that Rover does not move in LOW_POWER mode', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message).results;
    assert.strictEqual(response[1].completed, false);
  });
// Test 13
  it("responds with position for move command", function() {
    let commands = [new Command('MOVE', 500),new Command('STATUS_CHECK')];
    let message = new Message('Update position', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message).results;
    assert.strictEqual(response[1].roverStatus.position, 500);
  })
// Test 14
  it("completed false and a message for an unknown command", function() {
    let commands = [new Command('Throw Shoe')];
    let message = new Message('Testing the response of an invalid command', commands);
    let rover = new Rover(98382);
    let response = rover.receiveMessage(message);
    assert.strictEqual(response.results[0].completed, false);
    assert.strictEqual(response.message,"Unknown command");
  })
});