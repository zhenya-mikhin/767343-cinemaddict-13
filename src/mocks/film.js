import {
  getRandomInteger,
  getRandomArray,
  getRandomArrayItem,
  getRandomDuration,
} from "./utils.js";

import {
  Titles,
  Posters,
  RATING,
  RELEASE_YEAR,
  DURATION,
  COMMMENTS_AMOUNT,
  Descriptions,
  DESCRIPTIONS_LENGTH,
  Genres,
  Countries,
  Directors,
  Writers,
  Actors,
  AgeLimits
} from "./film-data.js";

import {generateComments} from "./comment.js";

export const generateFilm = () => {
  return {
    title: getRandomArrayItem(Titles),
    poster: getRandomArrayItem(Posters),
    rating: getRandomInteger(RATING.MIN, RATING.MAX),
    release: getRandomInteger(RELEASE_YEAR.MIN, RELEASE_YEAR.MAX),
    duration: getRandomDuration(DURATION),
    comments: generateComments(getRandomInteger(COMMMENTS_AMOUNT.MIN, COMMMENTS_AMOUNT.MAX)),
    genres: getRandomArray(Genres),
    country: getRandomArrayItem(Countries),
    description: getRandomArray(Descriptions, DESCRIPTIONS_LENGTH.MIN, DESCRIPTIONS_LENGTH.MAX).join(``),
    director: getRandomArrayItem(Directors),
    writer: getRandomArrayItem(Writers),
    cast: getRandomArray(Actors),
    ageLimit: getRandomArrayItem(AgeLimits),
    isWatchlist: Boolean(getRandomInteger()),
    isWatched: Boolean(getRandomInteger()),
    isFavorites: Boolean(getRandomInteger())
  };
};
