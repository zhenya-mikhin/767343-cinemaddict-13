import {DURATION} from "../mocks/film-data";

const MINUTES_IN_HOUR = 60;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getShuffledArray = (array) => {
  let j;
  let temp;
  for (let i = 0; i < array.length; i++) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

const getRandomArray = (array, minLength = 0, maxLength = 3) => {
  getShuffledArray(array).slice(0, getRandomInteger(minLength, maxLength));
  return array;
};

const getRandomArrayItem = (array) => {
  const randomItem = getRandomInteger(0, array.length - 1);
  return array[randomItem];
};

const getRandomDuration = () => {
  const duration = getRandomInteger(DURATION.MIN, DURATION.MAX);
  const hours = parseInt(duration / MINUTES_IN_HOUR, 10);
  const minutes = duration % MINUTES_IN_HOUR;
  return `${hours}h ${minutes}m`;
};

export {
  getRandomInteger,
  getRandomArray,
  getRandomArrayItem,
  getRandomDuration,
};