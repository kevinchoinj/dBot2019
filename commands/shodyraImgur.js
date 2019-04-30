const fs = require('fs');
const {
  getRequestValueArray,
} = require('../actions/parseData');
const {
  updateNames,
} = require('../actions/jsonRequests');

const receiveShodyraImgurMessage = (message) => {

if (message.content.startsWith('!imgurAdd')){
    const requestValues = getRequestValueArray(message.content);
    if (requestValues[0] && requestValues[1]) {
      fs.readFile('./data/names.json', function (err, data) {
        if (err) {
          message.channel.send(`Error reading names file: ${requestValues[0]}`);
        }
        else {
          let jsonData = JSON.parse(data);
          jsonData[requestValues[0]] = requestValues[1];
          fs.writeFile('./data/names.json', JSON.stringify(jsonData), (err) => {
            if (err) {
              message.channel.send(`Error adding name: ${requestValues[0]}`);
            }
            else {
              updateNames();
              message.channel.send(`Success adding name: ${requestValues[0]}`);
            }
          });
        }
      });
    }
    else {
      message.channel.send(`Requires a minimum of two parameters`);
    }
  }

  else if (message.content.startsWith('!imgurRemove')){
    const requestValues = getRequestValueArray(message.content);
    if (requestValues.length<2) {
      fs.readFile('./data/names.json', function (err, data) {
        if (err) {
          message.channel.send('Error reading names file');
        }
        else {
          let jsonData = JSON.parse(data);
          if (jsonData[requestValues[0]]) {
            delete jsonData[requestValues[0]];
            fs.writeFile('./data/names.json', JSON.stringify(jsonData), (err) => {
              if (err) {
                message.channel.send(`Error removing name: ${requestValues[0]}`);
              }
              else {
                updateNames();
                message.channel.send(`Success removing name: ${requestValues[0]}`);
              }
            });
          }
          else {
            message.channel.send(`Name not found: ${requestValues[0]}`);
          }
        }
      });
    }
    else {
      fs.readFile('./data/names.json', function (err, data) {
        if (err) {
          message.channel.send('Error reading names file');
        }
        else {
          let jsonData = JSON.parse(data);
          requestValues.map((value) => {
            if (jsonData[value]) {
              delete jsonData[value];
            }
            else {
              message.channel.send(`Name not found: ${value}`);
            }
          });
          fs.writeFile('./data/names.json', JSON.stringify(jsonData), (err) => {
            if (err) {
              message.channel.send(`Error removing names`);
            }
            else {
              updateNames();
              message.channel.send(`Success removing names`);
            }
          });
        }
      });
    }
  }

  else if (message.content.startsWith('!imgurList')){
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

};

module.exports = {
  receiveShodyraImgurMessage,
};
