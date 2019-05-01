const {
  sendError,
} = require('../actions/couchRequests');
const {
  createGitEmbed,
} = require('../messaging/embeds');

const rp = require('request-promise');

const receiveShodyraFetchMessage = (message) => {
  if (message.content.startsWith('!fetchGit')){
    rp({
    uri: 'https://api.github.com/repos/kevinchoinj/discord-shodyra-2019/commits',
    headers: {
      'user-agent': 'node.js'
      }}
    )
    .then(res => {
      let parsed =  JSON.parse(res);
      message.channel.send(createGitEmbed(parsed));

    })
    .catch((err) => {
      sendError('Discord Shodyra', err, 'Git Get Error');
    });
  }
};

module.exports = {
  receiveShodyraFetchMessage,
};
