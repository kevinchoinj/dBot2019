const os = require('os');
const Discord = require('discord.js');

const {
  secondsToString,
} = require('../actions/parseData');

const createAdminEmbed = () => {
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

module.exports = {
  createAdminEmbed,
};