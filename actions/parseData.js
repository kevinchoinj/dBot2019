const secondsToString = (seconds) => {
  let numDays = Math.floor(seconds / 86400);
  let numHours = Math.floor((seconds % 86400) / 3600);
  let numMinutes = Math.floor(((seconds % 86400) % 3600) / 60);
  let numSeconds = ((seconds % 86400) % 3600) % 60;
  return `${numDays} days, ${numHours} hours, ${numMinutes} minutes, ${numSeconds} seconds`;
}

const getRequestValue = (message) => {
  const commandArray = message.split(' ');
  const inputValue =  commandArray.slice(1).join(' ');
  return inputValue;
};

const getRequestValueMulti = (message) => {
  const commandArray = message.split(' ');
  const primaryValue = commandArray.slice(1, 2).join(' ')
  const secondaryValue =  commandArray.slice(2).join(' ');
  return {
    primaryValue: primaryValue,
    secondaryValue: secondaryValue,
  }
}

const getRandom = (totalNumber) => {
  let randomNumber = Math.floor(Math.random()*totalNumber);
  return randomNumber;
};

module.exports = {
  secondsToString,
  getRequestValue,
  getRequestValueMulti,
  getRandom,
};
