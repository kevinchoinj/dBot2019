const {
  getImgurOptions,
} = require('../actions/apiRequests.js');
const {
  getRandom,
} = require('../actions/parseData.js');


const namesJson = require('../data/names.json');
const rp = require('request-promise');
let requestValue = '';

const receivePublicMessage = (message) => {
  if (message.content.startsWith('!')) {
    requestValue = message.content.substring(1);
  }
  if (namesJson[requestValue]) {
    rp(getImgurOptions(namesJson[requestValue]))
      .then(function(res) {
        let parsed =  JSON.parse(res);
        let randomNumber = getRandom(parsed.data.images_count);
        message.channel.send(parsed.data.images[randomNumber].link);
      });
  }
};

module.exports = {
  receivePublicMessage,
};
