const {
  couchPost,
} = require('./couchRequests');

const json = require('../config.json');
const dbErrors = json.dbErrors;

const sendError = (component, error, text) => {
  couchPost(dbErrors, {
    app: 'discordClean',
    component: component,
    error: error,
    text: text,
  });
};

module.exports = {
  sendError,
};