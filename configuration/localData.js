let configVars = {
  error: {},
  debug: false,
};

const setConfigVar = (payload, key) => {
  configVars = {
    ...configVars,
    [key]: payload,
  }
};
const getConfigVar = (key) => {
  return configVars[key];
};

module.exports = {
  setConfigVar,
  getConfigVar,
};
