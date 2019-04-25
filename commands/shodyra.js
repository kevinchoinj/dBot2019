const fs = require('fs');
const moment = require('moment');

const {
  createAdminEmbed,
} = require('../messaging/embeds');
const {
  getRequestValue,
  getRequestValueMulti,
} = require('../actions/parseData');
const {
  updateNames,
} = require('../actions/jsonRequests');

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
        message.channel.send(`File created: ${requestValues.secondaryValue}`);
      }
    });
  }

  if (message.content.startsWith('!copyFile')){
    const requestValues = getRequestValueMulti(message.content);
    let myReadStream = fs.createReadStream(requestValues.primaryValue, 'utf8');
    let myWriteStream = fs.createWriteStream(requestValues.secondaryValue);
    myReadStream.pipe(myWriteStream);
    message.channel.send(`File copied: ${requestValues.primaryValue} to ${requestValues.secondaryValue}`);
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

  if (message.content.startsWith('!addImgurName')){
    const requestValues = getRequestValueMulti(message.content);
    fs.readFile('./data/names.json', function (err, data) {
      if (err) {
        message.channel.send(`Error reading names file: ${requestValues.primaryValue}`);
      }
      else {
        let jsonData = JSON.parse(data);
        jsonData[requestValues.primaryValue] = requestValues.secondaryValue;
        fs.writeFile('./data/names.json', JSON.stringify(jsonData), (err) => {
          if (err) {
            message.channel.send(`Error adding name: ${requestValues.primaryValue}`);
          }
          else {
            updateNames();
            message.channel.send(`Success adding name: ${requestValues.primaryValue}`);
          }
        });
      }
    });
  }

  if (message.content.startsWith('!removeImgurName')){
    const requestValue = getRequestValue(message.content);
    fs.readFile('./data/names.json', function (err, data) {
      if (err) {
        message.channel.send(`Error reading names file: ${requestValue}`);
      }
      else {
        let jsonData = JSON.parse(data);
        if (jsonData[requestValue]) {
          delete jsonData[requestValue];
          fs.writeFile('./data/names.json', JSON.stringify(jsonData), (err) => {
            if (err) {
              message.channel.send(`Error removing name: ${requestValue}`);
            }
            else {
              updateNames();
              message.channel.send(`Success removing name: ${requestValue}`);
            }
          });
        }
        else {
          message.channel.send(`Name not found: ${requestValue}`);
        }
      }
    });
  }

  if (message.content.startsWith('!listImgur')){
    fs.readFile('./data/names.json', function (err, data) {
      if (err) {
        message.channel.send('Error reading names file');
      }
      else {
        let jsonData = JSON.parse(data);
        let dataList = Object.keys(jsonData).join(', ');
        //discord message length limit = 2000
        message.channel.send(dataList.substring(0, 2000));
      }
    });
  }

  if (message.content.startsWith('!test')){
    /*
    const requestValues = getRequestValueMulti(message.content);
    message.channel.send(`Primary Value: ${requestValues.primaryValue}`);
    message.channel.send(`Secondary Value: ${requestValues.secondaryValue}`);
    */

    if (moment('Wed Apr 21 19:36:23 +0000 2019', 'ddd MMM DD HH:mm:ss Z YYYY').isAfter(moment('Sun Apr 24 18:58:23 +0000 2019', 'ddd MMM DD HH:mm:ss Z YYYY'))) {
      message.channel.send('true');
    }
    else {
      message.channel.send('false');
    }

  }

};

module.exports = {
  receiveShodyraMessage,
};
