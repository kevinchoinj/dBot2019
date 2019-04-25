let error = '';

const getError = () => {
  return error;
}

const setError = (payload) => {
  error = payload;
}

module.exports = {
  getError,
  setError,
};
