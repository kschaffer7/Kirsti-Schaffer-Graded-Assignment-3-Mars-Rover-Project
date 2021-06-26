const Message = require('./message.js');
const Command = require('./command.js');

class Rover {
  constructor(position) {
    this.position = position;
    this.mode = 'NORMAL';
    this.generatorWatts = 110;
  }

  receiveMessage(message) {
    let response = {
      message: message.name,
      results: []
    };
    for(let i = 0; i < message.commands.length; i++){
      if(message.commands[i].commandType === 'STATUS_CHECK'){
        response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
      }else if(message.commands[i].commandType === 'MODE_CHANGE'){
        response.results.push({completed: true});
        this.mode = message.commands[i].value;
      }else if(message.commands[i].commandType === 'MOVE' && this.mode === 'NORMAL'){
        response.results.push({completed: true});
        this.position = message.commands[i].value;
      }else{
        response.results.push({completed: false});
        response.message = "Unknown command";
      }
    }
    return response;
  }
}

module.exports = Rover;
