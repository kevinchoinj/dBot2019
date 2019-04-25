const Discord = require('discord.js');
let json = require('../config.json');
const discordToken = json.discordToken;

const bot = new Discord.Client();

bot.login(discordToken);

const getBot = () => {
  return bot;
}

module.exports = {
  getBot,
};
