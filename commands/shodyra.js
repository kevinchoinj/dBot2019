const fs = require('fs');
const {
  createAdminEmbed,
} = require('../messaging/embeds');
const {
  getRequestValue,
} = require('../actions/parseData');
const {
  setConfigVar,
  getConfigVar,
} = require('../configuration/localData');
const {
  updateChannels,
} = require('../actions/couchRequests');
const {
  getBot,
} = require('../configuration/discordBot');
const {
  receiveShodyraImgurMessage,
} = require('./shodyraImgur');
const {
  receiveShodyraFileMessage,
} = require('./shodyraFile');
const {
  receiveShodyraConfigMessage,
} = require('./shodyraConfig');
const {
  receiveShodyraFetchMessage,
} = require('./shodyraFetch');

const receiveShodyraMessage = (message) => {

  if (message.content.startsWith('!imgur')){
    receiveShodyraImgurMessage(message);
  }
  else if (message.content.startsWith('!file')){
    receiveShodyraFileMessage(message);
  }
  else if (message.content.startsWith('!config')){
    receiveShodyraConfigMessage(message);
  }
  else if (message.content.startsWith('!fetch')){
    receiveShodyraFetchMessage(message);
  }
  else if (message.content.startsWith('!adminstats')){
    message.channel.send(createAdminEmbed());
  }
  else if (message.content.startsWith('!setDebug')) {
    const requestValue = getRequestValue(message.content);
    updateChannels('debug', requestValue)
      .then(()=> {
        setConfigVar(requestValue, 'debug');
        message.channel.send(`Debug Channel ID updated to ${requestValue}`);
        getBot().channels.get(getConfigVar('debug')).send('This channel updated for bot debug messages');
      });
  }

  else if (message.content.startsWith('!mkdir')){
    const requestValue = getRequestValue(message.content);
    fs.mkdir(requestValue, {recursive: true}, (err) => {
      if (err) {
        message.channel.send(`Error creating directory: ${requestValue}`);
      }
      else {
        message.channel.send(`Directory created: ${requestValue}`);
      }
    });
  }

  else if (message.content.startsWith('!rmdir')){
    const requestValue = getRequestValue(message.content);
    fs.rmdir(requestValue, (err) => {
      if (err) {
        message.channel.send(`Error removing directory: ${requestValue}`);
      }
      else {
        message.channel.send(`Directory removed: ${requestValue}`);
      }
    });
  }


  if (message.content.startsWith('!test')){
  console.log('placeholder');
  }

};

module.exports = {
  receiveShodyraMessage,
};
