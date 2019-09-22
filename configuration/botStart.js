const {
  updateNames,
} = require('../actions/jsonRequests');
const {
  getBot,
} = require('./discordBot');
const {
  getChannels,
  getErrors,
} = require('../actions/couchRequests');
const {
  setConfigVar,
} = require('./localData');
const { mergeAll } = require('ramda');

getChannels().then((data) => {
  if (data) {
    mergeAll(data.rows.map((val) => {
      const data = val.value;
      setConfigVar(data.channelId, data.channelType);
    }));
    }
 });
 getErrors().then((data) => {
   if (data) {
     setConfigVar(data.rows[0], 'error');
   }
 })
const bot = getBot();


bot.on('ready', () => {
  bot.user.setActivity('js');
  updateNames();
});
