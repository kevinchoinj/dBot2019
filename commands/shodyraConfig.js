const {
  getConfigVar,
} = require('../configuration/localData');

const receiveShodyraConfigMessage = (message) => {
  if (message.content.startsWith('!configDebug')){
    message.channel.send(`Debug ID: ${getConfigVar('debugChannelId')}`);
  }
  else if (message.content.startsWith('!configError')){
    message.channel.send(`Debug ID: ${getConfigVar('error').value.text}`);
  }
};

module.exports = {
  receiveShodyraConfigMessage,
};
