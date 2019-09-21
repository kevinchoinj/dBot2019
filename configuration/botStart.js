const {
  updateNames,
} = require('../actions/jsonRequests');
const {
  getBot,
} = require('./discordBot');
const {
  getChannels,
} = require('../actions/couchRequests');
const {
  setConfigVar,
} = require('./localData');
const { mergeAll } = require('ramda');
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

/*
getChannels().then(data => {
 const documentData = mergeAll(data.rows.map((val) => {
    const data = val.value;
    return {
      [data.channelType]: data.channelId
    };
  }));
});
*/
getChannels().then(data => {
  mergeAll(data.rows.map((val) => {
     const data = val.value;
     setConfigVar(data.channelId, data.channelType);
   }));
 });
const bot = getBot();

bot.on('ready', () => {
  bot.user.setActivity('js');
  updateNames();
});
