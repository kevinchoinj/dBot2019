const cron = require('node-cron');
const {
  getConfigVar,
  setConfigVar,
} = require('../configuration/localData');
const {
  couchGet,
} = require('../actions/couchRequests');
const {
  sendDebugMessage,
} = require('../configuration/discordBot');

/*
cron.schedule('* * * * *', function() {
    couchGet('errors', `_design/errors/_view/errors?include_docs=true`)
      .then((data)=> {
        let recentError = data.data.rows[0];
        if (recentError.id !== getConfigVar('error').id) {
          setConfigVar(recentError, 'error');
          sendDebugMessage(recentError.value.text);
        }
      });
});
*/