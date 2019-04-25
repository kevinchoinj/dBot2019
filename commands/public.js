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
  getBot,
} = require('../configuration/discordBot');

const rp = require('request-promise');
let requestValue = '';

const receivePublicMessage = (message) => {
  if (message.content.startsWith('!')) {
    requestValue = message.content.substring(1);
  }
  if (getNames()[requestValue]) {
    rp(getImgurOptions(getNames()[requestValue]))
      .then(function(res) {
        let parsed =  JSON.parse(res);
        let randomNumber = getRandom(parsed.data.images_count);
        if (parsed.data.images[randomNumber]) {
          message.channel.send(parsed.data.images[randomNumber].link);
        }
        else {
          message.channel.send('Error posting image');
        }
      });
  }
  if (message.content.startsWith('!commands')) {
    message.channel.send(createCommandsEmbed());
  }

  if (message.content.startsWith('!test')){
    console.log(getBot().user.displayAvatarURL);
  }
};

module.exports = {
  receivePublicMessage,
};
