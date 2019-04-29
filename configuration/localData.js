let configVars = {
  error: '',
  debugChannelId: false,
};

const setConfigVar = (payload, key) => {
  configVars[key] = payload;
};
const getConfigVar = (key) => {
  return configVars[key];
};

module.exports = {
  setConfigVar,
  getConfigVar,
};
