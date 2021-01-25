import Abstract from "./abstract.js";
import {getRandomArrayItem} from "../utils/common.js"

const createFilmCardTemplate = (film) => {

  const {
    title,
    rating,
    release,
    duration,
    genres,
    poster,
    description,
    comments,
    isWatchlist,
    isWatched,
    isFavorites
  } = film;

  const buttonActiveClass = `film-card__controls-item--active`;

  const MAX_DESCRIPTION_LENGTH = 140;

  const cuttedDescription = (array) => {
    if (array.length > MAX_DESCRIPTION_LENGTH) {
      return `${array.slice(0, MAX_DESCRIPTION_LENGTH - 1)}...`;
    }
    return array;
  };

  const genre = getRandomArrayItem(genres);

  return `<article class="film-card">
            <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${release}</span>
              <span class="film-card__duration">${duration}</span>
              <span class="film-card__genre">${genre}</span>
            </p>
            <img src="./images/posters/${poster}" alt="" class="film-card__poster">
            <p class="film-card__description">${cuttedDescription(description)}</p>
            <a class="film-card__comments">${comments.length} comments</a>
            <div class="film-card__controls">
              <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlist ? buttonActiveClass : ``}" type="button">Add to watchlist</button>
              <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${isWatched ? buttonActiveClass : ``}" type="button">Mark as watched</button>
              <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavorites ? buttonActiveClass : ``}" type="button">Mark as favorite</button>
              </div>
          </article>`;
};

export default class FilmCardView extends Abstract {
  constructor(film) {
    super();
    this._film = film;
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createFilmCardTemplate(this._film);
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setClickHandlerOnFilm(callback) {
    this._callback.click = callback;
    this.getElement().querySelector(`.film-card__title`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._clickHandler);
    this.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, this._clickHandler);
  }
}
