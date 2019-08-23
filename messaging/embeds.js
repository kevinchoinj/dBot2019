const os = require('os');
const Discord = require('discord.js');
const moment = require('moment');

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
      **!imgurAdd [album label] [album id]** -Adds Imgur album to collection
      **!imgurRemove [album label]** - Removes Imgur album from collection
      **!imgurList** - Lists Imgur albums in collection
      **!setDebug [channel id]** - Sets debug channel ID
      **!fetchGit** - Displays recent github commits
    `);
  return {embed};
}

const createGitEmbed = (commits) => {
  const commitData = commits[0],
        commitDataTwo = commits[1],
        commitDataThree = commits[2];
  const embed = new Discord.RichEmbed()
    .setTitle('Git Updates')
    .setThumbnail(getBot().user.displayAvatarURL)
    .addField('Recent Commits',`
      **${moment(commitData.commit.author.date).fromNow()}** - ${commitData.commit.message}
      **${moment(commitDataTwo.commit.author.date).fromNow()}** - ${commitDataTwo.commit.message}
      **${moment(commitDataThree.commit.author.date).fromNow()}** - ${commitDataThree.commit.message}
    `);
  return {embed};
}
module.exports = {
  createAdminEmbed,
  createCommandsEmbed,
  createGitEmbed,
};