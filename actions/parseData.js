const secondsToString = (seconds) => {
  let numDays = Math.floor(seconds / 86400);
  let numHours = Math.floor((seconds % 86400) / 3600);
  let numMinutes = Math.floor(((seconds % 86400) % 3600) / 60);
  let numSeconds = ((seconds % 86400) % 3600) % 60;

  let timeArray = [
    {time: numDays, label: 'day'},
    {time: numHours, label: 'hour'},
    {time: numMinutes, label: 'minute'},
    {time: numSeconds, label: 'second'},
  ];

  let stringsArray = [];
  timeArray.map((value) => {
    if (value.time===1) {
      stringsArray.push(`${value.time} ${value.label}`);
    }
    else if (value.time!=0) {
      stringsArray.push(`${value.time} ${value.label}s`);
    }
  });

  return stringsArray.join(', ');
};

const getRequestValue = (message) => {
  const commandArray = message.split(' ');
  const inputValue =  commandArray.slice(1).join(' ');
  return inputValue;
};

const getRequestValueMulti = (message) => {
  const commandArray = message.split(' ');
  const valueOne = commandArray.slice(1, 2).join(' ')
  const valueTwo =  commandArray.slice(2).join(' ');
  return {
    valueOne: valueOne,
    valueTwo: valueTwo,
  }
}
const getRequestValueArray= (message) => {
  const commandArray = message.split(' ');
  const commandValues = commandArray.slice(1, commandArray.length);
  return commandValues;
};

const getRandom = (totalNumber) => {
  let randomNumber = Math.floor(Math.random()*totalNumber);
  return randomNumber;
};

module.exports = {
  secondsToString,
  getRequestValue,
  getRequestValueMulti,
  getRequestValueArray,
  getRandom,
};
