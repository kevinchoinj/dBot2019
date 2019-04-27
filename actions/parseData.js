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
    if (value.time===0) {
      return null;
    }
    else if (value.time===1) {
      stringsArray.push(`${value.time} ${value.label}`);
    }
    else {
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
  const primaryValue = commandArray.slice(1, 2).join(' ')
  const secondaryValue =  commandArray.slice(2).join(' ');
  return {
    primaryValue: primaryValue,
    secondaryValue: secondaryValue,
  };
};

const getRandom = (totalNumber) => {
  let randomNumber = Math.floor(Math.random()*totalNumber);
  return randomNumber;
};

const getSum = (valOne, valTwo) => {
  return valOne + valTwo;
}
module.exports = {
  secondsToString,
  getRequestValue,
  getRequestValueMulti,
  getRandom,
  getSum,
};
