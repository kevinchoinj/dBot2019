const {
  getCouch,
  sendError,
} = require('../actions/couchRequests');

const checkCouch = (dbName, viewName, viewMap) => {
  getCouch().listDatabases()
    .then(
      dbs => {
        if (!dbs.includes(dbName)) {
          createDatabase(dbName, viewName, viewMap);
        }
      },
      err => {
        sendError('Check Couch', 'error', err);
      });
};

const createDatabase = (dbName, viewName, viewMap) => {
  getCouch().createDatabase(dbName)
    .then(() => {
      getCouch().insert(dbName, {
        _id: `_design/${viewName}`,
        'views': {
          [viewName]: {
            //'map': 'function (doc) {  emit(doc._id, doc);}'
            'map': viewMap,
          }
        },
      });
    },
    err => {
      sendError('Create CouchDB Database', 'error', err);
    });
};

module.exports = {
  checkCouch,
};