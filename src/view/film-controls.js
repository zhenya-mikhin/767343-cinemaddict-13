import Abstract from "./abstract.js";

const activeInput = `checked`;

const createFilmControlsTemplate = (film) => {
  const {isWatchlist, isWatched, isFavorites} = film;

  return `<section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlist ? activeInput : ``}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${isWatched ? activeInput : ``}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavorites ? activeInput : ``}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>`;
};

export default class FilmControlsView extends Abstract {
  constructor(film) {
    super();
    this._film = film;
  }

  getTemplate() {
    return createFilmControlsTemplate(this._film);
  }
}
