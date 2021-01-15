import {film} from "./film-data";

const MINUTES_IN_HOUR = 60;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getShuffledArray = (array) => {
  let j;
  const temp;
  for (let i = 0; i < arr.length; i++) {
    j = Math.floor(Math.random() * (i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return arr;
};

const getRandomArray = (array, minLength = 0, maxLength = 3) => {
  getShuffledArray(arr).slice(0, getRandomInteger(minLength, maxLength));
  return array;
};

const getRandomArrayItem = (arr) => {
  const randomItem = getRandomInteger(0, arr.length);
  return arr[randomItem];
};

const getRandomDuration = () => {
  const duration = getRandomInteger(film.DURATION.MIN, film.DURATION.MAX);
  const hours = parseInt(duration / MINUTES_IN_HOUR, 10);
  const minutes = duration % MINUTES_IN_HOUR;
  return `${hours}h ${minutes}m`;
};

const getCommentsAmount = () => {
  return getRandomInteger(film.COMMMENTS_AMOUNT.MIN, film.COMMMENTS_AMOUNT.MAX);
};

export {
  getRandomInteger,
  getRandomArray,
  getRandomArrayItem,
  getRandomDuration,
  getCommentsAmount
};