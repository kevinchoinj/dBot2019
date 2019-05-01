const NodeCouchDb = require('node-couchdb');

let json = require('../config.json');

const couchUsername = json.couchUsername;
const couchPassword = json.couchPassword;

const couch = new NodeCouchDb({
  auth: {
    user: couchUsername,
    password: couchPassword,
  }
});

const getCouch = () => {
  return couch;
};

const couchGet = (database, databaseViewUrl) => new Promise((resolve, reject) => {
  resolve(couch.get(database, databaseViewUrl));
});

const couchPost = (database, newData) => new Promise((resolve) => {
  resolve(couch.uniqid()
    .then(function(ids){
      const id = ids[0];
      couch.insert(database, Object.assign({
        _id: id,
        created_at: Date.now(),
        updated_at: Date.now(),
      }, newData));
    }));
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
});

module.exports = {
  getCouch,
  couchGet,
  couchPost,
  updateDatabase,
};