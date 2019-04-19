const fs = require('fs');

const {
  createAdminEmbed,
} = require('../messaging/embeds');
const {
  getRequestValue,
  getRequestValueMulti,
} = require('../actions/parseData');

const receiveShodyraMessage = (message) => {

  if (message.content.startsWith('!adminstats')){
    message.channel.send(createAdminEmbed());
  }

  if (message.content.startsWith('!mkdir')){
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

  if (message.content.startsWith('!rmdir')){
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

  if (message.content.startsWith('!writeFile')){
    const requestValues = getRequestValueMulti(message.content);
    fs.writeFile(requestValues.primaryValue, requestValues.secondaryValue, (err) => {
      if (err) {
        message.channel.send(`Error creating file: ${requestValues.primaryValue}`);
      }
      else {
        message.channel.send(`File created: ${requestValues.primaryValue}`);
      }
    });
  }

  if (message.content.startsWith('!deleteFile')){
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
    const requestValues = getRequestValueMulti(message.content);
    message.channel.send(`Primary Value: ${requestValues.primaryValue}`);
    message.channel.send(`Secondary Value: ${requestValues.secondaryValue}`);
  }

};

module.exports = {
  receiveShodyraMessage,
};
