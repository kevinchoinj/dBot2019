const fs = require('fs');
const {
  createAdminEmbed,
} = require('../messaging/embeds');
const {
  getRequestValue,
  getRequestValueMulti,
} = require('../actions/parseData');
const {
  setConfigVar,
  getConfigVar,
} = require('../configuration/localData');
const {
  updateDatabase,
} = require('../actions/couchRequests');
const {
  getBot,
  sendDebugMessage,
} = require('../configuration/discordBot');
const {
  receiveShodyraImgurMessage,
} = require('./shodyraImgur');

const receiveShodyraMessage = (message) => {

  if (message.content.startsWith('!imgur')){
    receiveShodyraImgurMessage(message);
  }

  else if (message.content.startsWith('!adminstats')){
    message.channel.send(createAdminEmbed());
  }

  else if (message.content.startsWith('!setDebug')) {
    const requestValue = getRequestValue(message.content);
    const databaseUrl = `_design/data/_view/data?key="debug"&include_docs=true`
    let newData = {
      channelType: 'debug',
      channelId: requestValue,
    };
    updateDatabase('shodyra_discord', databaseUrl, newData)
      .then(()=> {
        setConfigVar(requestValue, 'debugChannelId');
        message.channel.send(`Debug Channel ID updated to ${requestValue}`);
        getBot().channels.get(getConfigVar('debugChannelId')).send('This channel updated for bot debug messages');
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

  else if (message.content.startsWith('!writeFile')){
    const requestValues = getRequestValueMulti(message.content);
    fs.writeFile(requestValues.valueOne, requestValues.valueTwo, (err) => {
      if (err) {
        message.channel.send(`Error creating file: ${requestValues.valueOne}`);
      }
      else {
        message.channel.send(`File created: ${requestValues.valueOne}`);
      }
    });
  }

  else if (message.content.startsWith('!copyFile')){
    const requestValues = getRequestValueMulti(message.content);
    let myReadStream = fs.createReadStream(requestValues[0], 'utf8');
    let myWriteStream = fs.createWriteStream(requestValues[1]);
    myReadStream.pipe(myWriteStream);
    message.channel.send(`File copied: ${requestValues[0]} to ${requestValues[1]}`);
  }

  else if (message.content.startsWith('!deleteFile')){
    const requestValue = getRequestValue(message.content);
    fs.unlink(requestValue, (err) => {
      if (err) {
        message.channel.send(`Error removing file: ${requestValue}`);
      }
      else {
        message.channel.send(`File removed: ${requestValue}`);
      }
    });
  }

  if (message.content.startsWith('!test')){
    sendDebugMessage('debug message');
  }
};

module.exports = {
  receiveShodyraMessage,
};
