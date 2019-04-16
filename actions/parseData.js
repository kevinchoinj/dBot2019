const secondsToString = (seconds) => {
  let numDays = Math.floor(seconds / 86400);
  let numHours = Math.floor((seconds % 86400) / 3600);
  let numMinutes = Math.floor(((seconds % 86400) % 3600) / 60);
  let numSeconds = ((seconds % 86400) % 3600) % 60;
  return `${numDays} days, ${numHours} hours, ${numMinutes} minutes, ${numSeconds} seconds`;
}

module.exports = {
  secondsToString,
};
