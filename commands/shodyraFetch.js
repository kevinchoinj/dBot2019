const {
  sendError,
} = require('../actions/errors');

const rp = require('request-promise');

const receiveShodyraFetchMessage = (message) => {
  if (message.content.startsWith('!fetchGit')){
    rp({
    uri: 'https://api.github.com/repos/kevinchoinj/rport19/commits',
    headers: {
      'user-agent': 'node.js'
      }}
    )
      .then((res)=> {
       console.log(res);
      })
      .catch((err) => {
        sendError('Discord Shodyra', err, 'Git Get Error');
      });
  }

};

module.exports = {
  receiveShodyraFetchMessage,
};
