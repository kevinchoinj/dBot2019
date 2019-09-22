let json = require('./config.json');

const adminId = json.adminId;

const {
  receiveShodyraMessage,
} = require('./commands/shodyra');
const {
  receivePublicMessage,
} = require('./commands/public');
const {
  getBot,
} = require('./configuration/discordBot');

require('./configuration/botStart.js');
require('./cron/couchErrors');
const bot = getBot();

bot.on('message', function(message){
  //skip if bot
  if (message.author.bot) {
    return;
  }
  //direct message
  if (message.channel.type==='dm') {
    bot.users.get(adminId).send(
      `${message.channel.recipient.id}<@${message.channel.recipient.id}>
      <@${message.channel.recipient.username}#${message.channel.recipient.discriminator}>:
      ${message.channel.lastMessage.content}`
    );
  }
  else {
    //shodyra commands
    if (message.embeds && message.embeds[0] && message.embeds[0].image) {
      // console.log(message.embeds[0].image.url)
    }
    if (message.author.id === adminId) {
      receiveShodyraMessage(message);
    }
    receivePublicMessage(message);
  }
});