const cron = require('node-cron');
const {
  getConfigVar,
  setConfigVar,
} = require('../configuration/localData');
const {
  getErrors,
} = require('../actions/couchRequests');
const {
  sendDebugMessage,
} = require('../configuration/discordBot');


cron.schedule('* * * * *', function() {
  getErrors()
    .then(body => {
      const recentError = body.rows[0];
      if (recentError.id !== getConfigVar('error').id) {
        setConfigVar(recentError, 'error');
        const errorData = recentError.value;
        sendDebugMessage(
          `App: ${errorData.app}
          Error: ${errorData.text}`
        );
      }
    });
});
