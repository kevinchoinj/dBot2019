const {
  updateNames,
} = require('../actions/jsonRequests');
const {
  getBot,
} = require('./discordBot');
const {
  checkCouch,
} = require('./couchInitialize');
const {
  couchGet,
} = require('../actions/couchRequests');
const {
  setConfigVar
} = require('./localData');

// create databases if they do not exist
checkCouch(
  'shodyra_discord',
  'ids',
  `function (doc) {
    emit(doc.channelType, {
      channelType: doc.channelType,
      channelId: doc.channelId,
    });
  }`
);

/*
const idArray = [
  {idLabel: 'twitter', idVariable: 'twitterChannelId'},
  {idLabel: 'twitch', idVariable: 'twitchChannelId'},
  {idLabel: 'instagram', idVariable: 'instagramChannelId'},
  {idLabel: 'youtube', idVariable: 'youtubeChannelId'},
  {idLabel: 'debug', idVariable: 'debugChannelId'},
  {idLabel: 'archive', idVariable: 'archiveChannelId'},

idArray.map((idRow) => {
  couchGet(idDatabase, getDatabaseUrl(couchChannelUrl, idRow.idLabel)).then(
    function(data) {
      if (data.data.rows[0]) {
        setConfigVar(data.data.rows[0].value.channelId, idRow.idVariable);
      }
    }
  );
});
*/

//get recent error from database and store locally
couchGet('errors', `_design/errors/_view/errors?include_docs=true`).then(
  function(data) {
    if (data.data.rows[0]) {
      setConfigVar(data.data.rows[0], 'error');
    }
  }
);

//get channel id from database for where to post debug messages to
couchGet('shodyra_discord', `_design/data/_view/data?key="debug"&include_docs=true`).then(
  function(data) {
    if (data.data.rows[0]) {
      setConfigVar(data.data.rows[0].value.channelId, 'debugChannelId');
    }
  }
);

const bot = getBot();

bot.on('ready', () => {
  bot.user.setActivity('js');
  updateNames();
});
