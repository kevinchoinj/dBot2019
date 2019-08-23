const NodeCouchDb = require('node-couchdb');

const nano = require('nano')('http://localhost:5984');
const errorDatabase = nano.db.use('errors');
const channelDatabase = nano.db.use('shodyra_discord');

let json = require('../config.json');
const dbErrors = json.dbErrors;
const couchUsername = json.couchUsername;
const couchPassword = json.couchPassword;

const couch = new NodeCouchDb({
  auth: {
    user: couchUsername,
    password: couchPassword,
  }
});

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

const getCouch = () => {
  return couch;
};

const couchGet = (database, databaseViewUrl) => new Promise((resolve, reject) => {
  resolve(couch.get(database, databaseViewUrl));
  reject((error) => {
    sendError('couch get', error, 'couchGet error');
  });
});

const getChannels = () =>  new Promise((resolve, reject) => {
  resolve(channelDatabase.view('data', 'data', { key: 'test', include_docs: true }));
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
const updateChannels = () => new Promise((resolve, reject) => {
  resolve(channelDatabase.view('data', 'data', { include_docs: true }))
});

const updateDatabase = (databaseName, databaseViewUrl, newData) => new Promise((resolve, reject) => {
  resolve(couch.get(databaseName, databaseViewUrl).then(
    function(data) {
      if (data.data.rows[0]) {
        let dataObject = data.data.rows[0];
        couch.update(databaseName, Object.assign({
          _id: dataObject.doc._id,
          _rev: dataObject.doc._rev,
          updatedAt: Date.now(),
        }, newData)
        );
      }
      else {
        couch.uniqid().then(function(ids){
          const id = ids[0];
          couch.insert(databaseName, Object.assign({
            _id: id,
            created_at: Date.now(),
            updated_at: Date.now(),
          }, newData)
          );
        });
      }
    }));
  reject((error) => {
    sendError('couch update', error, 'updateDatabase error');
  });
});

module.exports = {
  getCouch,
  couchGet,
  updateDatabase,
  sendError,
  getErrors,
  getChannels,
  getChannel,
  updateChannels,
};