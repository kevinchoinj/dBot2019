const {
  createAdminEmbed,
} = require('../messaging/embeds');

const receiveShodyraMessage = (message) => {
  if (message.content.startsWith('!adminstats')){
    message.channel.send(createAdminEmbed());
  }
};

module.exports = {
  receiveShodyraMessage,
};
