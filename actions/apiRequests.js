let json = require('../config.json');

const imgurToken = json.imgurToken;
const lastfmToken = json.lastfmKey;

const getCurrentTrackUrl = (username) => {
  return `https://ws.audioscrobbler.com/3.0/?method=user.getrecenttracks&user=${username}&api_key=${lastfmToken}&limit=1&format=json`;
};

const getImgurOptions = (imgurString) => {
  return {
    'async': true,
    'crossDomain': true,
    uri: `https://api.imgur.com/3/album/${imgurString}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': imgurToken,
      'mimeType': 'multipart/form-data',
    },
  };
};

module.exports = {
  getCurrentTrackUrl,
  getImgurOptions,
};
