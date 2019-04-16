const Discord = require('discord.js');
let json = require('./config.json');
const discordToken = json.discordToken;
const os = require('os');
const moment = require('moment');

/*ids couchdb*/
const bot = new Discord.Client();

const getRequestValue = (string, prefixLength) => {
  const inputValue = string.content.substring(prefixLength).replace(/ /g,'');
  return inputValue.toLowerCase();
};

const createAdminEmbed = (data) => {
  const embed = new Discord.RichEmbed()
    .setTitle('Admin Stats')
    .addField('Total Memory', `${os.totalmem()} bytes`)
    .addField('Free Memory',  `${os.freemem()} bytes`)
    .addField('Uptime',   secondsToString(os.uptime()))
    .addField('Platform',  os.platform())
    .addField('Type',  os.type())
    .addField('Release',  os.release());
  return {embed};
};

const secondsToString = (seconds) => {
  var numDays = Math.floor(seconds / 86400);
  var numHours = Math.floor((seconds % 86400) / 3600);
  var numMinutes = Math.floor(((seconds % 86400) % 3600) / 60);
  var numSeconds = ((seconds % 86400) % 3600) % 60;
  return `${numDays} days, ${numHours} hours, ${numMinutes} minutes, ${numSeconds} seconds`;
}

bot.on('message', function(message){
    //skip if bot
    if (message.author.bot) {
      return;
    }
    let requestValue = getRequestValue(message, 1);

    if  (requestValue.startsWith('test')) {
      //test content
    }

    if (message.content.startsWith('!adminstats')){
      message.channel.send(createAdminEmbed());
    }

});

bot.on('ready', () => {
  bot.user.setActivity('js');
});

bot.login(discordToken);