
const nano = require('nano')('http://localhost:5984');
const errorDatabase = nano.db.use('errors');
const channelDatabase = nano.db.use('shodyra_discord');

const getErrors = () =>  new Promise((resolve, reject) => {
  resolve(errorDatabase.view('errors', 'errors', { include_docs: true }));
  reject((error) => {
    sendError('couch get', error, 'couchGet error');
  });
});

const sendError = (component, error, text) => {
  errorDatabase.insert({
    app: 'discordClean',
    component: component,
    error: error,
    text: text,
  });
}

const getChannels = () =>  new Promise((resolve, reject) => {
  resolve(channelDatabase.view('data', 'data', { include_docs: true }));
  reject((error) => {
    sendError('couch get', error, 'couchGet error');
  });
});
const getChannel = (channel) =>  new Promise((resolve, reject) => {
  resolve(channelDatabase.view('data', 'data', { key: channel, include_docs: true }));
  reject((error) => {
    sendError('couch get', error, 'couchGet error');
  });
});
const updateChannels = (channelName, channelId) => new Promise((resolve, reject) => {
  resolve(channelDatabase.view('data', 'data', { channelType: channelName, include_docs: true })
    .then(data => {
      if (data.rows[0]) {
        return channelDatabase.insert({
          _id: data.rows[0].doc._id,
          _rev: data.rows[0].doc._rev,
          channelType: channelName,
          channelId: channelId,
        });
      }
      else {
        return channelDatabase.insert({
          channelType: channelName,
          channelId: channelId,
        });
      }
    })
    );
});


module.exports = {
  sendError,
  getErrors,
  getChannels,
  getChannel,
  updateChannels,
};