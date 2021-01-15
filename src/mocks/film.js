import {
  getRandomInteger,
  getRandomArray,
  getRandomArrayItem,
  getRandomDuration,
  getCommentsAmount
} from "./utils.js";

import film from "./film-data.js";
import generateComments from "./comment.js";

export const generateFilm = () => {
  return {
    title: getRandomArrayItem(film.Titles),
    poster: getRandomArrayItem(film.Posters),
    rating: getRandomInteger(film.RATING.MIN, film.RATING.MAX),
    release: getRandomInteger(film.RELEASE_YEAR.MIN, film.RELEASE_YEAR.MAX),
    duration: getRandomDuration(film.DURATION),
    commentsAmount: getCommentsAmount(),
    comments: generateComments(),
    genre: getRandomArrayItem(film.Genres),
    country: getRandomArrayItem(film.Countries),
    description: getRandomArray(film.Descriptions, film.DESCRIPTIONS_LENGTH.MIN, film.DESCRIPTIONS_LENGTH.MAX),
    director: getRandomArrayItem(film.Directors),
    writer: getRandomArrayItem(film.Writers),
    cast: getRandomArray(film.Actors),
    country: getRandomArrayItem(film.Countries),
    ageLimit: getRandomArrayItem(film.AgeLimits),
    isWatchlist: Boolean(getRandomInteger),
    isWatched: Boolean(getRandomInteger),
    isFavorites: Boolean(getRandomInteger)
  };
};