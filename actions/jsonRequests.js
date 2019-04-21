
const fs = require('fs');
let namesData = {};

const getNames  = () => {
  return namesData;
}
const updateNames = () => {
  fs.readFile('./data/names.json', function (err, data) {
    if (err) {
      console.log('error reading names');
    }
    else {
      namesData = JSON.parse(data);
    }
  });
}

module.exports = {
  getNames,
  updateNames,
};