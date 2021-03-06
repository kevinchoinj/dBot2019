const {
  getImgurOptions,
} = require('../actions/apiRequests.js');
const {
  getRandom,
} = require('../actions/parseData.js');
const {
  getNames,
} = require('../actions/jsonRequests');
const {
  createCommandsEmbed,
} = require('../messaging/embeds');
const {
  sendError,
} = require('../actions/couchRequests');
const rp = require('request-promise');
let requestValue = '';

const receivePublicMessage = (message) => {
  if (message.content.startsWith('!')) {
    requestValue = message.content.substring(1);
  }
  if (getNames()[requestValue]) {
    rp(getImgurOptions(getNames()[requestValue]))
      .then((res) => {
        let parsed =  JSON.parse(res);
        let randomNumber = getRandom(parsed.data.images_count);
        if (parsed.data.images[randomNumber]) {
          message.channel.send(parsed.data.images[randomNumber].link);
        }
        else {
          message.channel.send('Error posting image');
        }
      })
      .catch((err) => {
        sendError('Discord Shodyra', err, 'Imgur Get Error');
      });
  }
  if (message.content.startsWith('!commands')) {
    message.channel.send(createCommandsEmbed());
  }
};

module.exports = {
  receivePublicMessage,
};
