const functions = require('../actions/parseData');

test('60 seconds to time', () => {
  expect(functions.secondsToString(60)).toBe('1 minute');
});

test('120 seconds to time', () => {
  expect(functions.secondsToString(120)).toBe('2 minutes');
});

test('121 seconds to time', () => {
  expect(functions.secondsToString(121)).toBe('2 minutes, 1 second');
});

test('3600 seconds to time', () => {
  expect(functions.secondsToString(3600)).toBe('1 hour');
});

test('3601 seconds to time', () => {
  expect(functions.secondsToString(3601)).toBe('1 hour, 1 second');
});

test('3661 seconds to time', () => {
  expect(functions.secondsToString(3661)).toBe('1 hour, 1 minute, 1 second');
});

test('86400 seconds to time', () => {
  expect(functions.secondsToString(86400)).toBe('1 day');
});

test('999999 seconds to time', () => {
  expect(functions.secondsToString(999999)).toBe('11 days, 13 hours, 46 minutes, 39 seconds');
});