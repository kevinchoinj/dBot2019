const Discord = require('discord.js');
let json = require('./config.json');
const discordToken = json.discordToken;

/*ids couchdb*/
const bot = new Discord.Client();

bot.on('message', function(message){
    //skip if bot
    if (message.author.bot) {
      return;
    }

    message.channel.send('test');
});

bot.on('ready', () => {
  bot.user.setActivity('js');
});

bot.login(discordToken);