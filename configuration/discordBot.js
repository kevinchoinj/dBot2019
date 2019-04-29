const Discord = require('discord.js');
let json = require('../config.json');
const discordToken = json.discordToken;
const {
  getConfigVar,
} = require('./localData');

const bot = new Discord.Client();

bot.login(discordToken);

const getBot = () => {
  return bot;
}

const sendDebugMessage = (message) => {
  const channelId = getConfigVar('debugChannelId');
  if (channelId && bot.channels.get(channelId)) {
    bot.channels.get(channelId).send(message);
  }
};

module.exports = {
  getBot,
  sendDebugMessage,
};
