const fs = require('fs');

const {
  createAdminEmbed,
} = require('../messaging/embeds');
const {
  getRequestValue,
  getRequestValueMulti,
} = require('../actions/parseData');


let myReadStream = fs.createReadStream('./Readme.MD', 'utf8');
let myWriteStream = fs.createWriteStream('./writeMe.txt');

/*
myReadStream.on('data', function(chunk) {
  myWriteStream.write(chunk);
})
*/
//same as above
myReadStream.pipe(myWriteStream);
//myReadStream.pipe(res);

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
            message.channel.send(`Success adding name: ${requestValues.primaryValue}`);
          }
        });
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
