const {
  getConfigVar,
} = require('../configuration/localData');

const receiveShodyraConfigMessage = (message) => {
  if (message.content.startsWith('!configDebug')){
    message.channel.send(`Debug ID: ${getConfigVar('debug')}`);
  }
  else if (message.content.startsWith('!configError')){
    const errorData = getConfigVar('error').value;
    if (errorData) {
      message.channel.send(
      `App: ${errorData.app}
Error: ${errorData.text}`);
    }
    else {
      message.channel.send('No error data found');
    }
  }
};

module.exports = {
  receiveShodyraConfigMessage,
};
