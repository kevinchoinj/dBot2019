const {
  updateNames,
} = require('../actions/jsonRequests');
const {
  getBot,
} = require('./discordBot');

const bot = getBot();

bot.on('ready', () => {
  bot.user.setActivity('js');
  updateNames();
});
