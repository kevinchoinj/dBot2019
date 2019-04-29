const os = require('os');
const Discord = require('discord.js');

const {
  secondsToString,
} = require('../actions/parseData');
const {
  getBot,
} = require('../configuration/discordBot');

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

const createCommandsEmbed = () => {
  const embed = new Discord.RichEmbed()
    .setTitle('Commands')
    .setThumbnail(getBot().user.displayAvatarURL)
    .addField('General Commands', `
      **![keyValue]** - Displays imgur album with key value
      **!commands** - Displays commands
      `)
    .addField('Admin Commands', `
      empty
      `)
    .addField('Shodyra Commands', `
      **!adminstats** - Displays system data
      **!mkdir [dir name]** - Creates empty directory
      **!rmdir [dir name]** - Deletes empty directory
      **!writeFile [file name] [content]** - Creates named file
      **!copyFile [orig file] [dest file]** - Copies file to another
      **!deleteFile [file name]** - Deletes named file
      **!addImgurName [album label] [album id]** -Adds Imgur album to collection
      **!removeImgurName [album label]** - Removes Imgur album from collection
      **!listImgur** - Lists Imgur albums in collection
      **!setDebug [channel id]** - Sets debug channel ID
    `);
  return {embed};
}
module.exports = {
  createAdminEmbed,
  createCommandsEmbed,
};