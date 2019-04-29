const fs = require('fs');
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


const receiveShodyraMessage = (message) => {

  if (message.content.startsWith('!adminstats')){
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

  else if (message.content.startsWith('!addImgurName')){
    const requestValues = getRequestValueMulti(message.content);
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

  else if (message.content.startsWith('!removeImgurName')){
    const requestValues = getRequestValueMulti(message.content);

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

  else if (message.content.startsWith('!listImgur')){
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
    sendDebugMessage('debug message');
  }
};

module.exports = {
  receiveShodyraMessage,
};
