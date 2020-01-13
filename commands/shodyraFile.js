const fs = require('fs');
const {
  getRequestValue,
  getRequestValueMulti,
} = require('../actions/parseData');
const request = require('request');

const receiveShodyraFileMessage = (message) => {
  // !fileWrite
  if (message.content.startsWith('!fileWrite')){
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
  // !fileCopy
  else if (message.content.startsWith('!fileCopy')){
    const requestValues = getRequestValueMulti(message.content);
    let myReadStream = fs.createReadStream(requestValues[0], 'utf8');
    let myWriteStream = fs.createWriteStream(requestValues[1]);
    myReadStream.pipe(myWriteStream);
    message.channel.send(`File copied: ${requestValues[0]} to ${requestValues[1]}`);
  }
  // !fileDelete
  else if (message.content.startsWith('!fileDelete')){
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
  // !fileDownload
  else if (message.content.startsWith('!fileDownload')){
    const requestValue = getRequestValue(message.content);
    const requestArray = requestValue.split('/');
    const fileName = requestArray[requestArray.length - 1];
    const stream = function(){
      request(requestValue)
        .pipe(fs.createWriteStream(`data/images/${fileName}`))
        .on('close', () => {
          message.channel.send(`Finished downloading file: ${fileName}`);
        })
        .on('error', (error) =>  {
          message.channel.send(`Error downloading file: ${requestValue}`);
        })
    }
    stream();
  }
};
module.exports = {
  receiveShodyraFileMessage,
};
