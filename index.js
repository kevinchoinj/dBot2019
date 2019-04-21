const Discord = require('discord.js');
let json = require('./config.json');
const discordToken = json.discordToken;

const Logger = require('./logger');
/*ids couchdb*/

const adminId = json.adminId;

const logger = new Logger();

logger.on('messageLogged', (arg) => {
  console.log('Listener called', arg);
});

logger.log('message');

const {
  receiveShodyraMessage,
} = require('./commands/shodyra');
const {
  receivePublicMessage,
} = require('./commands/public');
const {
  updateNames,
} = require('./actions/jsonRequests');

const bot = new Discord.Client();

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
    if (message.author.id === adminId) {
      receiveShodyraMessage(message);
    }

    receivePublicMessage(message);
  }

});

bot.on('ready', () => {
  bot.user.setActivity('js');
  updateNames();
});

bot.login(discordToken);